import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs, calculateReadingTime } from "../../lib/posts";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ArrowLeft, Calendar, Clock, Tag, ExternalLink, Mail, MessageCircle } from "lucide-react";
import Comments from "../../components/Comments";

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

interface PageProps {
  params: { slug: string };
}

// Custom components for ReactMarkdown
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
  
  p({ children }: any) {
    return (
      <p className="mb-4 leading-relaxed text-slate-700">
        {children}
      </p>
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
        <div className="">
          {children}
        </div>
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
  }
};

export default async function BlogPost({ params }: PageProps) {
  params = await params;
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  // Calculate reading time if not provided in frontmatter
  const readTime = post.readTime || calculateReadingTime(post.content);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <Link 
            href="/writing"
            className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span className="font-medium text-sm">Back to writing</span>
          </Link>
        </div>
      </header>

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
          <article className="prose prose-lg max-w-none">
            <div className="text-slate-700 leading-relaxed">
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