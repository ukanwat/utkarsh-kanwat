'use client'
import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface EmbeddingChunk {
  id: string;
  type: string;
  title?: string;
  content: string;
  metadata: any;
  embedding: number[];
}

// Vector similarity search
function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

export default function AIDigitalTwin() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "I'm Utkarsh's digital twin, an AI designed to speak with his expertise, experience, and perspective. Ask me about his projects, technical experience, or insights on AI systems."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatData, setChatData] = useState<EmbeddingChunk[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/chat-data.json')
      .then(res => res.json())
      .then(data => setChatData(data))
      .catch(err => console.error('Failed to load data:', err));
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findRelevantContext = async (query: string): Promise<string> => {
    if (chatData.length === 0) return '';

    try {
      const response = await fetch('/api/chat/embed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: query })
      });
      
      if (!response.ok) return '';
      
      const { embedding: queryEmbedding } = await response.json();
      
      const similarities = chatData.map(chunk => ({
        ...chunk,
        similarity: cosineSimilarity(queryEmbedding, chunk.embedding)
      }));
      
      similarities.sort((a, b) => b.similarity - a.similarity);
      
      return similarities
        .slice(0, 3)
        .map(chunk => chunk.content)
        .join('\n\n');
        
    } catch (error) {
      console.error('Error finding relevant context:', error);
      return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const context = await findRelevantContext(userMessage);
      
      const response = await fetch('/api/chat/completion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }],
          context
        })
      });

      if (!response.ok) throw new Error('Failed to get response');

      const { content } = await response.json();
      
      setMessages(prev => [...prev, { role: 'assistant', content }]);
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Something went wrong. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-full shadow-lg transition-colors z-50 flex items-center gap-2 font-medium text-sm"
        aria-label="Chat with AI Utkarsh"
      >
        <MessageCircle className="w-4 h-4" />
        Ask My AI
      </button>
    );
  }

  return (
    <div className="fixed inset-x-4 bottom-4 max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-xl z-50 flex flex-col h-[600px] max-h-[calc(100vh-2rem)]">
      
      {/* Clean header */}
      <div className="border-b border-slate-100 p-6 flex items-center justify-between">
        <div>
          <h3 className="font-medium text-slate-900 text-lg font-crimson">Chat with Utkarsh</h3>
          <p className="text-slate-600 text-sm mt-1">Ask about my projects, experience, and insights</p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-slate-500 hover:text-slate-700 transition-colors p-2 hover:bg-slate-50 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message, index) => (
          <div key={index} className="space-y-1">
            <div className="text-xs font-medium text-slate-500 tracking-wide uppercase">
              {message.role === 'user' ? 'You' : 'Utkarsh'}
            </div>
            <div className="text-slate-900 leading-relaxed">
              {message.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="space-y-1">
            <div className="text-xs font-medium text-slate-500 tracking-wide uppercase">
              Utkarsh
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Thinking...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-slate-100 p-6">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about projects, experience, or technical insights..."
            className="flex-1 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}