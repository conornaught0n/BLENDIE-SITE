import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ batchId: string }> }
) {
  const { batchId } = await params;

  // Mock Data Logic for Traceability
  if (batchId.toUpperCase() === 'A17') {
    return NextResponse.json({
      id: 'A17',
      roastDate: '2023-10-25',
      origin: 'Ethiopia / Colombia',
      tastingNotes: ['Jasmine', 'Honey', 'Bergamot'],
      roaster: 'Alex',
      status: 'Verified',
      safetyChecks: {
        pesticides: 'Passed',
        mycotoxins: 'Passed',
        heavyMetals: 'Passed'
      }
    });
  }

  return NextResponse.json({ error: 'Batch not found' }, { status: 404 });
}
