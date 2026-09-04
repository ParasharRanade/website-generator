// TypeScript types and interfaces for logo generation

export interface LogoGenerationRequest {
  companyName: string
  industry: string
  tagline?: string
  style: string
  colors: string
}

export interface LogoImprovementRequest extends LogoGenerationRequest {
  feedback: string
  originalPrompt?: string
}

export interface LogoGenerationResponse {
  success: boolean
  logos: string[]
  prompt: string
  metadata: {
    companyName: string
    industry: string
    style: string
    colors: string
    feedback?: string
    timestamp: string
    usingFreeAPI: boolean
    provider: string
  }
}

export interface ErrorResponse {
  error: string
}
