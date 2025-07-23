import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Newsletter from "../../components/Newsletter";

export default function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      
      {/* Newsletter Section - appears on all writing pages */}
      <section className="py-10 border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-100">
              <div className="text-center space-y-4 max-w-lg mx-auto">
                <h3 className="text-lg font-medium text-slate-900">
                  Get more insights like this
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Subscribe to get my latest articles on AI engineering, development tools, and lessons from building production systems.
                </p>
                <Newsletter />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-0.5">
                <p className="text-slate-600 text-sm">© 2024 Utkarsh Kanwat</p>
                <p className="text-xs text-slate-500">Building AI systems for the future</p>
              </div>
              
              <div className="flex gap-6 text-xs">
                <Link 
                  href="/"
                  className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
                >
                  Homepage
                </Link>
                <Link 
                  href="/writing"
                  className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
                >
                  All articles
                </Link>
                <a 
                  href="mailto:utkarshkanwat@gmail.com"
                  className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}