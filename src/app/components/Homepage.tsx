"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, ExternalLink, ChevronLeft, ChevronRight, Calendar, Clock, ArrowUpRight } from "lucide-react";
import { Menu, X } from 'lucide-react'
import { getAllPosts, PostFrontMatter } from "../lib/posts";

interface Research {
  title: string;
  authors: string[];
  affiliations: { [key: string]: string };
  venue: string;
  year: string;
  location: string;
  abstract: string;
  topics: string[];
  doi: string;
  pages: string;
  isbn: string;
  publisher: string;
}

// TypeScript interfaces
interface ProjectLink {
  url: string;
  label: string;
}

interface Project {
  name: string;
  description: string;
  techStack: string[];
  links: {
    github: ProjectLink | null;
    demo: ProjectLink | null;
  };
  images: string[];
  date: string;
  category: string;
  featured?: boolean;
}

interface Experience {
  role: string;
  company: string;
  duration: string;
  achievements: string[];
}

const projects: Project[] = [
  {
    name: "Genbase",
    description: "Open-source platform for modular AI agent orchestration with Docker containers, FastAPI gateway, and vector database integration.",
    techStack: ["Docker", "FastAPI", "PostgreSQL", "React", "TypeScript", "Vector DB"],
    links: {
      github: { url: "https://github.com/genbase-project/genbase", label: "View Source" },
      demo: null
    },
    images: ["/projects/genbase-ss.png"],
    date: "2024",
    category: "AI Platform",
    featured: true
  },
  {
    name: "Vikray",
    description: "B2B agricultural marketplace connecting retailers and distributors with mobile apps and comprehensive web platform.",
    techStack: ["Flutter", "Next.js", "GraphQL", "PostgreSQL", "AWS", "Terraform"],
    links: {
      github: null,
      demo: { url: "https://play.google.com/store/apps/details?id=com.vikray", label: "Download App" }
    },
    images: ["/projects/vikray-homepage.png", "/projects/vikray-product.png"],
    date: "2024",
    category: "E-commerce",
    featured: true
  },
  {
    name: "Stark", 
    description: "Full-featured microblogging social platform with real-time messaging, content feeds, and cross-platform mobile support.",
    techStack: ["React", "Flutter", "Node.js", "GraphQL", "PostgreSQL", "GCP"],
    links: {
      github: { url: "https://github.com/ukanwat/stark", label: "View Source" },
      demo: null
    },
    images: ["/projects/stark-app.png"],
    date: "2024",
    category: "Social Platform",
    featured: true
  },
  {
    name: "ScriptGPT",
    description: "AI-powered development automation tool that generates functional TypeScript/JavaScript features from natural language descriptions.",
    techStack: ["TypeScript", "OpenAI API", "Node.js", "CLI Tools"],
    links: {
      github: { url: "https://github.com/ukanwat/ScriptGPT", label: "View Source" },
      demo: null
    },
    images: ["/projects/scriptgpt.png"],
    date: "2024",
    category: "Dev Tools",
    featured: true
  }
];

const research: Research[] = [
  {
    title: "Combining Datasets with Different Label Sets for Improved Nucleus Segmentation and Classification",
    authors: [
              "Utkarsh Kanwat¹",
      "Amruta Parulekar¹", 
 
      "Ravi Gupta¹", 
      "Medha Chippa¹", 
      "Thomas Jacob¹", 
      "Tripti Bameta²", 
      "Swapnil Rane²", 
      "Amit Sethi¹"
    ],
    affiliations: {
      "¹": "Indian Institute of Technology Bombay, Mumbai, India",
      "²": "Tata Memorial Centre-ACTREC (HBNI), Mumbai, India"
    },
    venue: "17th International Joint Conference on Biomedical Engineering Systems and Technologies",
    year: "2024",
    location: "Rome, Italy",
    abstract: "Segmentation and classification of cell nuclei using deep neural networks (DNNs) can save pathologists' time for diagnosing various diseases, including cancers. The accuracy of DNNs increases with the sizes of annotated datasets available for training. The available public datasets with nuclear annotations and labels differ in their class label sets. We propose a method to train DNNs on multiple datasets where the set of classes across the datasets are related but not the same. Our method is designed to utilize class hierarchies, where the set of classes in a dataset can be at any level of the hierarchy. Our results demonstrate that segmentation and classification metrics for the class set used by the test split of a dataset can improve by pre-training on another dataset that may even have a different set of classes due to the expansion of the training set enabled by our method.",
    topics: [
      "Applications of Machine Learning",
      "Deep Learning in Bioimaging", 
      "Histology and Tissue Imaging",
      "Medical Imaging and Diagnosis"
    ],
    doi: "10.5220/0012380800003657",
    pages: "281-288",
    isbn: "978-989-758-688-0",
    publisher: "SciTePress"
  }
];

