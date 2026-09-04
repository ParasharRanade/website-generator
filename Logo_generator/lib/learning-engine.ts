// Learning Engine: Adaptive Logo Geometry, Palette, & Typography Extractor
// Ingests exemplary logos and continuously improves the synthesis algorithms for targeted industries.

import fs from 'fs'
import path from 'path'

export interface LearnedPalette {
  id: string
  name: string
  c1: string // Primary Accent
  c2: string // Deep / Shadow Tone
  c3: string // Highlight / Bright
  c4: string // Secondary Accent
  c5: string // Specular / Contrast Light
  bg1: string // Dark Canvas Backdrop 1
  bg2: string // Dark Canvas Backdrop 2
  glow: string
}

export interface LearnedTypography {
  fontFamily: string
  primaryWeight: string
  tracking: string
  taglineTracking?: string
}

export interface LearnedVectorArchetype {
  style: 'dual_metaphor' | 'badge_crest' | 'ligature_monogram' | 'minimalist_line' | 'geometric_abstract'
  depthStyle?: 'glaze_reflection' | 'neon_glow' | 'flat_minimal' | 'gold_specular'
  features?: string[]
  markSvgSnippet?: string
}

export interface LearnedLogo {
  id: string
  name: string
  industry: string
  conceptTags: string[]
  designMetaphor: string
  description: string
  palette: LearnedPalette
  typography: LearnedTypography
  vectorArchetype: LearnedVectorArchetype
  rawSvgSnippet?: string
  learnedAt: string
}

const DATA_DIR = path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'learned-logos.json')

const DEFAULT_LEARNED_LOGOS: LearnedLogo[] = [
  {
    id: 'cups-caps-dual-metaphor',
    name: 'Cups & Caps Dual-Metaphor Fusion',
    industry: 'Drinkware & Headwear',
    conceptTags: [
      'cups and caps',
      'cup',
      'cap',
      'drinkware',
      'headwear',
      'mug',
      'tumbler',
      'hat',
      'visor',
      'embroidery',
      'merch',
      'apparel & drinkware',
    ],
    designMetaphor: 'Artisan Ceramic Coffee Cup seamlessly fused with 3D Baseball Cap Visor Brim Base',
    description: 'Blends hot beverage steam, cylindrical ceramic body with specular glaze reflection, and athletic curved cap visor acting as a saucer.',
    palette: {
      id: 'terracotta_slate',
      name: 'Terracotta & Slate',
      c1: '#E3702D',
      c2: '#C8571B',
      c3: '#FDBA74',
      c4: '#2B4348',
      c5: '#FBFBFA',
      bg1: '#121A1C',
      bg2: '#1C292C',
      glow: 'rgba(227, 112, 45, 0.5)',
    },
    typography: {
      fontFamily: "'Plus Jakarta Sans', 'Montserrat', sans-serif",
      primaryWeight: '900',
      tracking: '4',
      taglineTracking: '12',
    },
    vectorArchetype: {
      style: 'dual_metaphor',
      depthStyle: 'glaze_reflection',
      features: [
        'Rising steam swirl curve',
        'Outer rim ellipse and inner fluid/porcelain surface',
        'Curved cup body with volumetric glaze reflection rect',
        'Circular ergonomic side handle',
        'Flowing baseball cap visor wave base',
        'Centrally aligned brand monogram crest',
      ],
    },
    learnedAt: '2026-09-04T20:26:49.000Z',
  },
]

export function getLearnedLogos(): LearnedLogo[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_LEARNED_LOGOS, null, 2), 'utf8')
      return DEFAULT_LEARNED_LOGOS
    }
    const content = fs.readFileSync(DATA_FILE, 'utf8')
    const parsed = JSON.parse(content)
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed
    }
    return DEFAULT_LEARNED_LOGOS
  } catch (err) {
    console.error('Failed to read learned-logos.json, returning default:', err)
    return DEFAULT_LEARNED_LOGOS
  }
}

export function saveLearnedLogo(entry: Omit<LearnedLogo, 'id' | 'learnedAt'> & { id?: string }): LearnedLogo {
  const logos = getLearnedLogos()
  const id = entry.id || `learned-${Date.now()}-${entry.name.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 20)}`
  
  const newRecord: LearnedLogo = {
    ...entry,
    id,
    learnedAt: new Date().toISOString(),
  }

  const existingIdx = logos.findIndex((l) => l.id === id)
  if (existingIdx >= 0) {
    logos[existingIdx] = newRecord
  } else {
    logos.unshift(newRecord)
  }

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(logos, null, 2), 'utf8')
  } catch (err) {
    console.error('Failed to persist learned logo:', err)
  }

  return newRecord
}

export function deleteLearnedLogo(id: string): boolean {
  try {
    const logos = getLearnedLogos()
    const filtered = logos.filter((l) => l.id !== id)
    if (filtered.length !== logos.length) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2), 'utf8')
      return true
    }
  } catch (err) {
    console.error('Failed to delete learned logo:', err)
  }
  return false
}

/**
 * Intelligent SVG Decompiler & Design Rule Extractor
 * Reads an uploaded or pasted SVG string, dissects its color harmony, gradients,
 * typography rules, and geometry, and produces a structured LearnedLogo record.
 */
