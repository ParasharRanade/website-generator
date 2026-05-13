// Template sources configuration
export interface TemplateSource {
  name: string
  baseUrl: string
  apiEndpoint?: string
  requiresAuth?: boolean
  rateLimit?: number
}

export interface ExternalTemplate {
  id: string
  name: string
  description: string
  thumbnail: string
  previewUrl: string
  downloadUrl: string
  price: number
  rating: number
  downloads: number
  tags: string[]
  category: string
  source: string
  features: string[]
  license: string
}

export interface TemplateSearchParams {
  query?: string
  category?: string
  industry?: string
  minRating?: number
  maxPrice?: number
  tags?: string[]
}

// Template sources (similar to be10x.com aggregation)
const TEMPLATE_SOURCES: TemplateSource[] = [
  {
    name: 'ThemeForest',
    baseUrl: 'https://themeforest.net',
    apiEndpoint: 'https://api.envato.com/v1/market',
    requiresAuth: true,
    rateLimit: 60
  },
  {
    name: 'TemplateMonster',
    baseUrl: 'https://www.templatemonster.com',
    apiEndpoint: 'https://api.templatemonster.com',
    requiresAuth: true
  },
  {
    name: 'HTML5 UP',
    baseUrl: 'https://html5up.net',
    requiresAuth: false
  },
  {
    name: 'BootstrapMade',
    baseUrl: 'https://bootstrapmade.com',
    requiresAuth: false
  },
  {
    name: 'StartBootstrap',
    baseUrl: 'https://startbootstrap.com',
    requiresAuth: false
  },
  {
    name: 'Creative Tim',
    baseUrl: 'https://www.creative-tim.com',
    requiresAuth: false
  }
]

// Mock data for demonstration (in production, replace with actual API calls)
const MOCK_TEMPLATES: ExternalTemplate[] = [
  {
    id: 'tf-1',
    name: 'Avada - Multi-Purpose WordPress Theme',
    description: 'The #1 selling WordPress theme of all time with 70+ pre-built websites',
    thumbnail: 'https://placehold.co/400x300/3B82F6/FFFFFF?text=Avada',
    previewUrl: 'https://avada.theme-fusion.com',
    downloadUrl: '#',
    price: 60,
    rating: 4.8,
    downloads: 850000,
    tags: ['wordpress', 'multipurpose', 'responsive', 'seo'],
    category: 'WordPress',
    source: 'ThemeForest',
    features: ['70+ Pre-built Websites', 'Fusion Builder', 'Advanced Options', 'SEO Optimized'],
    license: 'Commercial'
  },
  {
    id: 'tm-1',
    name: 'Monstroid2 - Multipurpose WordPress Theme',
    description: 'Powerful WordPress theme with multiple niche designs',
    thumbnail: 'https://placehold.co/400x300/8B5CF6/FFFFFF?text=Monstroid2',
    previewUrl: '#',
    downloadUrl: '#',
    price: 75,
    rating: 4.7,
    downloads: 120000,
    tags: ['wordpress', 'multipurpose', 'ecommerce'],
    category: 'WordPress',
    source: 'TemplateMonster',
    features: ['Multiple Skins', 'One-Click Install', 'WooCommerce Ready', 'Page Builder'],
    license: 'Commercial'
  },
  {
    id: 'html5-1',
    name: 'Massively - Responsive HTML5 Template',
    description: 'Free responsive HTML5 template with modern design',
    thumbnail: 'https://placehold.co/400x300/10B981/FFFFFF?text=Massively',
    previewUrl: 'https://html5up.net/massively',
    downloadUrl: 'https://html5up.net/massively/download',
    price: 0,
    rating: 4.5,
    downloads: 250000,
    tags: ['html5', 'responsive', 'free', 'modern'],
    category: 'HTML5',
    source: 'HTML5 UP',
    features: ['Fully Responsive', 'Modern Design', 'Free to Use', 'Clean Code'],
    license: 'CC BY 3.0'
  },
  {
    id: 'bs-1',
    name: 'DevStudio - Bootstrap 5 Template',
    description: 'Professional Bootstrap 5 template for developers',
    thumbnail: 'https://placehold.co/400x300/F59E0B/FFFFFF?text=DevStudio',
    previewUrl: '#',
    downloadUrl: '#',
    price: 0,
    rating: 4.6,
    downloads: 180000,
    tags: ['bootstrap', 'responsive', 'developer'],
    category: 'Bootstrap',
    source: 'BootstrapMade',
    features: ['Bootstrap 5', 'Clean Code', 'Responsive', 'Developer Friendly'],
    license: 'MIT'
  },
  {
    id: 'sb-1',
    name: 'SB Admin 2 - Bootstrap 4 Admin Dashboard',
    description: 'Free Bootstrap 4 admin dashboard template',
    thumbnail: 'https://placehold.co/400x300/EF4444/FFFFFF?text=SB+Admin',
    previewUrl: 'https://startbootstrap.com/themes/sb-admin-2',
    downloadUrl: 'https://startbootstrap.com/themes/sb-admin-2/download',
    price: 0,
    rating: 4.7,
    downloads: 320000,
    tags: ['bootstrap', 'admin', 'dashboard', 'free'],
    category: 'Admin',
    source: 'StartBootstrap',
    features: ['Dashboard Layout', 'Charts', 'Responsive', 'Free'],
    license: 'MIT'
  },
  {
    id: 'ct-1',
    name: 'Argon Design System - Bootstrap 4',
    description: 'Premium Bootstrap 4 design system',
    thumbnail: 'https://placehold.co/400x300/6366F1/FFFFFF?text=Argon',
    previewUrl: '#',
    downloadUrl: '#',
    price: 79,
    rating: 4.9,
    downloads: 95000,
    tags: ['bootstrap', 'design-system', 'premium'],
    category: 'Design System',
    source: 'Creative Tim',
    features: ['200+ Components', 'Plugins', 'Documentation', 'Premium Support'],
    license: 'Commercial'
  }
]

