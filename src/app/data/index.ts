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

export const projects: Project[] = [
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

export const experiences: Experience[] = [
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

export const research: Research[] = [
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

// Export types as well for use in components
export type { Project, Experience, Research, ProjectLink };