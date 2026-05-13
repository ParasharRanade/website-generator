import { NextRequest, NextResponse } from 'next/server'
import {
  saveTemplate,
  getAllSavedTemplates,
  getSavedTemplateById,
  deleteSavedTemplate,
  getTemplatesBySource,
  searchSavedTemplates
} from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const action = searchParams.get('action') || 'all'
    const id = searchParams.get('id')
    const source = searchParams.get('source')
    const query = searchParams.get('query')

    let result

    switch (action) {
      case 'by-id':
        if (!id) {
          return NextResponse.json({ error: 'ID parameter required' }, { status: 400 })
        }
        result = await getSavedTemplateById(id)
        break

      case 'by-source':
        if (!source) {
          return NextResponse.json({ error: 'Source parameter required' }, { status: 400 })
        }
        result = await getTemplatesBySource(source)
        break

      case 'search':
        if (!query) {
          return NextResponse.json({ error: 'Query parameter required' }, { status: 400 })
        }
        result = await searchSavedTemplates(query)
        break

      case 'all':
      default:
        result = await getAllSavedTemplates()
    }

    return NextResponse.json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('Error fetching saved templates:', error)
    return NextResponse.json(
      { error: 'Failed to fetch templates', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const savedTemplate = await saveTemplate({
      templateId: body.templateId,
      name: body.name,
      description: body.description,
      thumbnail: body.thumbnail,
      previewUrl: body.previewUrl,
      downloadUrl: body.downloadUrl,
      price: body.price,
      rating: body.rating,
      downloads: body.downloads,
      tags: body.tags,
      category: body.category,
      source: body.source,
      features: body.features,
      license: body.license,
      templateData: body.templateData
    })

    if (!savedTemplate) {
      return NextResponse.json({ error: 'Failed to save template' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      template: savedTemplate
    })
  } catch (error) {
    console.error('Error saving template:', error)
    return NextResponse.json(
      { error: 'Failed to save template', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID parameter required' }, { status: 400 })
    }

    const success = await deleteSavedTemplate(id)

    if (!success) {
      return NextResponse.json({ error: 'Failed to delete template' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Template deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting template:', error)
    return NextResponse.json(
      { error: 'Failed to delete template', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
