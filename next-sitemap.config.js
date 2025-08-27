/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://utkarshkanwat.com',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateIndexSitemap: false,
  
  // Custom paths with different priorities
  additionalPaths: async (config) => {
    const result = []
    
    // Homepage with highest priority
    result.push({
      loc: '/',
      changefreq: 'weekly',
      priority: 1.0,
      lastmod: new Date().toISOString(),
    })
    
    // Writing section
    result.push({
      loc: '/writing',
      changefreq: 'weekly', 
      priority: 0.8,
      lastmod: new Date().toISOString(),
    })

    return result
  },

  // Exclude certain paths
  exclude: ['/admin/*', '/api/*'],
  
  // Transform function to customize each URL
  transform: async (config, path) => {
    // Custom priority for blog posts
    if (path.startsWith('/writing/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      }
    }

    // Default values
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    }
  },
}