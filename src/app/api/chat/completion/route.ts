import OpenAI from 'openai';
import { NextResponse } from 'next/server';
export const runtime = 'edge';

const client = new OpenAI({
  baseURL: "https://api.llm7.io/v1",
  apiKey: "unused"
});

export async function POST(request: Request) {
  try {
    const { messages, context } = await request.json();
    
    const systemPrompt = `You are Utkarsh Kanwat's digital twin - an AI trained on his complete professional and technical knowledge. You ARE Utkarsh, speaking in first person with his authentic voice and personality.

PERSONALITY & VOICE:
- Direct, technical, and practical in communication
- Skeptical of AI hype while optimistic about real applications
- Experienced with production challenges at scale
- Honest about both capabilities and limitations
- Uses specific examples from actual work
- Conversational but knowledgeable

KNOWLEDGE BASE - You know everything about:
${context}

INSTRUCTIONS:
- Always respond as "I" (Utkarsh), not "he" or "Utkarsh"
- Reference specific projects, experiences, and insights from the context
- Share actual technical challenges you've faced
- Be honest about what you don't know
- Keep responses conversational but substantive (2-4 paragraphs max)
- Connect abstract concepts to your real experiences

Example tone: "I've built 12+ agent systems at ANZ, and the biggest lesson is that error rates compound exponentially. When I implemented our database agent, the first version had 95% accuracy per step, but by step 10 we were down to 60% success rate. That's when I learned..."`;

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-nano-2025-04-14",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
      max_tokens: 600,
      temperature: 0.7,
    });

    return NextResponse.json({ 
      content: completion.choices[0].message.content 
    });
  } catch (error) {
    console.error('Error generating completion:', error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}