const experiences: Experience[] = [
  {
    role: "Engineer",
    company: "ANZ",
    duration: "Jun 2023 - Present",
    achievements: [
      "Fine-tuning Gemini models on documentation, achieving 18% improvement in answer relevance", 
      "Building production RAG systems with vector databases for context-aware AI responses across applications",
      "Built enterprise data mediation platform using Node.js and Python, replacing legacy IBM DataPower infrastructure",
      "Architected automated deployment pipeline for 180+ microservices, eliminating 900+ hours of manual testing monthly",
      "Deployed services across multi-cloud environments (AWS, GCP, OpenShift) using Terraform and Kubernetes",
      "Implementing intelligent query caching and optimization strategies, reducing API costs by 30%",
      "Led team to victory in Global Generative AI Hackathon, developing LLM-powered task optimization bot",
    ]
  },
  {
    role: "ML Research Assistant",
    company: "MeDAL Lab, IIT Bombay",
    duration: "Mar 2022 - Jun 2023",
    achievements: [
      "Achieved 28% performance improvement in cell nucleus segmentation algorithms",
      "Published research at international conference on medical image analysis",
      "Developed deep learning models for automated histopathology classification"
    ]
  }
];

// Image Gallery Component
interface ImageGalleryProps {
  images: string[];
  projectName: string;
}

function ImageGallery({ images, projectName }: ImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);
  
  if (!images || images.length === 0) {
    return (
      <div className="aspect-[16/10] bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center max-w-lg">
        <div className="text-center">
          <div className="w-8 h-8 bg-slate-200 rounded-md mx-auto mb-2"></div>
          <p className="text-xs text-slate-500">No preview available</p>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-2 max-w-lg">
      <div className="relative aspect-[16/10] bg-slate-50 rounded-lg overflow-hidden group border border-slate-100 shadow-sm">
        <Image
          src={images[currentImage]}
          alt={`${projectName} - Image ${currentImage + 1}`}
          fill
          className="object-cover"
        />
        
        {/* Navigation arrows for multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/90 hover:bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/90 hover:bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </>
        )}
        
        {/* Dots indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index === currentImage ? 'bg-white' : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Image counter for multiple images */}
      {images.length > 1 && (
        <div className="text-center">
          <span className="text-xs text-slate-500">
            {currentImage + 1} of {images.length}
          </span>
        </div>
      )}
    </div>
  );
}
interface HomepageProps {
  latestPost: PostFrontMatter | null;
}


export default function Homepage({ latestPost }: HomepageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
<header className="border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
  <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4">
    <div className="flex items-center justify-between">
      <h1 className="text-lg sm:text-xl font-medium text-slate-900 tracking-tight">
        Utkarsh Kanwat
      </h1>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6">
        <a href="/writing" className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium border-b border-transparent hover:border-slate-400">
          Writing
        </a>
        <a href="#projects" className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium border-b border-transparent hover:border-slate-400">
          Projects
        </a>
        <a href="#experience" className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium border-b border-transparent hover:border-slate-400">
          Experience
        </a>
        <a href="#research" className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium border-b border-transparent hover:border-slate-400">
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
          <a 
            href="/writing" 
            className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Writing
          </a>
          <a 
            href="#projects" 
            className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Projects
          </a>
          <a 
            href="#experience" 
            className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Experience
          </a>
          <a 
            href="#research" 
            className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Research
          </a>
        </div>
      </nav>
    )}
  </div>
</header>


      <div className="max-w-6xl mx-auto px-8">
        {/* Hero Section */}
        <section className="py-12">
          <div className="max-w-4xl space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-medium text-slate-900 leading-snug tracking-tight">
                Building intelligent systems that understand and adapt
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Engineer developing LLM optimization frameworks, RAG systems, and scalable ML platforms. 
                I have academic research background in computer vision and medical imaging from IIT Bombay.
              </p>
            </div>
            
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="mailto:utkarshkanwat@gmail.com"
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
              >
                <Mail className="w-4 h-4" />
                Get in touch
              </a>
              <a 
                href="https://github.com/ukanwat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors text-sm"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/utkarsh-kanwat-806a95189/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors text-sm"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* Writing Preview Section */}
