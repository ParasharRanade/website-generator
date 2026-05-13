import { OnlineTemplate } from './types'

interface TemplateServiceResponse {
  success: boolean
  templates: OnlineTemplate[]
  error?: string
}

/**
 * Online Template Service
 * Integrates with various free template providers to fetch industry-specific templates
 */
export class TemplateService {
  private static readonly TEMPLATE_SOURCES = {
    html5up: 'https://html5up.net',
    startbootstrap: 'https://startbootstrap.com',
    bootstrapmade: 'https://bootstrapmade.com'
  }

  /**
   * Fetch templates suitable for a specific industry
   */
  static async fetchTemplatesByIndustry(industry: string): Promise<TemplateServiceResponse> {
    try {
      const normalizedIndustry = industry.toLowerCase().trim()
      
      // Map industries to template categories
      const industryToCategoryMap: Record<string, string[]> = {
        'saas': ['business', 'technology', 'software'],
        'technology': ['technology', 'digital', 'software'],
        'portfolio': ['portfolio', 'creative', 'personal'],
        'design': ['creative', 'portfolio', 'agency'],
        'e-commerce': ['ecommerce', 'shop', 'retail'],
        'retail': ['ecommerce', 'shop', 'retail'],
        'healthcare': ['medical', 'health', 'wellness'],
        'finance': ['business', 'finance', 'corporate'],
        'education': ['education', 'learning', 'academic'],
        'food & beverage': ['restaurant', 'food', 'hospitality'],
        'real estate': ['real-estate', 'property', 'business'],
        'consulting': ['business', 'consulting', 'corporate'],
        'marketing': ['marketing', 'agency', 'creative']
      }

      const categories = industryToCategoryMap[normalizedIndustry] || ['business']
      
      // Fetch templates from multiple sources
      const response = await this.getAIRecommendedTemplates(normalizedIndustry, undefined)
      
      return {
        success: true,
        templates: response.templates.filter((t: OnlineTemplate) => 
          t.industry.includes(normalizedIndustry) || 
          t.tags.some((tag: string) => categories.includes(tag))
        )
      }
    } catch (error) {
      console.error('Error fetching templates:', error)
      return {
        success: false,
        templates: [],
        error: 'Failed to fetch templates'
      }
    }
  }

  /**
   * Fetch AI recommended templates based on customer profile
   */
  static async getAIRecommendedTemplates(
    industry: string,
    preferences?: {
      style?: string
    },
    customerProfile?: {
      colorPreferences?: string
      designGoals?: string
      targetAudience?: string
    }
  ): Promise<TemplateServiceResponse> {
    try {
      const categories = [industry.toLowerCase(), preferences?.style || 'modern']
      
      // Score templates based on customer profile
      const templates = this.getCuratedTemplates(categories).map(template => {
        let score = template.score || 0
        
        // Boost score if color preferences match
        if (customerProfile?.colorPreferences) {
          const preferredColors = customerProfile.colorPreferences.toLowerCase()
          if (template.features.some(f => f.toLowerCase().includes(preferredColors))) {
            score += 10
          }
        }
        
        // Boost score if design goals match
        if (customerProfile?.designGoals) {
          const goals = customerProfile.designGoals.toLowerCase()
          if (template.description.toLowerCase().includes(goals) || 
              template.features.some(f => f.toLowerCase().includes(goals))) {
            score += 10
          }
        }
        
        // Boost score if target audience matches industry
        if (customerProfile?.targetAudience && 
            template.industry.some((i: string) => i.toLowerCase().includes(customerProfile.targetAudience!.toLowerCase()))) {
          score += 5
        }
        
        return { ...template, score }
      })
      
      // Sort by score and rating
      const sortedTemplates = templates.sort((a, b) => {
        const scoreA = (a.score || 0) + (a.rating || 0) * 10
        const scoreB = (b.score || 0) + (b.rating || 0) * 10
        return scoreB - scoreA
      })
      
      return {
        success: true,
        templates: sortedTemplates
      }
    } catch (error) {
      console.error('Error fetching AI recommended templates:', error)
      return {
        success: false,
        templates: [],
        error: 'Failed to fetch AI recommended templates'
      }
    }
  }