export function learnFromSvg(
  svgText: string,
  industry: string,
  brandName: string,
  designMetaphor?: string,
  customTags?: string[]
): LearnedLogo {
  // 1. Color Extraction
  const hexMatches = Array.from(new Set(svgText.match(/#(?:[0-9a-fA-F]{3}){1,2}\b/g) || []))
  const rgbMatches = Array.from(new Set(svgText.match(/rgba?\([^)]+\)/g) || []))

  const cleanColors = hexMatches
    .map((c) => c.toUpperCase())
    .filter((c) => c !== '#000000' && c !== '#FFFFFF' && c !== '#FFF' && c !== '#000')

  const primary = cleanColors[0] || '#E3702D'
  const secondary = cleanColors[1] || '#C8571B'
  const highlight = cleanColors[2] || '#FDBA74'
  const accentDark = cleanColors[3] || '#2B4348'
  const contrastLight = hexMatches.find((c) => c.toUpperCase().startsWith('#F')) || '#FBFBFA'

  // 2. Typography Extraction
  let fontFamily = "'Plus Jakarta Sans', system-ui, sans-serif"
  const fontMatch = svgText.match(/font-family=["']([^"']+)["']/i)
  if (fontMatch && fontMatch[1]) {
    fontFamily = fontMatch[1].replace(/&quot;/g, '')
  }

  let fontWeight = '900'
  const weightMatch = svgText.match(/font-weight=["']([^"']+)["']/i)
  if (weightMatch && weightMatch[1]) {
    fontWeight = weightMatch[1]
  }

  let tracking = '4'
  const letterSpacingMatch = svgText.match(/letter-spacing=["']([^"']+)["']/i)
  if (letterSpacingMatch && letterSpacingMatch[1]) {
    tracking = letterSpacingMatch[1].replace(/px/i, '')
  }

  // 3. Feature Detection
  const features: string[] = []
  if (/<ellipse\b/i.test(svgText)) features.push('3D Elliptical perspective rims/bases')
  if (/<linearGradient\b/i.test(svgText)) features.push('Multi-stop linear volumetric gradients')
  if (/<filter\b/i.test(svgText)) features.push('Atmospheric drop shadows & luminous glows')
  if (/<rect[^>]+rx=["'][^0]/i.test(svgText)) features.push('Specular highlight reflections')
  if (svgText.toLowerCase().includes('cup') || svgText.toLowerCase().includes('cap')) {
    features.push('Dual visual metaphor fusion')
  }

  // 4. Tags synthesis
  const cleanName = brandName.toLowerCase()
  const nameParts = cleanName.split(/\s+/).filter(Boolean)
  const industryParts = industry.toLowerCase().split(/[\s,&/]+/).filter(Boolean)
  const tags = Array.from(new Set([...nameParts, ...industryParts, ...(customTags || [])]))

  const record = saveLearnedLogo({
    name: `${brandName} Learned Archetype`,
    industry,
    conceptTags: tags,
    designMetaphor: designMetaphor || `Signature learned vector visual geometry for ${industry}`,
    description: `Synthesized design model learned from ${brandName} reference SVG with custom ${primary} / ${secondary} color harmony and ${fontFamily} typography.`,
    palette: {
      id: `palette-${Date.now()}`,
      name: `${brandName} Harmony`,
      c1: primary,
      c2: secondary,
      c3: highlight,
      c4: accentDark,
      c5: contrastLight,
      bg1: '#0F1517',
      bg2: '#182226',
      glow: primary.startsWith('#') ? `rgba(${parseInt(primary.slice(1, 3), 16)}, ${parseInt(primary.slice(3, 5), 16)}, ${parseInt(primary.slice(5, 7), 16)}, 0.5)` : 'rgba(56, 189, 248, 0.45)',
    },
    typography: {
      fontFamily,
      primaryWeight: fontWeight,
      tracking,
      taglineTracking: '8',
    },
    vectorArchetype: {
      style: features.includes('Dual visual metaphor fusion') ? 'dual_metaphor' : 'geometric_abstract',
      depthStyle: features.includes('Specular highlight reflections') ? 'glaze_reflection' : 'neon_glow',
      features,
    },
    rawSvgSnippet: svgText.slice(0, 3000), // retain sample snippet for reference
  })

  return record
}

/**
 * Match incoming logo requests against learned models to inject custom archetypes
 */
export function matchLearnedLogo(industry: string, companyName: string, tagline?: string): LearnedLogo | null {
  const logos = getLearnedLogos()
  if (!logos || logos.length === 0) return null

  const searchTarget = `${companyName} ${industry} ${tagline || ''}`.toLowerCase()

  // 1. Direct industry match
  const industryMatch = logos.find(
    (l) => l.industry.toLowerCase().trim() === industry.toLowerCase().trim()
  )
  if (industryMatch) return industryMatch

  // 2. Concept tags match
  for (const item of logos) {
    for (const tag of item.conceptTags) {
      if (tag.length >= 3 && searchTarget.includes(tag.toLowerCase())) {
        return item
      }
    }
  }

  // 3. Partial industry substring match
  const partialIndustry = logos.find(
    (l) => industry.toLowerCase().includes(l.industry.toLowerCase()) || l.industry.toLowerCase().includes(industry.toLowerCase())
  )
  if (partialIndustry) return partialIndustry

  return null
}
