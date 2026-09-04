import { NextRequest, NextResponse } from 'next/server'
import { LogoGenerationRequest, LogoGenerationResponse } from '@/lib/types'
import { generateLogoPrompt, generateMultipleLogos, validateLogoRequest } from '@/lib/logo-generator'
import { stylePrompts, colorPrompts, industryElements } from '@/lib/constants'

export async function POST(request: NextRequest) {
  try {
    const body: LogoGenerationRequest = await request.json()
    console.log('Received logo generation request:', body)

    // Validate request
    const validationError = validateLogoRequest(body)
    if (validationError) {
      console.error('Validation error:', validationError)
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      )
    }

    const prompt = generateLogoPrompt(body)
    console.log('Generated prompt:', prompt)
    
    const logos = await generateMultipleLogos(prompt, body.companyName, 4, body)
    console.log('Generated logos count:', logos.length)
    console.log('First logo URL length:', logos[0]?.length)

    const response: LogoGenerationResponse = {
      success: true,
      logos,
      prompt,
      metadata: {
        companyName: body.companyName,
        industry: body.industry,
        style: body.style,
        colors: body.colors,
        timestamp: new Date().toISOString(),
        usingFreeAPI: true,
        provider: 'SVG Generator',
      },
    }

    console.log('Sending response with', logos.length, 'logos')
    return NextResponse.json(response)
  } catch (error) {
    console.error('Logo generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate logos' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Logo Generator API',
    version: '2.2.0',
    provider: 'Pollinations.ai (Free - No API Key Required)',
    endpoints: {
      generate: '/api/logo-generator - Generate logos based on company details',
      improve: '/api/logo-generator/improve - Improve existing logos based on feedback',
    },
    supportedStyles: Object.keys(stylePrompts),
    supportedColors: Object.keys(colorPrompts),
    supportedIndustries: Object.keys(industryElements),
    features: [
      'Free AI image generation',
      'No API key required',
      'Multiple logo variations',
      'Industry-specific prompts',
      'Style and color customization',
      'Instant generation',
      'Logo improvement with feedback',
    ],
  })
}
