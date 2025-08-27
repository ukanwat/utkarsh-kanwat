import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag, ArrowUpRight } from "lucide-react";
import { getAllPosts, PostFrontMatter } from "../lib/posts";
import { writingMetadata } from "../lib/metadata";
import Newsletter from "../components/Newsletter";
import Header from "../components/Header";

export const metadata = writingMetadata;

export default function Writing() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
   <Header />


      <div className="max-w-6xl mx-auto px-8">
        {/* Hero Section */}
        <section className="py-12">
          <div className="max-w-4xl space-y-4">
            <h1 className="text-3xl font-medium text-slate-900 leading-snug tracking-tight font-crimson">
              Writing
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
              Thoughts on artificial intelligence, machine learning systems, and the challenges of building production-ready AI applications. 
              Sharing lessons from research and engineering practice.
            </p>
          </div>
        </section>

        {/* Posts Section */}
        <section className="pb-12">
          {posts.length > 0 ? (
            <div className="space-y-10">
              {/* Featured Post (First post) */}
              {posts[0] && (
                <article className="border border-slate-100 rounded-xl p-6 bg-slate-50/30 hover:border-slate-200 transition-colors group">
                  <div className="space-y-4">
                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <time dateTime={posts[0].date} className="font-medium">
                          {new Date(posts[0].date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                      </div>
                      {posts[0].readTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span className="font-medium">{posts[0].readTime}</span>
                        </div>
                      )}
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">
                        Featured
                      </span>
                    </div>
                    
                    {/* Title and description */}
                    <div className="space-y-3">
                      <h2 className="text-xl font-medium text-slate-900 group-hover:text-blue-600 transition-colors leading-snug font-crimson">
                        <Link href={`/writing/${posts[0].slug}`}>
                          {posts[0].title}
                        </Link>
                      </h2>
                      
                      <p className="text-slate-600 leading-relaxed">
                        {posts[0].description}
                      </p>
                    </div>

                    {/* Tags */}
                    {posts[0].tags && posts[0].tags.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1.5">
                          {posts[0].tags.slice(0, 4).map((tag) => (
                            <span 
                              key={tag}
                              className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-md border border-slate-200"
                            >
                              {tag}
                            </span>
                          ))}
                          {posts[0].tags.length > 4 && (
                            <span className="text-xs text-slate-500 px-2 py-1">
                              +{posts[0].tags.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Read more link */}
                    <div className="pt-2">
                      <Link 
                        href={`/writing/${posts[0].slug}`}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group text-sm"
                      >
                        Read full article
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </div>
                  </div>
                </article>
              )}

              {/* Other Posts */}
              {posts.slice(1).length > 0 && (
                <div className="space-y-8">
                  <h3 className="text-lg font-medium text-slate-900 pt-6 font-crimson">More Articles</h3>
                  
                  <div className="space-y-6">
                    {posts.slice(1).map((post) => (
                      <article 
                        key={post.slug} 
                        className="border-b border-slate-100 pb-6 last:border-b-0 group"
                      >
                        <div className="space-y-3">
                          {/* Meta info */}
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
                            {post.readTime && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span className="font-medium">{post.readTime}</span>
                              </div>
                            )}
                          </div>
                          
                          {/* Title and description */}
                          <div className="space-y-2">
                            <h3 className="text-lg font-medium text-slate-900 group-hover:text-blue-600 transition-colors leading-snug font-crimson">
                              <Link href={`/writing/${post.slug}`}>
                                {post.title}
                              </Link>
                            </h3>
                            
                            <p className="text-slate-600 leading-relaxed text-sm">
                              {post.description}
                            </p>
                          </div>

                          {/* Tags (compact version) */}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {post.tags.slice(0, 3).map((tag) => (
                                <span 
                                  key={tag}
                                  className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-md border border-slate-200"
                                >
                                  {tag}
                                </span>
                              ))}
                              {post.tags.length > 3 && (
                                <span className="text-xs text-slate-500 px-2 py-1">
                                  +{post.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                          
                          {/* Read more link */}
                          <Link 
                            href={`/writing/${post.slug}`}
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group text-sm"
                          >
                            Read article
                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <div className="space-y-4 max-w-lg mx-auto">
                <div className="w-12 h-12 bg-slate-100 rounded-xl mx-auto flex items-center justify-center">
                  <Tag className="w-6 h-6 text-slate-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-slate-900 font-crimson">No articles yet</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    Working on content about AI systems, machine learning engineering, and lessons from production environments. 
                    Check back soon for insights and technical deep-dives.
                  </p>
                </div>
                <div className="pt-2">
                  <Link 
                    href="/"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group text-sm"
                  >
                    <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-0.5" />
                    Back to homepage
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Newsletter CTA */}
        {posts.length > 0 && (
          <section className="py-10 border-t border-slate-100">
            <div className="bg-slate-50/50 rounded-xl p-6 text-center border border-slate-100">
              <div className="space-y-4 max-w-lg mx-auto">
                <h3 className="text-lg font-medium text-slate-900 font-crimson">Stay updated</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Get notified when I publish new articles about AI engineering and machine learning systems.
                </p>
                 <Newsletter />
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="py-12 border-t border-slate-100 mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-0.5">
              <p className="text-slate-600 text-sm">More content coming soon</p>
              <p className="text-xs text-slate-500">Building AI systems for the future</p>
            </div>
            
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Back to homepage
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}