import OpenAI from 'openai';
import { NextResponse } from 'next/server';
export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });

    return NextResponse.json({ embedding: response.data[0].embedding });
  } catch (error) {
    console.error('Error generating embedding:', error);
    return NextResponse.json({ error: 'Failed to generate embedding' }, { status: 500 });
  }
}
