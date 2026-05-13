export interface CustomerProfile {
  companyName?: string
  founderName?: string
  missionStatement?: string
  targetAudience?: string
  brandValues?: string[]
  colorPreferences?: string[]
  designGoals?: string[]
  websiteGoals?: string[]
}

export interface TemplateConfig {
  websiteName: string
  industry: string
  tagline?: string
  templateType: 'saas' | 'portfolio' | 'ecommerce'
  sections: string[]
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  seo: SEOTags
  onlineTemplates?: OnlineTemplate[]
  customerProfile?: CustomerProfile
}

export interface OnlineTemplate {
  id: string
  name: string
  category: string
  previewUrl: string
  downloadUrl: string
  description: string
  features: string[]
  tags: string[]
  industry: string[]
  score?: number
  rating?: number
}

export interface SEOTags {
  title: string
  description: string
  keywords: string
  og: {
    title: string
    description: string
    type: string
    locale: string
  }
  twitter: {
    card: string
    title: string
    description: string
  }
}

export interface GenerateRequest {
  websiteName: string
  industry: string
  tagline?: string
}

export interface GenerateResponse {
  success: boolean
  template?: TemplateConfig
  error?: string
}
