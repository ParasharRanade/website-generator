import { NextRequest, NextResponse } from 'next/server'
import { LogoImprovementRequest, LogoGenerationResponse } from '@/lib/types'
import { generateLogoPrompt, generateMultipleLogos, validateLogoRequest } from '@/lib/logo-generator'

export async function POST(request: NextRequest) {
  try {
    const body: LogoImprovementRequest = await request.json()

    // Validate request
    const validationError = validateLogoRequest(body)
    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      )
    }

    if (!body.feedback?.trim()) {
      return NextResponse.json(
        { error: 'Feedback is required for improvement' },
        { status: 400 }
      )
    }

    const basePrompt = body.originalPrompt || generateLogoPrompt(body)
    
    // Add user feedback to the prompt for improvement
    const improvedPrompt = `${basePrompt} Improvement feedback: ${body.feedback}. Apply these changes to enhance the logo design while maintaining the core brand identity.`
    
    const logos = await generateMultipleLogos(improvedPrompt, body.companyName, 4, body)

    const response: LogoGenerationResponse = {
      success: true,
      logos,
      prompt: improvedPrompt,
      metadata: {
        companyName: body.companyName,
        industry: body.industry,
        style: body.style,
        colors: body.colors,
        feedback: body.feedback,
        timestamp: new Date().toISOString(),
        usingFreeAPI: true,
        provider: 'Pollinations.ai',
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Logo improvement error:', error)
    return NextResponse.json(
      { error: 'Failed to improve logos' },
      { status: 500 }
    )
  }
}
