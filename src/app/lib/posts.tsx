import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Types for blog posts
export interface PostFrontMatter {
  title: string;
  date: string;
  description: string;
  slug: string;
  tags?: string[];
  readTime?: string;
  published?: boolean;
}

export interface Post extends PostFrontMatter {
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'src/app/content/writing');

// Ensure content directory exists
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true });
}

export function getAllPosts(): PostFrontMatter[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames
      .filter((name) => name.endsWith('.md'))
      .map((name) => {
        const fullPath = path.join(postsDirectory, name);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        const slug = name.replace(/\.md$/, '');
        
        // Calculate reading time if not provided
        const readTime = data.readTime || calculateReadingTime(content);
        
        return {
          ...data,
          slug,
          readTime,
        } as PostFrontMatter;
      })
      .filter((post) => post.published !== false) // Only include published posts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date descending

    return posts;
  } catch (error) {
    console.warn('No posts directory found or error reading posts:', error);
    return [];
  }
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      ...data,
      slug,
      content,
    } as Post;
  } catch (error) {
    console.error('Error reading post:', error);
    return null;
  }
}

export function getPostSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter((name) => name.endsWith('.md'))
      .map((name) => name.replace(/\.md$/, ''));
  } catch (error) {
    console.warn('No posts directory found:', error);
    return [];
  }
}

// Utility function to calculate reading time
export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200; // Average reading speed
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}