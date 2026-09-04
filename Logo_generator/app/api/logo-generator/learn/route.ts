import { NextRequest, NextResponse } from 'next/server'
import {
  getLearnedLogos,
  saveLearnedLogo,
  deleteLearnedLogo,
  learnFromSvg,
  LearnedLogo,
} from '@/lib/learning-engine'

export async function GET() {
  try {
    const logos = getLearnedLogos()
    return NextResponse.json({
      success: true,
      count: logos.length,
      logos,
    })
  } catch (error) {
    console.error('Error fetching learned logos:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve learned logos' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { svgText, industry, brandName, designMetaphor, conceptTags, palette, typography, vectorArchetype } = body

    if (!industry || !brandName) {
      return NextResponse.json(
        { error: 'Both industry and brandName are required to train the learning engine.' },
        { status: 400 }
      )
    }

    let learnedRecord: LearnedLogo

    if (svgText && typeof svgText === 'string' && svgText.trim().length > 0) {
      // Auto-extract features, palette, and typography from the provided SVG
      learnedRecord = learnFromSvg(
        svgText,
        industry,
        brandName,
        designMetaphor,
        Array.isArray(conceptTags) ? conceptTags : []
      )
    } else {
      // Manual model registration
      learnedRecord = saveLearnedLogo({
        name: `${brandName} Learned Archetype`,
        industry,
        conceptTags: Array.isArray(conceptTags) ? conceptTags : [brandName.toLowerCase(), industry.toLowerCase()],
        designMetaphor: designMetaphor || `Bespoke vector archetype for ${industry}`,
        description: `Custom model trained for ${industry} inspired by ${brandName}.`,
        palette: palette || {
          id: `palette-${Date.now()}`,
          name: `${brandName} Custom Harmony`,
          c1: '#E3702D',
          c2: '#C8571B',
          c3: '#FDBA74',
          c4: '#2B4348',
          c5: '#FBFBFA',
          bg1: '#121A1C',
          bg2: '#1C292C',
          glow: 'rgba(227, 112, 45, 0.5)',
        },
        typography: typography || {
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          primaryWeight: '900',
          tracking: '4',
          taglineTracking: '8',
        },
        vectorArchetype: vectorArchetype || {
          style: 'dual_metaphor',
          depthStyle: 'glaze_reflection',
          features: ['Custom learned geometry'],
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: `Successfully trained logo generator on '${brandName}' for industry '${industry}'.`,
      learned: learnedRecord,
    })
  } catch (error) {
    console.error('Error training learned logo:', error)
    return NextResponse.json(
      { error: 'Failed to process and learn from logo input' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Missing logo ID' }, { status: 400 })
    }

    const removed = deleteLearnedLogo(id)
    if (!removed) {
      return NextResponse.json({ error: 'Logo not found or could not be removed' }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: `Removed learned model ${id}` })
  } catch (error) {
    console.error('Error deleting learned logo:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
