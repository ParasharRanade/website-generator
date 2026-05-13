import { NextRequest, NextResponse } from 'next/server'
import {
  fetchTemplatesFromSources,
  getTemplatesByIndustry,
  getBestTemplates,
  getFreeTemplates,
  searchTemplates
} from '@/lib/templateFetcher'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const action = searchParams.get('action') || 'all'
    const industry = searchParams.get('industry')
    const query = searchParams.get('query')
    const category = searchParams.get('category')
    const minRating = searchParams.get('minRating')
    const maxPrice = searchParams.get('maxPrice')
    const source = searchParams.get('source')
    const limit = searchParams.get('limit')

    let templates

    switch (action) {
      case 'industry':
        if (!industry) {
          return NextResponse.json({ error: 'Industry parameter required' }, { status: 400 })
        }
        templates = await getTemplatesByIndustry(industry)
        break

      case 'best':
        templates = await getBestTemplates(limit ? parseInt(limit) : 10)
        break

      case 'free':
        templates = await getFreeTemplates()
        break

      case 'search':
        templates = await searchTemplates({
          query: query || undefined,
          category: category || undefined,
          minRating: minRating ? parseFloat(minRating) : undefined,
          maxPrice: maxPrice ? parseFloat(maxPrice) : undefined
        })
        break

      case 'all':
      default:
        templates = await fetchTemplatesFromSources({
          query: query || undefined,
          category: category || undefined,
          minRating: minRating ? parseFloat(minRating) : undefined,
          maxPrice: maxPrice ? parseFloat(maxPrice) : undefined
        })
    }

    // Filter by source if specified
    if (source) {
      templates = templates.filter(t => t.source === source)
    }

    // Apply limit if specified
    if (limit) {
      templates = templates.slice(0, parseInt(limit))
    }

    return NextResponse.json({
      success: true,
      templates,
      count: templates.length
    })
  } catch (error) {
    console.error('Error fetching external templates:', error)
    return NextResponse.json(
      { error: 'Failed to fetch templates', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
