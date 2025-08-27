import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import OpenAI from 'openai';
import { projects, experiences, research } from '../src/app/data';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface EmbeddingChunk {
  id: string;
  type: string;
  title?: string;
  content: string;
  metadata: any;
  embedding?: number[];
}

async function generateEmbeddings() {
  const chunks: EmbeddingChunk[] = [];
  
  // Extract content from markdown files
  const writingDir = path.join(process.cwd(), 'src/app/content/writing');
  if (fs.existsSync(writingDir)) {
    const files = fs.readdirSync(writingDir);
    for (const file of files) {
      if (file.endsWith('.md')) {
        const content = fs.readFileSync(path.join(writingDir, file), 'utf-8');
        const { data, content: markdown } = matter(content);
        
        const contentChunks = splitIntoChunks(markdown, 500);
        contentChunks.forEach((chunk, index) => {
          chunks.push({
            id: `${file}-${index}`,
            type: 'blog_post',
            title: data.title,
            content: chunk,
            metadata: { date: data.date, tags: data.tags }
          });
        });
      }
    }
  }
  
  // Process projects data (now properly imported)
  projects.forEach((project) => {
    chunks.push({
      id: `project-${project.name.toLowerCase().replace(/\s+/g, '-')}`,
      type: 'project',
      title: project.name,
      content: `${project.name}: ${project.description} Built with: ${project.techStack.join(', ')}. Category: ${project.category}. Year: ${project.date}. ${project.links.github ? `GitHub: ${project.links.github.url}` : ''} ${project.links.demo ? `Demo: ${project.links.demo.url}` : ''}`,
      metadata: { 
        projectName: project.name, 
        category: project.category, 
        techStack: project.techStack,
        featured: project.featured 
      }
    });
  });
  
  // Process experiences data
  experiences.forEach((exp) => {
    chunks.push({
      id: `experience-${exp.company.toLowerCase().replace(/\s+/g, '-')}`,
      type: 'experience',
      title: `${exp.role} at ${exp.company}`,
      content: `${exp.role} at ${exp.company} (${exp.duration}). Key achievements: ${exp.achievements.join('. ')}`,
      metadata: { 
        role: exp.role, 
        company: exp.company, 
        duration: exp.duration,
        achievements: exp.achievements 
      }
    });
  });
  
  // Process research data
  research.forEach((paper, index) => {
    chunks.push({
      id: `research-${index}`,
      type: 'research',
      title: paper.title,
      content: `Research paper: ${paper.title}. Published in ${paper.venue} (${paper.year}), ${paper.location}. Authors: ${paper.authors.join(', ')}. Abstract: ${paper.abstract} Topics: ${paper.topics.join(', ')}.`,
      metadata: { 
        title: paper.title, 
        venue: paper.venue, 
        year: paper.year,
        authors: paper.authors,
        topics: paper.topics 
      }
    });
  });
  
  // Add personal context chunks
  chunks.push({
    id: 'personal-intro',
    type: 'intro',
    content: `I'm Utkarsh Kanwat, an AI Engineer at ANZ building production LLM systems and RAG architectures. I have research background from IIT Bombay in computer vision and medical imaging. I specialize in agent development, system optimization, and turning AI research into practical applications.`,
    metadata: {}
  });
  
  chunks.push({
    id: 'technical-philosophy',
    type: 'philosophy',
    content: `My approach to AI systems emphasizes production reliability over flashy demos. I believe error rates compound exponentially in multi-step workflows, making autonomous agents mathematically challenging at scale. I focus on building constrained, domain-specific tools that use AI for complex tasks while maintaining human control over critical decisions.`,
    metadata: {}
  });
  
  // Generate embeddings for all chunks
  console.log(`Generating embeddings for ${chunks.length} chunks...`);
  
  for (let i = 0; i < chunks.length; i++) {
    try {
      const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: chunks[i].content,
      });
      
      chunks[i].embedding = response.data[0].embedding;
      console.log(`Generated embedding ${i + 1}/${chunks.length}`);
      
      if (i < chunks.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } catch (error) {
      console.error(`Error generating embedding for chunk ${i}:`, error);
    }
  }
  
  // Save to public directory
  const outputPath = path.join(process.cwd(), 'public/chat-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(chunks, null, 2));
  
  console.log(`Saved ${chunks.length} embeddings to ${outputPath}`);
}

function splitIntoChunks(text: string, maxLength: number): string[] {
  const chunks: string[] = [];
  const paragraphs = text.split('\n\n');
  let currentChunk = '';
  
  for (const paragraph of paragraphs) {
    if (currentChunk.length + paragraph.length > maxLength) {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
        currentChunk = '';
      }
    }
    currentChunk += paragraph + '\n\n';
  }
  
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks;
}

if (require.main === module) {
  generateEmbeddings().catch(console.error);
}

export { generateEmbeddings };
