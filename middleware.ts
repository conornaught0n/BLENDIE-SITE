import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host') || '';

  // 1. Force SSL (in production)
  // Check x-forwarded-proto because most Next.js deployments (Vercel, etc) are behind a proxy that terminates SSL
  const proto = request.headers.get('x-forwarded-proto');
  if (process.env.NODE_ENV === 'production' && proto === 'http') {
     url.protocol = 'https';
     return NextResponse.redirect(url);
  }

  // 2. Redirect www to non-www
  if (host.startsWith('www.')) {
    url.hostname = host.replace('www.', '');
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
