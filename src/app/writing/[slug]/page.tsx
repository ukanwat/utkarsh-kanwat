import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from 'next';
import { getPostBySlug, getPostSlugs, calculateReadingTime } from "../../lib/posts";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Calendar, Clock, ExternalLink } from "lucide-react";
import Comments from "../../components/Comments";
import Header from "@/app/components/Header";
import SocialShare from "../../components/Share";

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  // Extract first image from content (if any)
  const imageMatch = post.content.match(/!\[.*?\]\((.*?)\)/);
  const firstImage = imageMatch ? imageMatch[1] : null;
  
  // Ensure absolute URL for images
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://utkarshkanwat.com';
  const absoluteImageUrl = firstImage 
    ? (firstImage.startsWith('http') ? firstImage : `${baseUrl}${firstImage}`)
    : `${baseUrl}/og-default.png`; // fallback image

  const url = `${baseUrl}/writing/${post.slug}`;
  
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags?.join(', '),
    authors: [{ name: 'Utkarsh Kanwat' }],
    creator: 'Utkarsh Kanwat',
    publisher: 'Utkarsh Kanwat',
    
    // Open Graph
    openGraph: {
      title: post.title,
      description: post.description,
      url: url,
      siteName: 'Utkarsh Kanwat',
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.date,
      authors: ['Utkarsh Kanwat'],
      tags: post.tags,
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      creator: '@ukanwat',
      images: [absoluteImageUrl],
    },
    
    // Additional metadata
    alternates: {
      canonical: url,
    },
    
    // Article specific metadata
    other: {
      'article:author': 'Utkarsh Kanwat',
      'article:published_time': post.date,
      'article:modified_time': post.date,
      'article:section': 'Technology',
      'article:tag': post.tags?.join(',') || '',
    },
  };
}

