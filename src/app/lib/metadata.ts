import { Metadata } from "next";

const baseUrl = "https://utkarshkanwat.com";
const siteName = "Utkarsh Kanwat";
const authorName = "Utkarsh Kanwat";
const twitterHandle = "@ukanwat";

const defaultDescription = "AI Engineer specializing in LLM optimization, RAG systems, and production ML platforms. Published researcher from IIT Bombay with expertise in computer vision and deep learning systems.";

const commonKeywords = [
  "AI Engineer", 
  "Machine Learning", 
  "LLM Optimization", 
  "RAG Systems", 
  "Deep Learning", 
  "Computer Vision", 
  "IIT Bombay", 
  "Production ML",
  "AI Agent Development",
  "MLOps Engineer"
];

const defaultOGImage = {
  url: `${baseUrl}/og-default.png`,
  width: 1200,
  height: 630,
  alt: "Utkarsh Kanwat - AI Engineer & ML Research Expert",
};

// Base metadata that's common across all pages
export const baseMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  authors: [{ name: authorName, url: baseUrl }],
  creator: authorName,
  publisher: authorName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  twitter: {
    card: "summary_large_image",
    site: twitterHandle,
    creator: twitterHandle,
  },
};

// Generate page-specific metadata
export function createMetadata({
  title,
  description = defaultDescription,
  keywords = [],
  path = "",
  type = "website",
  images = [defaultOGImage],
}: {
  title: string;
  description?: string;
  keywords?: string[];
  path?: string;
  type?: "website" | "article" | "profile";
  images?: Array<{
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }>;
}): Metadata {
  const fullUrl = `${baseUrl}${path}`;
  const allKeywords = [...commonKeywords, ...keywords];
  
  return {
    ...baseMetadata,
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: allKeywords,
    openGraph: {
      type,
      locale: "en_US",
      siteName,
      title,
      description,
      url: fullUrl,
      images,
    },
    twitter: {
      ...baseMetadata.twitter,
      title,
      description,
      images: images.map(img => img.url),
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

// Pre-configured metadata for common pages
export const homeMetadata = createMetadata({
  title: "Utkarsh Kanwat - AI Engineer & Machine Learning Expert",
  description: "AI Engineer at ANZ building production LLM systems and RAG architectures. Published researcher from IIT Bombay specializing in computer vision, deep learning, and intelligent agent development.",
  keywords: [
    "Utkarsh Kanwat",
    "ANZ Engineer",
    "Production AI",
    "IIT Bombay Research",
    "Computer Vision",
    "Deep Learning Engineer",
  ],
  type: "profile",
});

export const writingMetadata = createMetadata({
  title: "AI Engineering Insights & Machine Learning Articles",
  description: "Technical articles on AI agent development, LLM optimization, production ML systems, and lessons from building scalable AI platforms. Written by AI Engineer and published researcher Utkarsh Kanwat.",
  keywords: [
    "AI Engineering Blog",
    "Machine Learning Articles",
    "AI Architecture", 
    "MLOps Best Practices",
    "Deep Learning Insights",
    "AI System Design"
  ],
  path: "/writing",
});

// Generate article metadata
export function createArticleMetadata({
  title,
  description,
  slug,
  publishedTime,
  tags = [],
  imageUrl,
}: {
  title: string;
  description: string;
  slug: string;
  publishedTime: string;
  tags?: string[];
  imageUrl?: string;
}): Metadata {
  const path = `/writing/${slug}`;
  const images = imageUrl 
    ? [{
        url: imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`,
        width: 1200,
        height: 630,
        alt: title,
      }]
    : [defaultOGImage];

  const metadata = createMetadata({
    title,
    description,
    keywords: tags,
    path,
    type: "article",
    images,
  });

  // Add article-specific metadata
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime,
      authors: [authorName],
      tags,
    },
    other: {
      'article:author': authorName,
      'article:published_time': publishedTime,
      'article:modified_time': publishedTime,
      'article:section': 'Technology',
      'article:tag': tags.join(','),
    },
  };
}