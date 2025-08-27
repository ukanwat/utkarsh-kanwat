'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Helper function to determine if a nav item is active
  const isActive = (path: string) => {
    if (path === '/writing') {
      return pathname.startsWith('/writing');
    }
    return pathname === path;
  };

  // Helper function to get nav item classes
  const getNavClasses = (path: string) => {
    const baseClasses = "transition-colors text-sm font-medium";
    const inactiveClasses = "text-slate-600 hover:text-slate-900 border-b border-transparent hover:border-slate-400";
    const activeClasses = "text-slate-900 border-b-2 border-slate-900 pb-1";
    
    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  return (
    <header className={`border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur-sm z-10 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg sm:text-xl font-medium text-slate-900 tracking-tight font-crimson">
            Utkarsh Kanwat
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            <Link href="/writing" className={getNavClasses('/writing')}>
              Writing
            </Link>
            <a href="/#projects" className={getNavClasses('/#projects')}>
              Projects
            </a>
            <a href="/#experience" className={getNavClasses('/#experience')}>
              Experience
            </a>
            <a href="/#research" className={getNavClasses('/#research')}>
              Research
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-slate-100 pt-4">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/writing" 
                className={`${getNavClasses('/writing')} py-2`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Writing
              </Link>
              <a 
                href="/#projects" 
                className={`${getNavClasses('/#projects')} py-2`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </a>
              <a 
                href="/#experience" 
                className={`${getNavClasses('/#experience')} py-2`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Experience
              </a>
              <a 
                href="/#research" 
                className={`${getNavClasses('/#research')} py-2`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Research
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}