// Custom components for ReactMarkdown - Fixed to prevent nesting issues
const MarkdownComponents = {
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';

    if (!inline && language) {
      return (
        <div className="my-8 rounded-xl overflow-hidden border border-slate-200">
          <SyntaxHighlighter
            style={oneLight}
            language={language}
            PreTag="div"
            className="!bg-slate-50 text-sm"
            showLineNumbers={true}
            customStyle={{
              margin: 0,
              padding: '1.5rem',
              background: '#f8fafc',
              border: 'none',
            }}
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      );
    }

    return (
      <code 
        className="bg-slate-100 text-slate-800 px-2 py-1 rounded-md text-sm font-mono border border-slate-200" 
        {...props}
      >
        {children}
      </code>
    );
  },
  
  h1({ children }: any) {
    return (
      <h1 className="text-2xl font-medium mt-10 mb-6 pb-4 border-b border-slate-200 text-slate-900 first:mt-0 leading-snug">
        {children}
      </h1>
    );
  },
  
  h2({ children }: any) {
    return (
      <h2 className="text-xl font-medium mt-8 mb-4 text-slate-900 leading-snug">
        {children}
      </h2>
    );
  },
  
  h3({ children }: any) {
    return (
      <h3 className="text-lg font-medium mt-6 mb-3 text-slate-900 leading-snug">
        {children}
      </h3>
    );
  },

  h4({ children }: any) {
    return (
      <h4 className="text-base font-medium mt-5 mb-2 text-slate-900 leading-snug">
        {children}
      </h4>
    );
  },
  
  // Use div instead of p to avoid nesting issues
  p({ children }: any) {
    return (
      <div className="mb-4 leading-relaxed text-slate-700">
        {children}
      </div>
    );
  },
  
  ul({ children }: any) {
    return (
      <ul className="my-4 ml-4 space-y-2 list-disc text-slate-700">
        {children}
      </ul>
    );
  },
  
  ol({ children }: any) {
    return (
      <ol className="my-4 ml-4 space-y-2 list-decimal text-slate-700">
        {children}
      </ol>
    );
  },
  
  li({ children }: any) {
    return (
      <li className="leading-relaxed">
        {children}
      </li>
    );
  },
  
  blockquote({ children }: any) {
    return (
      <blockquote className="border-l-4 border-blue-200 pl-6 py-3 my-6 bg-blue-50/50 italic text-slate-600 rounded-r-lg">
        {children}
      </blockquote>
    );
  },
  
  a({ href, children }: any) {
    const isExternal = href?.startsWith('http');
    return (
      <a 
        href={href}
        className="text-blue-600 hover:text-blue-700 underline underline-offset-2 decoration-2 hover:decoration-blue-700 transition-colors inline-flex items-center gap-1 font-medium"
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {children}
        {isExternal && <ExternalLink className="w-3 h-3" />}
      </a>
    );
  },
  
  strong({ children }: any) {
    return (
      <strong className="font-semibold text-slate-900">
        {children}
      </strong>
    );
  },

  em({ children }: any) {
    return (
      <em className="italic text-slate-700">
        {children}
      </em>
    );
  },
  
  table({ children }: any) {
    return (
      <div className="my-8 overflow-x-auto">
        <table className="w-full border-collapse border border-slate-300 rounded-xl overflow-hidden bg-white shadow-sm">
          {children}
        </table>
      </div>
    );
  },
  
  thead({ children }: any) {
    return (
      <thead className="bg-slate-50">
        {children}
      </thead>
    );
  },
  
  th({ children }: any) {
    return (
      <th className="border border-slate-200 px-6 py-4 text-left font-semibold text-slate-900 bg-slate-50">
        {children}
      </th>
    );
  },
  
  td({ children }: any) {
    return (
      <td className="border border-slate-200 px-6 py-4 text-slate-700 font-light">
        {children}
      </td>
    );
  },
  
  hr() {
    return <hr className="my-12 border-slate-200" />;
  },

  pre({ children }: any) {
    return children; // Let the code component handle pre tags
  },

  // Use figure/figcaption for images
  img({ src, alt }: any) {
    return (
      <figure className="my-8">
        <img 
          src={src} 
          alt={alt} 
          className="w-full rounded-xl border border-slate-200 shadow-sm"
        />
        {alt && (
          <figcaption className="text-center text-xs text-slate-500 mt-2 italic">
            {alt}
          </figcaption>
        )}
      </figure>
    );
  }
};

export default async function BlogPost({ params }: PageProps) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    notFound();
  }

  // Calculate reading time if not provided in frontmatter
  const readTime = post.readTime || calculateReadingTime(post.content);
  
  // Construct full URL for sharing
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://utkarshkanwat.com';
  const fullUrl = `${baseUrl}/writing/${post.slug}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
      
      <div className="max-w-4xl mx-auto px-8">
        {/* Article Header */}
        <header className="py-12">
          <div className="space-y-6">
            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <time dateTime={post.date} className="font-medium">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span className="font-medium">{readTime}</span>
              </div>
            </div>
            
            {/* Title */}
            <h1 className="text-3xl font-medium text-slate-900 leading-snug tracking-tight">
              {post.title}
            </h1>

            {/* Description */}
            {post.description && (
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
                {post.description}
              </p>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {post.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 text-xs bg-slate-100 text-slate-700 rounded-lg border border-slate-200 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Article Content */}
        <main className="pb-12">
          <article className="max-w-none">
            <div className="prose prose-lg prose-slate max-w-none prose-headings:font-medium prose-a:font-medium">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={MarkdownComponents}
                skipHtml={false}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </article>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-slate-200">
            <div className="space-y-6">
              {/* Tags (repeated for discoverability) */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-md border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Share Again in Footer */}
              <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-100">
                <SocialShare 
                  url={fullUrl}
                  title={post.title}
                  description={post.description}
                  hashtags={post.tags || []}
                />
              </div>
            </div>
          </footer>
        </main>

        {/* Comments Section */}
        <section id="comments" className="py-12 border-t border-slate-100">
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-slate-900">Discussion</h3>
            <Comments />
          </div>
        </section>
      </div>
    </div>
  );
}