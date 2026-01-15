import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

export async function GET() {
  try {
    // Read the GEMINI_PROMPT.md file from the root directory
    const promptPath = path.join(process.cwd(), 'GEMINI_PROMPT.md');
    const promptContent = fs.readFileSync(promptPath, 'utf8');

    // Return it as JSON
    return NextResponse.json({ 
      prompt: promptContent,
      lastUpdated: new Date().toISOString(),
      version: '2.0-Friendly-Translator'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load system prompt' }, { status: 500 });
  }
}