/**
 * Fetch templates from multiple sources
 * Similar to be10x.com aggregation logic
 */
export async function fetchTemplatesFromSources(params: TemplateSearchParams = {}): Promise<ExternalTemplate[]> {
  const allTemplates: ExternalTemplate[] = []
  
  // In production, make actual API calls to each source
  // For now, return mock data
  allTemplates.push(...MOCK_TEMPLATES)
  
  // Filter based on search params
  let filteredTemplates = allTemplates
  
  if (params.query) {
    const query = params.query.toLowerCase()
    filteredTemplates = filteredTemplates.filter(t =>
      t.name.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query) ||
      t.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }
  
  if (params.category) {
    filteredTemplates = filteredTemplates.filter(t =>
      t.category.toLowerCase() === params.category?.toLowerCase()
    )
  }
  
  if (params.industry) {
    filteredTemplates = filteredTemplates.filter(t =>
      t.tags.some(tag => tag.toLowerCase().includes(params.industry?.toLowerCase() || ''))
    )
  }
  
  if (params.minRating) {
    filteredTemplates = filteredTemplates.filter(t => t.rating >= (params.minRating || 0))
  }
  
  if (params.maxPrice !== undefined) {
    filteredTemplates = filteredTemplates.filter(t => t.price <= (params.maxPrice || Infinity))
  }
  
  if (params.tags && params.tags.length > 0) {
    filteredTemplates = filteredTemplates.filter(t =>
      params.tags!.some(tag => t.tags.includes(tag))
    )
  }
  
  // Rank templates by combined score (rating * downloads)
  const rankedTemplates = filteredTemplates.sort((a, b) => {
    const scoreA = a.rating * Math.log10(a.downloads + 1)
    const scoreB = b.rating * Math.log10(b.downloads + 1)
    return scoreB - scoreA
  })
  
  return rankedTemplates
}

/**
 * Get templates by industry (similar to be10x.com industry matching)
 */
export async function getTemplatesByIndustry(industry: string): Promise<ExternalTemplate[]> {
  const industryKeywords: Record<string, string[]> = {
    'SaaS': ['saas', 'software', 'startup', 'tech', 'app'],
    'Technology': ['technology', 'tech', 'software', 'digital'],
    'Portfolio': ['portfolio', 'personal', 'creative', 'freelance'],
    'Design': ['design', 'creative', 'agency', 'studio'],
    'E-commerce': ['ecommerce', 'shop', 'store', 'woocommerce', 'shopping'],
    'Retail': ['retail', 'shop', 'store', 'fashion'],
    'Healthcare': ['healthcare', 'medical', 'health', 'clinic', 'hospital'],
    'Finance': ['finance', 'financial', 'banking', 'investment'],
    'Education': ['education', 'learning', 'school', 'university', 'course'],
    'Food & Beverage': ['restaurant', 'food', 'cafe', 'bakery', 'delivery'],
    'Real Estate': ['realestate', 'property', 'housing', 'rental'],
    'Consulting': ['consulting', 'business', 'agency', 'professional'],
    'Marketing': ['marketing', 'digital', 'agency', 'seo']
  }
  
  const keywords = industryKeywords[industry] || [industry.toLowerCase()]
  
  return fetchTemplatesFromSources({ tags: keywords })
}

/**
 * Get best templates across all sources
 * Similar to be10x.com "best of" feature
 */
export async function getBestTemplates(limit: number = 10): Promise<ExternalTemplate[]> {
  const templates = await fetchTemplatesFromSources()
  return templates.slice(0, limit)
}

/**
 * Get free templates
 */
export async function getFreeTemplates(): Promise<ExternalTemplate[]> {
  const templates = await fetchTemplatesFromSources()
  return templates.filter(t => t.price === 0)
}

/**
 * Get templates by source
 */
export async function getTemplatesBySource(source: string): Promise<ExternalTemplate[]> {
  const templates = await fetchTemplatesFromSources()
  return templates.filter(t => t.source === source)
}

/**
 * Search templates with advanced filtering
 */
export async function searchTemplates(params: TemplateSearchParams): Promise<ExternalTemplate[]> {
  return fetchTemplatesFromSources(params)
}