<section id="writing" className="py-12">
  <div className="space-y-8">
    <div className="flex items-center justify-between">
      <h3 className="text-2xl font-medium text-slate-900">Latest Writing</h3>
      <Link 
        href="/writing"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors group text-sm font-medium"
      >
        View all articles
        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>
    </div>
    
    {/* Dynamic Featured Article Preview */}
    {latestPost ? (
      <div className="border border-slate-100 rounded-xl p-6 bg-slate-50/30 hover:border-slate-200 transition-colors group">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span className="font-medium">
                {new Date(latestPost.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            {latestPost.readTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span className="font-medium">{latestPost.readTime}</span>
              </div>
            )}
            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">
              Latest
            </span>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-xl font-medium text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
              <Link href={`/writing/${latestPost.slug}`}>
                {latestPost.title}
              </Link>
            </h4>
            
            <p className="text-slate-600 leading-relaxed">
              {latestPost.description}
            </p>
          </div>

          {latestPost.tags && latestPost.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {latestPost.tags.slice(0, 4).map((tag) => (
                <span 
                  key={tag}
                  className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-md border border-slate-200"
                >
                  {tag}
                </span>
              ))}
              {latestPost.tags.length > 4 && (
                <span className="text-xs text-slate-500 px-2 py-1">
                  +{latestPost.tags.length - 4} more
                </span>
              )}
            </div>
          )}
          
          <div className="pt-2">
            <Link 
              href={`/writing/${latestPost.slug}`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group text-sm"
            >
              Read full article
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </div>
      </div>
    ) : (
      /* No posts state */
      <div className="border border-slate-100 rounded-xl p-6 bg-slate-50/30 text-center">
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-slate-900">Coming Soon</h4>
          <p className="text-slate-600 text-sm">
            Working on articles about AI systems, machine learning engineering, and development insights.
          </p>
          <Link 
            href="/writing"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group text-sm"
          >
            Visit writing section
            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </div>
    )}
  </div>
</section>

        {/* Projects */}
        <section id="projects" className="py-12">
          <div className="space-y-10">
            <h3 className="text-2xl font-medium text-slate-900">Selected Projects</h3>
            
            <div className="space-y-16">
              {projects.filter(p => p.featured).map((project, index) => (
                <div key={project.name} className="grid lg:grid-cols-5 gap-8 items-start">
                  {/* Image */}
                  <div className={`lg:col-span-2 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <ImageGallery images={project.images} projectName={project.name} />
                  </div>

                  {/* Content */}
                  <div className={`lg:col-span-3 space-y-4 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xl font-medium text-slate-900">{project.name}</h4>
                        <span className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full">
                          {project.category}
                        </span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{project.description}</p>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span 
                          key={tech}
                          className="px-2 py-1 text-xs bg-slate-50 text-slate-700 rounded-md border border-slate-100"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 pt-1">
                      {project.links.github && (
                        <a 
                          href={project.links.github.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group text-sm"
                        >
                          <Github className="w-4 h-4" />
                          {project.links.github.label}
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      )}
                      {project.links.demo && (
                        <a 
                          href={project.links.demo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors group text-sm"
                        >
                          {project.links.demo.label}
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-12">
          <div className="space-y-10">
            <h3 className="text-2xl font-medium text-slate-900">Experience</h3>
            
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="border border-slate-100 rounded-xl p-6 bg-slate-50/50">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-medium text-slate-900">{exp.role}</h4>
                      <p className="text-blue-600 font-medium text-sm">{exp.company}</p>
                    </div>
                    <span className="text-xs text-slate-500 mt-1 sm:mt-0 font-medium">{exp.duration}</span>
                  </div>
                  
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="text-slate-600 leading-relaxed flex items-start text-sm">
                        <span className="text-slate-400 mr-3 mt-1.5 text-xs">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Section */}
        <section id="research" className="py-12">
          <div className="space-y-10">
            <h3 className="text-2xl font-medium text-slate-900">Research</h3>
            
            <div className="space-y-6">
              {research.map((paper, index) => (
                <article key={index} className="border border-slate-100 rounded-xl p-6 bg-slate-50/30">
                  <div className="space-y-5">
                    {/* Title and Conference */}
                    <div className="space-y-2">
                      <h4 className="text-lg font-medium text-slate-900 leading-snug">
                        {paper.title}
                      </h4>
                      <div className="space-y-1">
                        <div className="text-slate-600 font-medium text-sm">
                          {paper.venue} • {paper.year} • {paper.location}
                        </div>
                        <div className="text-xs text-slate-500">
                          Pages {paper.pages} • {paper.publisher} • DOI: {paper.doi}
                        </div>
                      </div>
                    </div>

                    {/* Authors */}
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-slate-700 uppercase tracking-wide">Authors</div>
                      <div className="text-slate-600 text-sm leading-relaxed">
                        {paper.authors.map((author, authorIndex) => (
                          <span key={authorIndex} className={author.includes("Utkarsh Kanwat") ? "font-semibold text-slate-900" : ""}>
                            {author}
                            {authorIndex < paper.authors.length - 1 && ", "}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-slate-500 space-y-0.5">
                        {Object.entries(paper.affiliations).map(([key, value]) => (
                          <div key={key}>
                            <span className="font-medium">{key}</span> {value}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Topics */}
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-slate-700 uppercase tracking-wide">Research Topics</div>
                      <div className="flex flex-wrap gap-1.5">
                        {paper.topics.map((topic) => (
                          <span 
                            key={topic}
                            className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-md border border-blue-100"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Abstract */}
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-slate-700 uppercase tracking-wide">Abstract</div>
                      <p className="text-slate-600 leading-relaxed text-sm">
                        {paper.abstract}
                      </p>
                    </div>

                    {/* Links */}
                    <div className="pt-2">
                      <a 
                        href={`https://www.scitepress.org/Link.aspx?doi=${paper.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors font-medium group text-sm"
                      >
                        Read Full Paper
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-slate-100 mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-0.5">
              <p className="text-slate-600 text-sm">Building AI systems for the future</p>
            </div>
            
            <div className="flex gap-4">
              <a 
                href="mailto:utkarshkanwat@gmail.com"
                className="text-slate-500 hover:text-slate-700 transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a 
                href="https://github.com/ukanwat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-700 transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/in/utkarsh-kanwat-806a95189/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-700 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}