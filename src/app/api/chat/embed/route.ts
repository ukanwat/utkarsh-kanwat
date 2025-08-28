import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
    
  try {
    const { text } = await request.json();

    console.log("env", process.env.OPENAI_API_KEY);

    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "text-embedding-3-small",
        input: text,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json({ 
      embedding: data.data[0].embedding 
    });
  } catch (error) {
    console.error('Error generating embedding:', error);
    return NextResponse.json({ error: 'Failed to generate embedding' }, { status: 500 });
  }
}