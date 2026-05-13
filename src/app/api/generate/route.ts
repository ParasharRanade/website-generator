import { NextRequest, NextResponse } from 'next/server'
import industryMappings from '@/lib/industry-mappings.json'
import { TemplateService } from '@/lib/template-service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { websiteName, industry, tagline, useOnlineTemplates = false, preferences, customerProfile, template } = body

    // Validate input
    if (!websiteName || !industry) {
      return NextResponse.json(
        { error: 'Website name and industry are required' },
        { status: 400 }
      )
    }

    // Get industry template mapping
    const normalizedIndustry = industry.trim().toLowerCase()
    const templateConfig = industryMappings.industryTemplates[normalizedIndustry as keyof typeof industryMappings.industryTemplates] || industryMappings.industryTemplates.default

    // Generate SEO meta tags
    const seoTags = generateSEOTags(websiteName, industry, tagline, templateConfig.keywords)

    let onlineTemplates = null

    // Fetch online templates if requested
    if (useOnlineTemplates) {
      const templateResponse = await TemplateService.getAIRecommendedTemplates(
        industry,
        preferences,
        customerProfile
      )
      onlineTemplates = templateResponse.success ? templateResponse.templates : []
    }

    // Return template configuration
    return NextResponse.json({
      success: true,
      template: {
        websiteName,
        industry,
        tagline,
        templateType: templateConfig.templateType,
        sections: templateConfig.sections,
        colors: templateConfig.defaultColors,
        seo: seoTags,
        onlineTemplates,
        customerProfile
      }
    })
  } catch (error) {
    console.error('Error generating template:', error)
    return NextResponse.json(
      { error: 'Failed to generate template' },
      { status: 500 }
    )
  }
}

function generateSEOTags(websiteName: string, industry: string, tagline: string | undefined, keywords: string[]) {
  const title = `${websiteName} - ${industry} Solutions${tagline ? ` | ${tagline}` : ''}`
  const description = tagline 
    ? `${websiteName} provides ${tagline}. Leading ${industry} solutions for modern businesses.`
    : `${websiteName} - Leading ${industry} solutions for modern businesses.`
  
  const metaKeywords = [websiteName, industry, ...keywords].join(', ')

  return {
    title,
    description,
    keywords: metaKeywords,
    og: {
      title,
      description,
      type: 'website',
      locale: 'en_US'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  }
}