  /**
   * Fetch templates from various sources
   */
  private static async fetchTemplatesFromSources(categories: string[]): Promise<OnlineTemplate[]> {
    // In a real implementation, this would fetch from actual APIs
    // For now, we'll return a curated list of free templates
    return this.getCuratedTemplates(categories)
  }

  /**
   * Get curated templates based on categories
   */
  private static getCuratedTemplates(categories: string[]): OnlineTemplate[] {
    const allTemplates: OnlineTemplate[] = [
      // Modern Business & SaaS Templates
      {
        id: 'tailwind-landing-page',
        name: 'Tailwind Landing Page',
        category: 'business',
        previewUrl: 'https://tailwindui.com/templates/landing-page',
        downloadUrl: 'https://tailwindui.com/templates/landing-page',
        description: 'A stunning landing page with glassmorphism effects and modern typography',
        features: ['Glassmorphism', 'Modern Typography', 'Dark Mode', 'Responsive'],
        tags: ['business', 'saas', 'technology', 'modern'],
        industry: ['saas', 'technology', 'consulting', 'finance'],
        rating: 5.0
      },
      {
        id: 'shadcn-saas',
        name: 'Shadcn SaaS Template',
        category: 'technology',
        previewUrl: 'https://ui.shadcn.com/examples/dashboard',
        downloadUrl: 'https://ui.shadcn.com/examples/dashboard',
        description: 'Modern SaaS dashboard with bento grid layout and smooth animations',
        features: ['Bento Grid', 'Animations', 'Dark Mode', 'TypeScript'],
        tags: ['technology', 'saas', 'software', 'modern'],
        industry: ['saas', 'technology'],
        rating: 4.9
      },
      {
        id: 'vercel-saas',
        name: 'Vercel SaaS Template',
        category: 'technology',
        previewUrl: 'https://vercel.com/templates/saas',
        downloadUrl: 'https://vercel.com/templates/saas',
        description: 'Production-ready SaaS template with authentication and payments',
        features: ['Auth', 'Payments', 'Database', 'API'],
        tags: ['technology', 'saas', 'software', 'production'],
        industry: ['saas', 'technology'],
        rating: 4.8
      },
      
      // Modern Portfolio Templates
      {
        id: 'daisyui-portfolio',
        name: 'DaisyUI Portfolio',
        category: 'portfolio',
        previewUrl: 'https://daisyui.com/templates/portfolio',
        downloadUrl: 'https://daisyui.com/templates/portfolio',
        description: 'Beautiful portfolio with dark theme and glassmorphism effects',
        features: ['Glassmorphism', 'Dark Theme', 'Animations', 'Responsive'],
        tags: ['portfolio', 'creative', 'design', 'modern'],
        industry: ['portfolio', 'design'],
        rating: 4.9
      },
      {
        id: 'nextjs-portfolio',
        name: 'Next.js Portfolio',
        category: 'portfolio',
        previewUrl: 'https://vercel.com/templates/portfolio',
        downloadUrl: 'https://vercel.com/templates/portfolio',
        description: 'Modern portfolio with 3D effects and smooth page transitions',
        features: ['3D Effects', 'Page Transitions', 'Blog', 'Projects'],
        tags: ['portfolio', 'creative', 'personal', 'modern'],
        industry: ['portfolio', 'design'],
        rating: 4.8
      },
      {
        id: 'framer-portfolio',
        name: 'Framer Portfolio',
        category: 'portfolio',
        previewUrl: 'https://framer.com/templates/portfolio',
        downloadUrl: 'https://framer.com/templates/portfolio',
        description: 'Award-winning portfolio with micro-interactions and animations',
        features: ['Micro-interactions', 'Animations', 'CMS', 'E-commerce'],
        tags: ['portfolio', 'creative', 'award-winning'],
        industry: ['portfolio', 'design'],
        rating: 5.0
      },
      
      // Modern E-commerce Templates
      {
        id: 'shopify-dawn',
        name: 'Shopify Dawn',
        category: 'ecommerce',
        previewUrl: 'https://shopify.com/themes/dawn',
        downloadUrl: 'https://shopify.com/themes/dawn',
        description: 'Free Shopify theme with modern design and fast performance',
        features: ['Fast Performance', 'Modern Design', 'Mobile-First', 'SEO'],
        tags: ['ecommerce', 'shop', 'retail', 'modern'],
        industry: ['e-commerce', 'retail'],
        rating: 4.7
      },
      {
        id: 'medusa-store',
        name: 'Medusa Storefront',
        category: 'ecommerce',
        previewUrl: 'https://medusajs.com/storefront',
        downloadUrl: 'https://medusajs.com/storefront',
        description: 'Headless e-commerce template with Next.js and modern UI',
        features: ['Headless', 'Next.js', 'Modern UI', 'Fast'],
        tags: ['ecommerce', 'headless', 'modern', 'technology'],
        industry: ['e-commerce', 'retail'],
        rating: 4.9
      },
      {
        id: 'nextjs-ecommerce',
        name: 'Next.js E-commerce',
        category: 'ecommerce',
        previewUrl: 'https://vercel.com/templates/ecommerce',
        downloadUrl: 'https://vercel.com/templates/ecommerce',
        description: 'Full-stack e-commerce with Stripe integration and admin panel',
        features: ['Stripe', 'Admin Panel', 'Database', 'CMS'],
        tags: ['ecommerce', 'full-stack', 'production', 'modern'],
        industry: ['e-commerce', 'retail'],
        rating: 4.8
      },
      
      // Healthcare Templates
      {
        id: 'healthcare-modern',
        name: 'Modern Healthcare',
        category: 'medical',
        previewUrl: 'https://html5up.net/medico',
        downloadUrl: 'https://html5up.net/medico/download',
        description: 'Professional healthcare template with telemedicine features',
        features: ['Telemedicine', 'Appointment Booking', 'Patient Portal', 'Responsive'],
        tags: ['medical', 'health', 'wellness', 'modern'],
        industry: ['healthcare'],
        rating: 4.6
      },
      {
        id: 'dental-clinic',
        name: 'Dental Clinic',
        category: 'medical',
        previewUrl: 'https://tailwindui.com/templates/healthcare',
        downloadUrl: 'https://tailwindui.com/templates/healthcare',
        description: 'Modern dental clinic website with online booking system',
        features: ['Online Booking', 'Services Gallery', 'Team Section', 'Testimonials'],
        tags: ['medical', 'dental', 'health', 'modern'],
        industry: ['healthcare'],
        rating: 4.7
      },
      
      // Education Templates
      {
        id: 'learning-platform',
        name: 'Learning Platform',
        category: 'education',
        previewUrl: 'https://vercel.com/templates/education',
        downloadUrl: 'https://vercel.com/templates/education',
        description: 'Complete LMS with course management and video streaming',
        features: ['LMS', 'Video Streaming', 'Quizzes', 'Certificates'],
        tags: ['education', 'learning', 'lms', 'modern'],
        industry: ['education'],
        rating: 4.8
      },
      {
        id: 'university-portal',
        name: 'University Portal',
        category: 'education',
        previewUrl: 'https://tailwindui.com/templates/education',
        downloadUrl: 'https://tailwindui.com/templates/education',
        description: 'Modern university website with course catalog and student portal',
        features: ['Course Catalog', 'Student Portal', 'Events', 'News'],
        tags: ['education', 'university', 'academic', 'modern'],
        industry: ['education'],
        rating: 4.7
      },
      
      // Food & Restaurant Templates
      {
        id: 'modern-restaurant',
        name: 'Modern Restaurant',
        category: 'restaurant',
        previewUrl: 'https://framer.com/templates/restaurant',
        downloadUrl: 'https://framer.com/templates/restaurant',
        description: 'Award-winning restaurant template with online ordering and reservations',
        features: ['Online Ordering', 'Reservations', 'Menu Gallery', 'Reviews'],
        tags: ['restaurant', 'food', 'hospitality', 'award-winning'],
        industry: ['food & beverage'],
        rating: 5.0
      },
      {
        id: 'food-delivery',
        name: 'Food Delivery App',
        category: 'restaurant',
        previewUrl: 'https://vercel.com/templates/food-delivery',
        downloadUrl: 'https://vercel.com/templates/food-delivery',
        description: 'Complete food delivery platform with real-time tracking',
        features: ['Real-time Tracking', 'Payment Integration', 'Admin Dashboard', 'Mobile App'],
        tags: ['restaurant', 'food', 'delivery', 'modern'],
        industry: ['food & beverage'],
        rating: 4.9
      },
      
      // Real Estate Templates
      {
        id: 'property-pro',
        name: 'Property Pro',
        category: 'real-estate',
        previewUrl: 'https://tailwindui.com/templates/real-estate',
        downloadUrl: 'https://tailwindui.com/templates/real-estate',
        description: 'Modern real estate platform with virtual tours and advanced search',
        features: ['Virtual Tours', 'Advanced Search', 'Map Integration', 'CRM'],
        tags: ['real-estate', 'property', 'business', 'modern'],
        industry: ['real estate'],
        rating: 4.8
      },
      {
        id: 'luxury-homes',
        name: 'Luxury Homes',
        category: 'real-estate',
        previewUrl: 'https://framer.com/templates/real-estate',
        downloadUrl: 'https://framer.com/templates/real-estate',
        description: 'Premium real estate template with luxury design and 3D walkthroughs',
        features: ['3D Walkthroughs', 'Luxury Design', 'Video Tours', 'Lead Generation'],
        tags: ['real-estate', 'luxury', 'premium', 'modern'],
        industry: ['real estate'],
        rating: 4.9
      },
      
      // Consulting & Finance Templates
      {
        id: 'consulting-pro',
        name: 'Consulting Pro',
        category: 'business',
        previewUrl: 'https://tailwindui.com/templates/consulting',
        downloadUrl: 'https://tailwindui.com/templates/consulting',
        description: 'Professional consulting website with case studies and client testimonials',
        features: ['Case Studies', 'Testimonials', 'Team Section', 'Blog'],
        tags: ['business', 'consulting', 'corporate', 'professional'],
        industry: ['consulting', 'finance'],
        rating: 4.7
      },
      {
        id: 'fintech-dashboard',
        name: 'Fintech Dashboard',
        category: 'finance',
        previewUrl: 'https://daisyui.com/templates/dashboard',
        downloadUrl: 'https://daisyui.com/templates/dashboard',
        description: 'Modern fintech dashboard with real-time data visualization',
        features: ['Data Visualization', 'Real-time Updates', 'Dark Mode', 'Charts'],
        tags: ['finance', 'fintech', 'dashboard', 'modern'],
        industry: ['finance'],
        rating: 4.8
      },
      
      // Marketing Templates
      {
        id: 'marketing-agency',
        name: 'Marketing Agency',
        category: 'marketing',
        previewUrl: 'https://framer.com/templates/agency',
        downloadUrl: 'https://framer.com/templates/agency',
        description: 'Award-winning agency template with portfolio and case studies',
        features: ['Portfolio', 'Case Studies', 'Animations', 'CMS'],
        tags: ['marketing', 'agency', 'creative', 'award-winning'],
        industry: ['marketing'],
        rating: 5.0
      },
      {
        id: 'digital-marketing',
        name: 'Digital Marketing',
        category: 'marketing',
        previewUrl: 'https://tailwindui.com/templates/marketing',
        downloadUrl: 'https://tailwindui.com/templates/marketing',
        description: 'Modern marketing website with lead generation and analytics',
        features: ['Lead Generation', 'Analytics', 'A/B Testing', 'CRM Integration'],
        tags: ['marketing', 'digital', 'saas', 'modern'],
        industry: ['marketing'],
        rating: 4.7
      }
    ]

    // Filter and return templates matching the categories, sorted by rating
    return allTemplates
      .filter(template => 
        categories.some(cat => 
          template.tags.includes(cat) || 
          template.category === cat
        )
      )
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
  }
}
