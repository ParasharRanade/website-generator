// Advanced Vector Logo Synthesis Engine - 100% Concept-Correlated Aesthetic Vector Art

import { LogoGenerationRequest, LogoImprovementRequest } from './types'
import { stylePrompts, colorPrompts, industryElements } from './constants'
import { matchLearnedLogo, getLearnedLogos } from './learning-engine'

export function generateLogoPrompt(request: LogoGenerationRequest | LogoImprovementRequest): string {
  const { companyName, industry, tagline, style, colors } = request

  const styleDescription = stylePrompts[style] || stylePrompts.modern
  const colorDescription = colorPrompts[colors] || colorPrompts.blue
  const industryDescription = industryElements[industry?.toLowerCase()] || industryElements.other

  const basePrompt = `Create a high-end, aesthetic, and artistic logo design for "${companyName}" in the ${industry} industry. `
  const stylePrompt = `Style: ${styleDescription}. Emphasize fluid organic curves, artistic silhouettes, and golden-ratio aesthetics. `
  const colorPrompt = `Color scheme: ${colorDescription}. Implement soft gradients, luminous lighting, and rich depth. `
  const industryPrompt = `Design elements: ${industryDescription}. Blend meaningful symbolism with high-end art-nouveau or modern aesthetic line-art. `
  const taglinePrompt = tagline ? `Tagline: "${tagline}" integrated elegantly into the design. ` : ''
  const technicalPrompt = `Ultra-premium aesthetic vector branding suitable for luxury packaging, digital apps, and stationery.`

  return basePrompt + stylePrompt + colorPrompt + industryPrompt + taglinePrompt + technicalPrompt
}

interface PaletteTheme {
  c1: string // Primary Accent
  c2: string // Deep Tone
  c3: string // Bright / Luminous Highlight
  c4: string // Secondary Accent
  c5: string // Gold / Specular
  bg1: string // Dark Backdrop 1
  bg2: string // Dark Backdrop 2
  glow: string
}

const colorMap: Record<string, PaletteTheme> = {
  blue: {
    c1: '#38bdf8',
    c2: '#1e40af',
    c3: '#93c5fd',
    c4: '#6366f1',
    c5: '#f0f9ff',
    bg1: '#070c18',
    bg2: '#0f172a',
    glow: 'rgba(56, 189, 248, 0.45)',
  },
  green: {
    c1: '#34d399',
    c2: '#065f46',
    c3: '#a7f3d0',
    c4: '#10b981',
    c5: '#ecfdf5',
    bg1: '#05130e',
    bg2: '#062c1e',
    glow: 'rgba(52, 211, 153, 0.45)',
  },
  purple: {
    c1: '#c084fc',
    c2: '#581c87',
    c3: '#e9d5ff',
    c4: '#ec4899',
    c5: '#faf5ff',
    bg1: '#0f051d',
    bg2: '#1e0838',
    glow: 'rgba(192, 132, 252, 0.45)',
  },
  orange: {
    c1: '#fb923c',
    c2: '#9a3412',
    c3: '#fed7aa',
    c4: '#eab308',
    c5: '#fff7ed',
    bg1: '#140803',
    bg2: '#2a1005',
    glow: 'rgba(251, 146, 60, 0.45)',
  },
  pink: {
    c1: '#f472b6',
    c2: '#831843',
    c3: '#fbcfe8',
    c4: '#fb7185',
    c5: '#fff1f2',
    bg1: '#160410',
    bg2: '#2b071e',
    glow: 'rgba(244, 114, 182, 0.45)',
  },
  teal: {
    c1: '#2dd4bf',
    c2: '#115e59',
    c3: '#99f6e4',
    c4: '#38bdf8',
    c5: '#f0fdfa',
    bg1: '#031413',
    bg2: '#062624',
    glow: 'rgba(45, 212, 191, 0.45)',
  },
  monochrome: {
    c1: '#f8fafc',
    c2: '#334155',
    c3: '#cbd5e1',
    c4: '#94a3b8',
    c5: '#ffffff',
    bg1: '#070a12',
    bg2: '#111827',
    glow: 'rgba(248, 250, 252, 0.35)',
  },
  gradient: {
    c1: '#818cf8',
    c2: '#db2777',
    c3: '#38bdf8',
    c4: '#c084fc',
    c5: '#fdf2f8',
    bg1: '#09081a',
    bg2: '#181236',
    glow: 'rgba(219, 39, 119, 0.5)',
  },
  terracotta: {
    c1: '#E3702D',
    c2: '#C8571B',
    c3: '#FDBA74',
    c4: '#2B4348',
    c5: '#FBFBFA',
    bg1: '#121A1C',
    bg2: '#1C292C',
    glow: 'rgba(227, 112, 45, 0.5)',
  },
}

const goldTheme: PaletteTheme = {
  c1: '#fbbf24',
  c2: '#92400e',
  c3: '#fef08a',
  c4: '#f59e0b',
  c5: '#fffbeb',
  bg1: '#120b02',
  bg2: '#261704',
  glow: 'rgba(251, 191, 36, 0.55)',
}

const neonTheme: PaletteTheme = {
  c1: '#00f0ff',
  c2: '#7000ff',
  c3: '#ff007b',
  c4: '#00ff66',
  c5: '#ffffff',
  bg1: '#03050e',
  bg2: '#070a1a',
  glow: 'rgba(0, 240, 255, 0.7)',
}

function escapeXml(unsafe: string): string {
  return (unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function extractMonogram(name: string): { primary: string; secondary: string; combined: string } {
  const clean = name.trim().replace(/[^a-zA-Z0-9\s]/g, '')
  const words = clean.split(/\s+/).filter(Boolean)
  if (words.length >= 2) {
    const w1 = words[0].charAt(0).toUpperCase()
    const w2 = words[1].charAt(0).toUpperCase()
    return { primary: w1, secondary: w2, combined: `${w1}${w2}` }
  }
  const single = clean.charAt(0).toUpperCase() || 'L'
  const second = clean.length > 1 ? clean.charAt(1).toUpperCase() : ''
  return { primary: single, secondary: second, combined: single }
}

function extractSemanticConcept(companyName: string, industry: string, tagline: string): string {
  const text = `${companyName} ${industry} ${tagline}`.toLowerCase()

  // Check dynamically trained models from the Learning Engine first
  const learned = matchLearnedLogo(industry, companyName, tagline)
  if (learned) {
    if (learned.id.includes('cups-caps') || learned.conceptTags.includes('cup') || learned.conceptTags.includes('cap')) {
      return 'cups_caps_merch'
    }
    return `learned_${learned.id}`
  }

  // 0. Cups & Caps / Drinkware & Headwear (Dual Metaphor Fusion)
  if (
    /\b(cups?\s*(?:and|&)\s*caps?|drinkware|headwear|cup|cups|cap|caps|mug|mugs|tumbler|tumblers|dad\s*hat|trucker|snapback|beanie|visor|drinkware\s*&\s*headwear)\b/i.test(text) ||
    industry.toLowerCase().includes('drinkware') ||
    industry.toLowerCase().includes('headwear')
  ) {
    return 'cups_caps_merch'
  }

  if (/\b(stock|market|trade|trading|predictor|prediction|forecast|finance|invest|capital|fund|crypto|wealth|bull|quant|algo|yield|money|equity|share|forex|bank|asset)\b/i.test(text)) return 'stock_market'
  if (/\b(astro|astrology|zodiac|horoscope|celestial|cosmic|planet|kundli|tarot|star|moon|cosmos|galaxy|solar|lunar|mystic|oracle)\b/i.test(text)) return 'astrology'
  if (/\b(print|press|cmyk|color|chromatic|ink|pantone|paper|offset|screenprint|vectorcraft|publish|litho|package|box|stamp|typo|graphic|art|canvas)\b/i.test(text) || industry.toLowerCase().includes('print')) return 'print_design'
  if (/\b(apex|peak|summit|vertex|mountain|pinnacle|top|horizon|height|zenith|elevation|ridge|alpine|highland)\b/i.test(text)) return 'apex_peak'
  if (/\b(quantum|atom|orbit|cyber|neural|synapse|nexus|ai|tech|data|cloud|core|robot|byte|code|software|dev|server|chip|matrix|system)\b/i.test(text) || industry.toLowerCase().includes('tech')) return 'tech_quantum'
  if (/\b(bio|health|care|life|gene|helix|med|pharma|therapeutics|cellular|dna|clinic|hospital|wellness|cure|body|doctor|pulse|vital|heal)\b/i.test(text) || industry.toLowerCase().includes('health')) return 'bio_health'
  if (/\b(crown|royal|imperial|king|queen|luxe|aurelia|monarch|gold|jewel|diamond|gem|luxury|prestige|exclusive|elite|tiara|elegance)\b/i.test(text) || industry.toLowerCase().includes('fashion')) return 'crown_luxe'
  if (/\b(real\s*estate|estate|property|home|house|realty|build|builder|arch|architect|tower|villa|land|residence|loft|haven|living)\b/i.test(text) || industry.toLowerCase().includes('estate')) return 'real_estate'
  if (/\b(coffee|roast|cafe|velvet|bean|brew|cup|bistro|bake|food|kitchen|restaurant|bar|dining|chef|flavor|taste|tea|bakery|grill|gourmet)\b/i.test(text) || industry.toLowerCase().includes('food')) return 'coffee_food'
  if (/\b(shield|guard|secure|armor|safe|defend|trust|fort|security|lock|vault|cyberguard|protect|sentinel)\b/i.test(text)) return 'shield_defense'
  if (/\b(eco|leaf|plant|tree|green|botanica|earth|forest|nature|flora|seed|solar|clean|recycle|garden|bio|sprout|organic|pure)\b/i.test(text)) return 'eco_nature'
  if (/\b(wave|ocean|aqua|flow|hydro|sea|river|water|stream|tide|surf|marine|nautilus|coastal)\b/i.test(text)) return 'wave_water'
  if (/\b(rocket|aero|fly|wing|falcon|eagle|sky|space|flight|jet|aviation|air|travel|tour|expedition|orbit|glide)\b/i.test(text) || industry.toLowerCase().includes('travel')) return 'aero_rocket'
  if (/\b(music|audio|sound|wave|beat|rhythm|radio|song|podcast|tune|acoustic|studio|melody|harmony|vocal)\b/i.test(text) || industry.toLowerCase().includes('entertainment')) return 'music_audio'
  if (/\b(edu|learn|academy|knowledge|school|study|book|read|brain|intellect|tutor|class|skill|wisdom|university|mentor)\b/i.test(text) || industry.toLowerCase().includes('education')) return 'edu_knowledge'
  if (/\b(flame|fire|forge|spark|blaze|heat|torch|burn|inferno|power|energy|volt|lightning|dynamic)\b/i.test(text)) return 'flame_energy'

  return 'monogram_emblem'
}

/**
 * 100% Concept-Correlated Aesthetic Vector Mark Generator
 * Every single variation (0, 1, 2, 3) is uniquely tailored to the identified concept!
 */
function buildAestheticMark(
  concept: string,
  variantIndex: number,
  theme: PaletteTheme,
  monogram: { primary: string; secondary: string; combined: string },
  s: number
): string {
  const { c1, c2, c3, c4, c5 } = theme
  const initial = monogram.primary
  const duo = monogram.combined

  if (concept.startsWith('learned_')) {
    const learnedId = concept.replace('learned_', '')
    const learned = getLearnedLogos().find((l) => l.id === learnedId)
    if (learned) {
      if (variantIndex === 0) {
        return `
        <!-- Learned Model Signature Archetype: ${escapeXml(learned.name)} -->
        <circle cx="0" cy="0" r="${s * 0.85}" fill="none" stroke="${c1}" stroke-width="2.5" stroke-dasharray="10 5" filter="url(#glow)"/>
        <path d="M ${-s * 0.7} ${s * 0.3} C ${-s * 0.85} ${-s * 0.6} 0 ${-s * 0.88} ${s * 0.7} ${-s * 0.3} C ${s * 0.85} ${s * 0.6} 0 ${s * 0.85} ${-s * 0.7} ${s * 0.3} Z" fill="url(#grad1)" filter="url(#drop)"/>
        <circle cx="0" cy="0" r="${s * 0.38}" fill="url(#coreGrad)" stroke="${c5}" stroke-width="2.5" filter="url(#glow)"/>
        <text x="0" y="${s * 0.12}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="${learned.typography.fontFamily}" font-weight="900" font-size="${duo.length > 1 ? s * 0.36 : s * 0.46}">${duo.length > 1 ? duo : initial}</text>
        `
      }
      if (variantIndex === 1) {
        return `
        <!-- Learned Model Heritage Badge Seal -->
        <circle cx="0" cy="0" r="${s * 0.88}" fill="none" stroke="${c5}" stroke-width="2"/>
        <circle cx="0" cy="0" r="${s * 0.72}" fill="url(#grad2)" opacity="0.3"/>
        <polygon points="0,${-s * 0.8} ${s * 0.68},0 0,${s * 0.8} ${-s * 0.68},0" fill="url(#grad1)" stroke="${c5}" stroke-width="2" filter="url(#drop)"/>
        <circle cx="0" cy="0" r="${s * 0.32}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2"/>
        <text x="0" y="${s * 0.1}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="${learned.typography.fontFamily}" font-weight="900" font-size="${s * 0.38}">${initial}</text>
        `
      }
      if (variantIndex === 2) {
        return `
        <!-- Learned Model Modern Ligature Shield -->
        <polygon points="0,${-s * 0.88} ${s * 0.75},${-s * 0.35} ${s * 0.75},${s * 0.4} 0,${s * 0.88} ${-s * 0.75},${s * 0.4} ${-s * 0.75},${-s * 0.35}" fill="url(#grad1)" stroke="${c5}" stroke-width="3" filter="url(#drop)"/>
        <text x="0" y="${s * 0.14}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="${learned.typography.fontFamily}" font-weight="900" font-size="${duo.length > 1 ? s * 0.42 : s * 0.52}">${duo.length > 1 ? duo : initial}</text>
        `
      }
      return `
      <!-- Learned Model Continuous Line-Art Emblem -->
      <circle cx="0" cy="0" r="${s * 0.82}" fill="none" stroke="url(#grad1)" stroke-width="${s * 0.08}" stroke-linecap="round" filter="url(#glow)"/>
      <circle cx="0" cy="0" r="${s * 0.35}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2"/>
      <text x="0" y="${s * 0.1}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="${learned.typography.fontFamily}" font-weight="900" font-size="${s * 0.36}">${initial}</text>
      `
    }
  }

  switch (concept) {
    // ═════════════════════════════════════════════════════════════════════════
    // 0. CUPS & CAPS / DRINKWARE & HEADWEAR (DUAL VISUAL METAPHOR)
    // ═════════════════════════════════════════════════════════════════════════
    case 'cups_caps_merch': {
      if (variantIndex === 0) {
        return `
        <!-- Variation 1: Signature Dual-Metaphor Fusion: Ceramic Cup on 3D Baseball Cap Visor -->
        <!-- Steam Swirl Curve -->
        <path d="M ${-s * 0.05} ${-s * 0.9} C ${s * 0.12} ${-s * 0.65} ${-s * 0.08} ${-s * 0.45} ${s * 0.06} ${-s * 0.22} C 0 ${-s * 0.3} ${s * 0.02} ${-s * 0.4} ${-s * 0.08} ${-s * 0.52} C ${-s * 0.14} ${-s * 0.65} ${-s * 0.07} ${-s * 0.8} ${-s * 0.05} ${-s * 0.9} Z" fill="${c4}" filter="url(#glow)"/>
        <!-- Cup Outer Rim -->
        <ellipse cx="0" cy="${-s * 0.1}" rx="${s * 0.58}" ry="${s * 0.16}" fill="${c4}"/>
        <!-- Cup Inner Porcelain Liquid Surface -->
        <ellipse cx="0" cy="${-s * 0.1}" rx="${s * 0.49}" ry="${s * 0.11}" fill="${c5}"/>
        <!-- Ergonomic Cup Handle -->
        <path d="M ${s * 0.42} ${s * 0.04} C ${s * 0.78} ${s * 0.08} ${s * 0.78} ${s * 0.56} ${s * 0.42} ${s * 0.56}" fill="none" stroke="${c2}" stroke-width="${s * 0.13}" stroke-linecap="round"/>
        <!-- Sculpted Ceramic Cup Body -->
        <path d="M ${-s * 0.56} ${-s * 0.07} C ${-s * 0.55} ${s * 0.45} ${-s * 0.4} ${s * 0.7} 0 ${s * 0.73} C ${s * 0.4} ${s * 0.7} ${s * 0.55} ${s * 0.45} ${s * 0.56} ${-s * 0.07} Z" fill="url(#grad1)" filter="url(#drop)"/>
        <!-- Volumetric Specular Glaze Highlight -->
        <rect x="${-s * 0.44}" y="${s * 0.1}" width="${s * 0.06}" height="${s * 0.32}" rx="${s * 0.03}" fill="#ffffff" opacity="0.75"/>
        <!-- Ambient Shadow Contour -->
        <path d="M ${s * 0.22} ${s * 0.03} C ${s * 0.45} ${s * 0.2} ${s * 0.48} ${s * 0.48} ${s * 0.3} ${s * 0.68} C ${s * 0.48} ${s * 0.48} ${s * 0.48} ${s * 0.2} ${s * 0.22} ${s * 0.03} Z" fill="#000000" opacity="0.2"/>
        <!-- Sculpted Cap Visor / Flowing Saucer Brim Underneath -->
        <path d="M ${-s * 0.85} ${s * 0.85} C ${-s * 0.75} ${s * 0.73} ${-s * 0.5} ${s * 0.65} ${-s * 0.2} ${s * 0.73} C ${s * 0.1} ${s * 0.81} ${s * 0.4} ${s * 0.78} ${s * 0.58} ${s * 0.6} L ${s * 0.58} ${s * 0.75} C ${s * 0.38} ${s * 0.9} ${s * 0.02} ${s * 0.95} ${-s * 0.3} ${s * 0.85} C ${-s * 0.6} ${s * 0.77} ${-s * 0.75} ${s * 0.85} ${-s * 0.85} ${s * 0.85} Z" fill="${c4}" filter="url(#drop)"/>
        <path d="M ${-s * 0.88} ${s * 0.87} C ${-s * 0.63} ${s * 0.62} ${-s * 0.15} ${s * 0.67} ${s * 0.58} ${s * 0.65} C ${s * 0.58} ${s * 0.78} ${s * 0.3} ${s * 0.93} ${-s * 0.15} ${s * 0.9} C ${-s * 0.55} ${s * 0.87} ${-s * 0.78} ${s * 0.97} ${-s * 0.88} ${s * 0.87} Z" fill="url(#grad2)"/>
        <!-- Brand Monogram Crest -->
        <circle cx="0" cy="${s * 0.32}" r="${s * 0.2}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2" filter="url(#glow)"/>
        <text x="0" y="${s * 0.4}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="${duo.length > 1 ? s * 0.24 : s * 0.3}">${duo.length > 1 ? duo : initial}</text>
        `
      }
      if (variantIndex === 1) {
        return `
        <!-- Variation 2: Circular Heritage Merch Seal & Embroidered Dad-Hat Emblem -->
        <circle cx="0" cy="0" r="${s * 0.88}" fill="none" stroke="${c1}" stroke-width="2.5" stroke-dasharray="8 4"/>
        <circle cx="0" cy="0" r="${s * 0.74}" fill="url(#coreGrad)" opacity="0.25"/>
        <circle cx="0" cy="0" r="${s * 0.58}" fill="none" stroke="${c5}" stroke-width="1.5" opacity="0.6"/>
        <!-- Structured Dad-Hat Cap Crown & Visor Silhouette -->
        <path d="M ${-s * 0.55} ${s * 0.22} C ${-s * 0.5} ${-s * 0.32} ${s * 0.25} ${-s * 0.32} ${s * 0.42} ${s * 0.18} L ${s * 0.76} ${s * 0.38} C ${s * 0.38} ${s * 0.48} 0 ${s * 0.46} ${-s * 0.55} ${s * 0.22} Z" fill="url(#grad1)" filter="url(#drop)"/>
        <path d="M ${-s * 0.4} ${s * 0.22} C ${-s * 0.08} ${s * 0.28} ${s * 0.35} ${s * 0.34} ${s * 0.76} ${s * 0.38}" fill="none" stroke="${c5}" stroke-width="3" stroke-linecap="round"/>
        <!-- Coffee Mug Patch on Cap Crown -->
        <rect x="${-s * 0.14}" y="${-s * 0.12}" width="${s * 0.28}" height="${s * 0.24}" rx="${s * 0.04}" fill="${c5}" filter="url(#glow)"/>
        <path d="M ${s * 0.14} ${-s * 0.08} C ${s * 0.24} ${-s * 0.08} ${s * 0.24} ${s * 0.08} ${s * 0.14} ${s * 0.08}" fill="none" stroke="${c5}" stroke-width="2.5"/>
        <path d="M ${-s * 0.06} ${-s * 0.22} Q ${-s * 0.03} ${-s * 0.32} ${-s * 0.06} ${-s * 0.42}" fill="none" stroke="${c1}" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M ${s * 0.06} ${-s * 0.22} Q ${s * 0.09} ${-s * 0.32} ${s * 0.06} ${-s * 0.42}" fill="none" stroke="${c1}" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Heritage Stars & Established Banner -->
        <circle cx="${-s * 0.55}" cy="${-s * 0.02}" r="${s * 0.05}" fill="${c1}" filter="url(#glow)"/>
        <circle cx="${s * 0.55}" cy="${-s * 0.02}" r="${s * 0.05}" fill="${c1}" filter="url(#glow)"/>
        <text x="0" y="${s * 0.68}" text-anchor="middle" dominant-baseline="middle" fill="${c5}" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="${s * 0.18}" letter-spacing="3">EST. 2024</text>
        `
      }
      if (variantIndex === 2) {
        return `
        <!-- Variation 3: Interlocking 'C & C' Typographic Ligature with Cup & Visor Motifs -->
        <!-- First C: Ceramic Cup Silhouette & Handle -->
        <path d="M ${s * 0.1} ${-s * 0.55} C ${-s * 0.6} ${-s * 0.55} ${-s * 0.75} ${s * 0.15} ${-s * 0.2} ${s * 0.55} C ${-s * 0.05} ${s * 0.6} ${s * 0.1} ${s * 0.55} ${s * 0.1} ${s * 0.55}" fill="none" stroke="url(#grad1)" stroke-width="${s * 0.14}" stroke-linecap="round" filter="url(#drop)"/>
        <path d="M ${-s * 0.65} ${-s * 0.15} C ${-s * 0.88} ${-s * 0.15} ${-s * 0.88} ${s * 0.25} ${-s * 0.65} ${s * 0.25}" fill="none" stroke="${c1}" stroke-width="${s * 0.08}" stroke-linecap="round"/>
        <!-- Second C: Interlocking Visor Arc Curve -->
        <path d="M ${s * 0.35} ${-s * 0.35} C ${-s * 0.05} ${-s * 0.35} ${-s * 0.15} ${s * 0.25} ${s * 0.35} ${s * 0.45} L ${s * 0.78} ${s * 0.6} C ${s * 0.5} ${s * 0.72} ${s * 0.2} ${s * 0.7} ${-s * 0.05} ${s * 0.55}" fill="none" stroke="url(#grad2)" stroke-width="${s * 0.14}" stroke-linecap="round" filter="url(#glow)"/>
        <!-- Central Steam Accent -->
        <path d="M 0 ${-s * 0.65} Q ${s * 0.06} ${-s * 0.78} 0 ${-s * 0.9}" fill="none" stroke="${c5}" stroke-width="3.5" stroke-linecap="round" filter="url(#glow)"/>
        <!-- Center Core Emblem -->
        <circle cx="${s * 0.05}" cy="${-s * 0.02}" r="${s * 0.22}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2" filter="url(#drop)"/>
        <text x="${s * 0.05}" y="${s * 0.06}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="${s * 0.28}">${initial}</text>
        `
      }
      return `
      <!-- Variation 4: Modern Minimalist Travel Tumbler & Trucker Cap Line-Art -->
      <!-- Tumbler Cylinder Outline -->
      <path d="M ${-s * 0.35} ${-s * 0.4} L ${-s * 0.28} ${s * 0.5} C ${-s * 0.28} ${s * 0.62} ${s * 0.28} ${s * 0.62} ${s * 0.28} ${s * 0.5} L ${s * 0.35} ${-s * 0.4} Z" fill="none" stroke="${c5}" stroke-width="3.5" stroke-linejoin="round" filter="url(#drop)"/>
      <ellipse cx="0" cy="${-s * 0.4}" rx="${s * 0.35}" ry="${s * 0.1}" fill="url(#coreGrad)" stroke="${c5}" stroke-width="2.5"/>
      <!-- Flowing Visor Curve Wrapping the Tumbler -->
      <path d="M ${-s * 0.75} ${s * 0.2} C ${-s * 0.4} ${s * 0.05} ${s * 0.3} ${s * 0.1} ${s * 0.8} ${s * 0.35} C ${s * 0.4} ${s * 0.48} ${-s * 0.2} ${s * 0.45} ${-s * 0.75} ${s * 0.2} Z" fill="url(#grad1)" stroke="${c1}" stroke-width="2" filter="url(#glow)"/>
      <!-- Rising Steam Ring -->
      <ellipse cx="0" cy="${-s * 0.65}" rx="${s * 0.18}" ry="${s * 0.06}" fill="none" stroke="${c3}" stroke-width="2.5" stroke-dasharray="6 3"/>
      <circle cx="0" cy="${s * 0.05}" r="${s * 0.2}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2"/>
      <text x="0" y="${s * 0.13}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="${duo.length > 1 ? s * 0.22 : s * 0.28}">${duo.length > 1 ? duo : initial}</text>
      `
    }

    // ═════════════════════════════════════════════════════════════════════════
    // 1. STOCK MARKET / FINANCE / PREDICTOR / WEALTH / TRADING
    // ═════════════════════════════════════════════════════════════════════════
    case 'stock_market': {
      if (variantIndex === 0) {
        return `
        <!-- Variation 1: Soaring Phoenix of Prosperity & Ascending Golden Trendline -->
        <path d="M 0 ${s * 0.8} C ${-s * 0.8} ${s * 0.2} ${-s * 0.9} ${-s * 0.6} ${-s * 0.2} ${-s * 0.85} C ${-s * 0.4} ${-s * 0.4} ${-s * 0.2} ${s * 0.1} 0 ${s * 0.8} Z" fill="url(#grad1)" filter="url(#drop)"/>
        <path d="M 0 ${s * 0.8} C ${s * 0.8} ${s * 0.2} ${s * 0.9} ${-s * 0.6} ${s * 0.2} ${-s * 0.85} C ${s * 0.4} ${-s * 0.4} ${s * 0.2} ${s * 0.1} 0 ${s * 0.8} Z" fill="url(#grad2)"/>
        <path d="M ${-s * 0.65} ${s * 0.4} Q 0 ${s * 0.2} ${s * 0.75} ${-s * 0.85}" fill="none" stroke="${c5}" stroke-width="4" stroke-linecap="round" filter="url(#glow)"/>
        <circle cx="${-s * 0.4}" cy="${s * 0.3}" r="${s * 0.06}" fill="${c3}"/>
        <circle cx="0" cy="${s * 0.15}" r="${s * 0.08}" fill="${c4}" filter="url(#glow)"/>
        <circle cx="${s * 0.45}" cy="${-s * 0.35}" r="${s * 0.1}" fill="${c5}" filter="url(#glow)"/>
        <circle cx="${s * 0.75}" cy="${-s * 0.85}" r="${s * 0.13}" fill="${c5}" filter="url(#glow)"/>
        <circle cx="0" cy="${s * 0.05}" r="${s * 0.32}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2.5" filter="url(#drop)"/>
        <text x="0" y="${s * 0.15}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Cinzel', serif" font-weight="900" font-size="${s * 0.38}">${initial}</text>
        `
      }
      if (variantIndex === 1) {
        return `
        <!-- Variation 2: Golden Bull Silhouette & Ascending Momentum Horns -->
        <path d="M ${-s * 0.7} ${-s * 0.6} C ${-s * 0.4} ${-s * 0.2} ${-s * 0.5} ${s * 0.4} 0 ${s * 0.7} C ${s * 0.5} ${s * 0.4} ${s * 0.4} ${-s * 0.2} ${s * 0.7} ${-s * 0.6} C ${s * 0.4} ${-s * 0.45} 0 ${-s * 0.2} 0 ${-s * 0.2} C 0 ${-s * 0.2} ${-s * 0.4} ${-s * 0.45} ${-s * 0.7} ${-s * 0.6} Z" fill="url(#grad1)" filter="url(#drop)"/>
        <path d="M ${-s * 0.75} ${-s * 0.7} Q ${-s * 0.3} ${-s * 0.1} ${s * 0.75} ${-s * 0.7}" fill="none" stroke="${c5}" stroke-width="3.5" stroke-linecap="round" filter="url(#glow)"/>
        <circle cx="0" cy="${s * 0.1}" r="${s * 0.35}" fill="url(#coreGrad)" stroke="${c5}" stroke-width="2" filter="url(#drop)"/>
        <text x="0" y="${s * 0.2}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Cinzel', serif" font-weight="900" font-size="${duo.length > 1 ? s * 0.36 : s * 0.46}">${duo.length > 1 ? duo : initial}</text>
        `
      }
      if (variantIndex === 2) {
        return `
        <!-- Variation 3: Candlestick Growth Prism Diamond & Coordinate Grid -->
        <polygon points="0,${-s * 0.9} ${s * 0.75},0 0,${s * 0.9} ${-s * 0.75},0" fill="url(#grad1)" stroke="${c5}" stroke-width="2.5" filter="url(#drop)"/>
        <line x1="${-s * 0.3}" y1="${s * 0.3}" x2="${-s * 0.3}" y2="${-s * 0.1}" stroke="${c3}" stroke-width="${s * 0.1}" stroke-linecap="round"/>
        <line x1="0" y1="${s * 0.2}" x2="0" y2="${-s * 0.4}" stroke="${c4}" stroke-width="${s * 0.12}" stroke-linecap="round" filter="url(#glow)"/>
        <line x1="${s * 0.3}" y1="${s * 0.1}" x2="${s * 0.3}" y2="${-s * 0.6}" stroke="${c5}" stroke-width="${s * 0.1}" stroke-linecap="round"/>
        <path d="M ${-s * 0.5} ${s * 0.35} L 0 ${-s * 0.1} L ${s * 0.55} ${-s * 0.65}" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" filter="url(#glow)"/>
        <circle cx="${s * 0.55}" cy="${-s * 0.65}" r="${s * 0.08}" fill="${c5}" filter="url(#glow)"/>
        `
      }
      return `
      <!-- Variation 4: Financial Barometer Ring & Quantum Delta Growth Vector -->
      <circle cx="0" cy="0" r="${s * 0.85}" fill="none" stroke="url(#grad1)" stroke-width="${s * 0.08}" stroke-dasharray="16 8" filter="url(#glow)"/>
      <path d="M ${-s * 0.5} ${s * 0.4} C ${-s * 0.2} ${s * 0.1} ${s * 0.1} ${-s * 0.1} ${s * 0.65} ${-s * 0.65}" fill="none" stroke="${c5}" stroke-width="4.5" stroke-linecap="round"/>
      <polygon points="${s * 0.65},${-s * 0.65} ${s * 0.4},${-s * 0.65} ${s * 0.65},${-s * 0.4}" fill="${c5}"/>
      <circle cx="0" cy="${s * 0.05}" r="${s * 0.28}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2"/>
      <text x="0" y="${s * 0.15}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="${s * 0.36}">${initial}</text>
      `
    }

    // ═════════════════════════════════════════════════════════════════════════
    // 2. ASTROLOGY / CELESTIAL / ZODIAC / COSMOS
    // ═════════════════════════════════════════════════════════════════════════
    case 'astrology': {
      if (variantIndex === 0) {
        return `
        <!-- Variation 1: Stardust Moon Goddess & Radiating 8-Point Sunburst -->
        <circle cx="0" cy="0" r="${s * 0.85}" fill="none" stroke="${c5}" stroke-width="1.5" stroke-dasharray="6 3" opacity="0.6"/>
        <path d="M 0 ${-s * 0.8} C ${-s * 0.8} ${-s * 0.5} ${-s * 0.8} ${s * 0.5} 0 ${s * 0.8} C ${-s * 0.4} ${s * 0.5} ${-s * 0.4} ${-s * 0.5} 0 ${-s * 0.8} Z" fill="url(#grad1)" filter="url(#drop)"/>
        <path d="M ${s * 0.2} ${-s * 0.4} L ${s * 0.25} ${-s * 0.15} L ${s * 0.5} ${-s * 0.1} L ${s * 0.25} ${-s * 0.05} L ${s * 0.2} ${s * 0.2} L ${s * 0.15} ${-s * 0.05} L ${-s * 0.1} ${-s * 0.1} L ${s * 0.15} ${-s * 0.15} Z" fill="${c5}" filter="url(#glow)"/>
        <circle cx="${s * 0.1}" cy="${s * 0.05}" r="${s * 0.28}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2" filter="url(#glow)"/>
        <text x="${s * 0.1}" y="${s * 0.13}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Cinzel', serif" font-weight="bold" font-size="${s * 0.34}">${initial}</text>
        `
      }
      if (variantIndex === 1) {
        return `
        <!-- Variation 2: 12-House Astrological Zodiac Mandala Ring -->
        <circle cx="0" cy="0" r="${s * 0.88}" fill="none" stroke="${c5}" stroke-width="2" stroke-dasharray="10 4"/>
        <circle cx="0" cy="0" r="${s * 0.68}" fill="url(#grad1)" opacity="0.25"/>
        <circle cx="0" cy="0" r="${s * 0.48}" fill="url(#coreGrad)" stroke="${c5}" stroke-width="2.5" filter="url(#drop)"/>
        <text x="0" y="${s * 0.12}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Cinzel', serif" font-weight="900" font-size="${duo.length > 1 ? s * 0.38 : s * 0.48}">${duo.length > 1 ? duo : initial}</text>
        `
      }
      if (variantIndex === 2) {
        return `
        <!-- Variation 3: Celestial Constellation Star Map & Golden Orbit Ring -->
        <ellipse cx="0" cy="0" rx="${s * 0.85}" ry="${s * 0.35}" fill="none" stroke="${c5}" stroke-width="2" transform="rotate(45)" filter="url(#glow)"/>
        <path d="M 0 ${-s * 0.75} L ${s * 0.55} ${s * 0.4} L ${-s * 0.55} ${s * 0.4} Z" fill="none" stroke="${c3}" stroke-width="1.5"/>
        <circle cx="0" cy="${-s * 0.75}" r="${s * 0.06}" fill="${c5}" filter="url(#glow)"/>
        <circle cx="${s * 0.55}" cy="${s * 0.4}" r="${s * 0.06}" fill="${c5}" filter="url(#glow)"/>
        <circle cx="${-s * 0.55}" cy="${s * 0.4}" r="${s * 0.06}" fill="${c5}" filter="url(#glow)"/>
        <circle cx="0" cy="0" r="${s * 0.3}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2"/>
        <text x="0" y="${s * 0.08}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Cinzel', serif" font-weight="900" font-size="${s * 0.36}">${initial}</text>
        `
      }
      return `
      <!-- Variation 4: Ethereal Cosmic Nebula Swirl & Celestial Crescent -->
      <path d="M ${-s * 0.7} ${s * 0.4} C ${-s * 0.9} ${-s * 0.6} 0 ${-s * 0.85} ${s * 0.7} ${-s * 0.3} C ${s * 0.9} ${s * 0.6} 0 ${s * 0.85} ${-s * 0.7} ${s * 0.4} Z" fill="url(#grad1)" filter="url(#drop)"/>
      <circle cx="${s * 0.3}" cy="${-s * 0.3}" r="${s * 0.07}" fill="${c5}" filter="url(#glow)"/>
      <circle cx="0" cy="0" r="${s * 0.32}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2"/>
      <text x="0" y="${s * 0.08}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Cinzel', serif" font-weight="900" font-size="${s * 0.38}">${initial}</text>
      `
    }

    // ═════════════════════════════════════════════════════════════════════════
    // 3. DESIGN & PRINTING / CMYK / PRESS / STUDIO
    // ═════════════════════════════════════════════════════════════════════════
    case 'print_design': {
      if (variantIndex === 0) {
        return `
        <!-- Variation 1: Watercolor CMYK Feathered Petals & Fountain Pen Core -->
        <path d="M 0 0 C ${-s * 0.7} ${-s * 0.4} ${-s * 0.5} ${-s * 0.8} 0 ${-s * 0.85} C ${s * 0.5} ${-s * 0.8} ${s * 0.7} ${-s * 0.4} 0 0 Z" fill="#00f0ff" opacity="0.75" filter="url(#drop)"/>
        <path d="M 0 0 C ${-s * 0.85} ${-s * 0.1} ${-s * 0.7} ${s * 0.5} ${-s * 0.45} ${s * 0.75} C ${-s * 0.1} ${s * 0.5} ${-s * 0.3} ${s * 0.1} 0 0 Z" fill="#ff007b" opacity="0.75" filter="url(#drop)"/>
        <path d="M 0 0 C ${s * 0.85} ${-s * 0.1} ${s * 0.7} ${s * 0.5} ${s * 0.45} ${s * 0.75} C ${s * 0.1} ${s * 0.5} ${s * 0.3} ${s * 0.1} 0 0 Z" fill="#ffd700" opacity="0.75" filter="url(#drop)"/>
        <path d="M 0 ${-s * 0.4} L ${s * 0.2} ${s * 0.1} L 0 ${s * 0.35} L ${-s * 0.2} ${s * 0.1} Z" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2" filter="url(#glow)"/>
        <line x1="0" y1="${-s * 0.4}" x2="0" y2="${s * 0.15}" stroke="${c5}" stroke-width="2"/>
        <text x="0" y="${s * 0.65}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Cinzel', serif" font-weight="900" font-size="${s * 0.3}">${initial}</text>
        `
      }
      if (variantIndex === 1) {
        return `
        <!-- Variation 2: Overlapping CMYK Offset Print Plates & Precision Crop Guides -->
        <circle cx="${-s * 0.25}" cy="${-s * 0.2}" r="${s * 0.42}" fill="#00f0ff" opacity="0.7"/>
        <circle cx="${s * 0.25}" cy="${-s * 0.2}" r="${s * 0.42}" fill="#ff007b" opacity="0.7"/>
        <circle cx="0" cy="${s * 0.25}" r="${s * 0.42}" fill="#ffd700" opacity="0.7"/>
        <circle cx="0" cy="0" r="${s * 0.75}" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="10 5"/>
        <circle cx="0" cy="0" r="${s * 0.32}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2"/>
        <text x="0" y="${s * 0.08}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="${duo.length > 1 ? s * 0.36 : s * 0.44}">${duo.length > 1 ? duo : initial}</text>
        `
      }
      if (variantIndex === 2) {
        return `
        <!-- Variation 3: Continuous Line Artist Palette & Blooming Vector Nib -->
        <path d="M ${-s * 0.6} ${s * 0.3} C ${-s * 0.8} ${-s * 0.6} ${s * 0.8} ${-s * 0.6} ${s * 0.6} ${s * 0.3} C ${s * 0.4} ${s * 0.7} 0 ${s * 0.8} ${-s * 0.3} ${s * 0.6} C ${-s * 0.45} ${s * 0.45} ${-s * 0.55} ${s * 0.45} ${-s * 0.6} ${s * 0.3} Z" fill="none" stroke="url(#grad1)" stroke-width="${s * 0.08}" stroke-linecap="round" filter="url(#glow)"/>
        <circle cx="${-s * 0.3}" cy="${-s * 0.2}" r="${s * 0.06}" fill="#00f0ff"/>
        <circle cx="0" cy="${-s * 0.35}" r="${s * 0.06}" fill="#ff007b"/>
        <circle cx="${s * 0.3}" cy="${-s * 0.2}" r="${s * 0.06}" fill="#ffd700"/>
        <circle cx="0" cy="${s * 0.1}" r="${s * 0.28}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2"/>
        <text x="0" y="${s * 0.18}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="${s * 0.34}">${initial}</text>
        `
      }
      return `
      <!-- Variation 4: Chromatic Spectrum Prism Silk Ribbon -->
      <path d="M ${-s * 0.7} ${s * 0.2} C ${-s * 0.8} ${-s * 0.5} 0 ${-s * 0.8} ${s * 0.7} ${-s * 0.2} C ${s * 0.8} ${s * 0.5} 0 ${s * 0.8} ${-s * 0.7} ${s * 0.2} Z" fill="url(#grad1)" filter="url(#drop)"/>
      <circle cx="0" cy="0" r="${s * 0.3}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2"/>
      <text x="0" y="${s * 0.08}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Cinzel', serif" font-weight="bold" font-size="${s * 0.36}">${initial}</text>
      `
    }

    // ═════════════════════════════════════════════════════════════════════════
    // 4. APEX / PEAK / MOUNTAINS / HORIZON
    // ═════════════════════════════════════════════════════════════════════════
    case 'apex_peak': {
      if (variantIndex === 0) {
        return `
        <!-- Variation 1: 3D Faceted Mountain Peak & Luminous Sunrise Horizon -->
        <path d="M 0 ${-s * 0.85} C ${-s * 0.5} ${-s * 0.2} ${-s * 0.7} ${s * 0.6} 0 ${s * 0.75} C ${s * 0.7} ${s * 0.6} ${s * 0.5} ${-s * 0.2} 0 ${-s * 0.85} Z" fill="url(#grad1)" filter="url(#drop)"/>
        <path d="M 0 ${-s * 0.85} C ${s * 0.4} ${-s * 0.1} ${s * 0.6} ${s * 0.5} 0 ${s * 0.75}" fill="url(#grad2)"/>
        <path d="M ${-s * 0.8} ${s * 0.3} Q 0 ${-s * 0.1} ${s * 0.8} ${s * 0.3}" fill="none" stroke="${c5}" stroke-width="3.5" stroke-linecap="round" filter="url(#glow)"/>
        <circle cx="0" cy="${-s * 0.85}" r="${s * 0.09}" fill="${c5}" filter="url(#glow)"/>
        <circle cx="0" cy="${s * 0.1}" r="${s * 0.28}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2"/>
        <text x="0" y="${s * 0.18}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="${s * 0.34}">${initial}</text>
        `
      }
      if (variantIndex === 1) {
        return `
        <!-- Variation 2: Twin Alpine Summit Chevrons & Summit Starburst -->
        <polygon points="0,${-s * 0.85} ${s * 0.65},${s * 0.5} 0,${s * 0.2} ${-s * 0.65},${s * 0.5}" fill="url(#grad1)" filter="url(#drop)"/>
        <polygon points="${s * 0.3},${-s * 0.5} ${s * 0.85},${s * 0.55} ${s * 0.3},${s * 0.35}" fill="url(#grad2)"/>
        <circle cx="0" cy="${-s * 0.85}" r="${s * 0.08}" fill="${c5}" filter="url(#glow)"/>
        <circle cx="0" cy="${s * 0.05}" r="${s * 0.3}" fill="url(#coreGrad)" stroke="${c5}" stroke-width="2"/>
        <text x="0" y="${s * 0.15}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="${duo.length > 1 ? s * 0.34 : s * 0.42}">${duo.length > 1 ? duo : initial}</text>
        `
      }
      if (variantIndex === 2) {
        return `
        <!-- Variation 3: Minimalist Single-Line Ridge & Golden Star -->
        <path d="M ${-s * 0.8} ${s * 0.5} L ${-s * 0.2} ${-s * 0.4} L 0 ${-s * 0.8} L ${s * 0.35} ${-s * 0.3} L ${s * 0.8} ${s * 0.5}" fill="none" stroke="${c5}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)"/>
        <circle cx="0" cy="${-s * 0.8}" r="${s * 0.1}" fill="${c5}" filter="url(#glow)"/>
        <circle cx="0" cy="${s * 0.1}" r="${s * 0.32}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2"/>
        <text x="0" y="${s * 0.2}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Cinzel', serif" font-weight="900" font-size="${s * 0.38}">${initial}</text>
        `
      }
      return `
      <!-- Variation 4: Horizon Shield & Summit Crest -->
      <path d="M 0 ${-s * 0.85} L ${s * 0.75} ${-s * 0.3} L ${s * 0.65} ${s * 0.55} L 0 ${s * 0.85} L ${-s * 0.65} ${s * 0.55} L ${-s * 0.75} ${-s * 0.3} Z" fill="url(#grad1)" stroke="${c5}" stroke-width="2.5" filter="url(#drop)"/>
      <circle cx="0" cy="${s * 0.05}" r="${s * 0.32}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2"/>
      <text x="0" y="${s * 0.15}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="${s * 0.38}">${initial}</text>
      `
    }

    // ═════════════════════════════════════════════════════════════════════════
    // 5. TECH / AI / QUANTUM / CYBER
    // ═════════════════════════════════════════════════════════════════════════
    case 'tech_quantum': {
      if (variantIndex === 0) {
        return `
        <!-- Variation 1: Bioluminescent Neural Lotus & Energy Vortex -->
        <ellipse cx="0" cy="0" rx="${s * 0.85}" ry="${s * 0.3}" fill="none" stroke="url(#grad1)" stroke-width="${s * 0.06}" transform="rotate(30)" filter="url(#glow)"/>
        <ellipse cx="0" cy="0" rx="${s * 0.85}" ry="${s * 0.3}" fill="none" stroke="url(#grad2)" stroke-width="${s * 0.06}" transform="rotate(-30)"/>
        <ellipse cx="0" cy="0" rx="${s * 0.85}" ry="${s * 0.3}" fill="none" stroke="url(#grad3)" stroke-width="${s * 0.06}" transform="rotate(90)"/>
        <circle cx="0" cy="0" r="${s * 0.34}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2.5" filter="url(#drop)"/>
        <text x="0" y="${s * 0.08}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Orbitron', monospace" font-weight="900" font-size="${s * 0.38}">${initial}</text>
        `
      }
      if (variantIndex === 1) {
        return `
        <!-- Variation 2: Quantum Processor Core & Hexagonal Node Matrix -->
        <polygon points="0,${-s * 0.85} ${s * 0.74},${-s * 0.42} ${s * 0.74},${s * 0.42} 0,${s * 0.85} ${-s * 0.74},${s * 0.42} ${-s * 0.74},${-s * 0.42}" fill="url(#grad1)" stroke="${c5}" stroke-width="3" filter="url(#drop)"/>
        <circle cx="0" cy="0" r="${s * 0.42}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2"/>
        <text x="0" y="${s * 0.08}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Orbitron', monospace" font-weight="900" font-size="${duo.length > 1 ? s * 0.36 : s * 0.46}">${duo.length > 1 ? duo : initial}</text>
        `
      }
      if (variantIndex === 2) {
        return `
        <!-- Variation 3: Neural Synapse Constellation & Glowing Data Streams -->
        <circle cx="0" cy="0" r="${s * 0.8}" fill="none" stroke="${c1}" stroke-width="1.5" stroke-dasharray="8 4" opacity="0.6"/>
        <line x1="${-s * 0.5}" y1="${-s * 0.5}" x2="${s * 0.5}" y2="${s * 0.5}" stroke="${c3}" stroke-width="2"/>
        <line x1="${s * 0.5}" y1="${-s * 0.5}" x2="${-s * 0.5}" y2="${s * 0.5}" stroke="${c3}" stroke-width="2"/>
        <circle cx="${-s * 0.5}" cy="${-s * 0.5}" r="${s * 0.08}" fill="${c5}" filter="url(#glow)"/>
        <circle cx="${s * 0.5}" cy="${-s * 0.5}" r="${s * 0.08}" fill="${c5}" filter="url(#glow)"/>
        <circle cx="${-s * 0.5}" cy="${s * 0.5}" r="${s * 0.08}" fill="${c5}" filter="url(#glow)"/>
        <circle cx="${s * 0.5}" cy="${s * 0.5}" r="${s * 0.08}" fill="${c5}" filter="url(#glow)"/>
        <circle cx="0" cy="0" r="${s * 0.32}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2" filter="url(#glow)"/>
        <text x="0" y="${s * 0.08}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Orbitron', monospace" font-weight="900" font-size="${s * 0.36}">${initial}</text>
        `
      }
      return `
      <!-- Variation 4: Cyber Holographic Infinity Nexus -->
      <path d="M ${-s * 0.7} 0 C ${-s * 0.7} ${-s * 0.5} ${-s * 0.2} ${-s * 0.5} 0 0 C ${s * 0.2} ${s * 0.5} ${s * 0.7} ${s * 0.5} ${s * 0.7} 0 C ${s * 0.7} ${-s * 0.5} ${s * 0.2} ${-s * 0.5} 0 0 C ${-s * 0.2} ${s * 0.5} ${-s * 0.7} ${s * 0.5} ${-s * 0.7} 0 Z" fill="none" stroke="url(#grad1)" stroke-width="${s * 0.1}" stroke-linecap="round" filter="url(#glow)"/>
      <circle cx="0" cy="0" r="${s * 0.26}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2"/>
      <text x="0" y="${s * 0.07}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Orbitron', monospace" font-weight="900" font-size="${s * 0.3}">${initial}</text>
      `
    }

    // ═════════════════════════════════════════════════════════════════════════
    // 6. HEALTH / BIO / WELLNESS / MEDICAL
    // ═════════════════════════════════════════════════════════════════════════
    case 'bio_health': {
      if (variantIndex === 0) {
        return `
        <!-- Variation 1: Blooming Sacred Lotus & Radiant Vitality Drop -->
        <path d="M 0 ${s * 0.6} C ${-s * 0.8} ${s * 0.2} ${-s * 0.7} ${-s * 0.5} 0 ${-s * 0.85} C ${-s * 0.2} ${-s * 0.2} 0 ${s * 0.3} 0 ${s * 0.6} Z" fill="url(#grad1)" filter="url(#drop)"/>
        <path d="M 0 ${s * 0.6} C ${s * 0.8} ${s * 0.2} ${s * 0.7} ${-s * 0.5} 0 ${-s * 0.85} C ${s * 0.2} ${-s * 0.2} 0 ${s * 0.3} 0 ${s * 0.6} Z" fill="url(#grad2)"/>
        <path d="M 0 ${-s * 0.4} C ${-s * 0.3} ${-s * 0.1} ${-s * 0.3} ${s * 0.3} 0 ${s * 0.45} C ${s * 0.3} ${s * 0.3} ${s * 0.3} ${-s * 0.1} 0 ${-s * 0.4} Z" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2" filter="url(#glow)"/>
        <text x="0" y="${s * 0.12}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="${s * 0.36}">${initial}</text>
        `
      }
      if (variantIndex === 1) {
        return `
        <!-- Variation 2: Tree of Life & Intertwined DNA Double Helix -->
        <path d="M ${-s * 0.35} ${-s * 0.8} C ${-s * 0.7} ${-s * 0.3} ${s * 0.7} ${s * 0.3} ${s * 0.35} ${s * 0.8}" fill="none" stroke="url(#grad1)" stroke-width="${s * 0.1}" stroke-linecap="round"/>
        <path d="M ${s * 0.35} ${-s * 0.8} C ${s * 0.7} ${-s * 0.3} ${-s * 0.7} ${s * 0.3} ${-s * 0.35} ${s * 0.8}" fill="none" stroke="url(#grad2)" stroke-width="${s * 0.1}" stroke-linecap="round"/>
        <line x1="${-s * 0.4}" y1="${-s * 0.3}" x2="${s * 0.4}" y2="${-s * 0.3}" stroke="${c5}" stroke-width="2.5"/>
        <line x1="${-s * 0.4}" y1="${s * 0.3}" x2="${s * 0.4}" y2="${s * 0.3}" stroke="${c5}" stroke-width="2.5"/>
        <circle cx="0" cy="0" r="${s * 0.3}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2" filter="url(#glow)"/>
        <text x="0" y="${s * 0.08}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="${duo.length > 1 ? s * 0.34 : s * 0.42}">${duo.length > 1 ? duo : initial}</text>
        `
      }
      if (variantIndex === 2) {
        return `
        <!-- Variation 3: Gentle Caring Hands & Blossoming Vitality Cross -->
        <path d="M ${-s * 0.7} ${s * 0.4} C ${-s * 0.6} ${s * 0.7} ${-s * 0.2} ${s * 0.8} 0 ${s * 0.8} C ${s * 0.2} ${s * 0.8} ${s * 0.6} ${s * 0.7} ${s * 0.7} ${s * 0.4}" fill="none" stroke="url(#grad1)" stroke-width="${s * 0.08}" stroke-linecap="round"/>
        <path d="M 0 ${-s * 0.6} L 0 ${s * 0.3}" stroke="${c5}" stroke-width="5" stroke-linecap="round"/>
        <path d="M ${-s * 0.45} ${-s * 0.15} L ${s * 0.45} ${-s * 0.15}" stroke="${c5}" stroke-width="5" stroke-linecap="round"/>
        <circle cx="0" cy="${-s * 0.15}" r="${s * 0.24}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2"/>
        <text x="0" y="${-s * 0.08}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="${s * 0.3}">${initial}</text>
        `
      }
      return `
      <!-- Variation 4: Organic Bio Health Cellular Stream -->
      <circle cx="0" cy="0" r="${s * 0.8}" fill="none" stroke="url(#grad1)" stroke-width="${s * 0.06}" stroke-dasharray="12 6" filter="url(#glow)"/>
      <circle cx="0" cy="0" r="${s * 0.34}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2"/>
      <text x="0" y="${s * 0.08}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="${s * 0.38}">${initial}</text>
      `
    }

    // ═════════════════════════════════════════════════════════════════════════
    // 7. LUXURY / FASHION / CROWN / JEWELS
    // ═════════════════════════════════════════════════════════════════════════
    case 'crown_luxe': {
      if (variantIndex === 0) {
        return `
        <!-- Variation 1: Majestic Royal Swan & Crown Filigree -->
        <path d="M ${-s * 0.2} ${s * 0.6} C ${-s * 0.7} ${s * 0.5} ${-s * 0.8} ${-s * 0.2} ${-s * 0.4} ${-s * 0.6} C ${-s * 0.1} ${-s * 0.3} ${-s * 0.3} ${s * 0.2} ${-s * 0.2} ${s * 0.6} Z" fill="url(#grad1)" filter="url(#drop)"/>
        <path d="M ${s * 0.2} ${s * 0.6} C ${s * 0.7} ${s * 0.5} ${s * 0.8} ${-s * 0.2} ${s * 0.4} ${-s * 0.6} C ${s * 0.1} ${-s * 0.3} ${s * 0.3} ${s * 0.2} ${s * 0.2} ${s * 0.6} Z" fill="url(#grad2)"/>
        <path d="M ${-s * 0.45} ${-s * 0.3} L ${-s * 0.5} ${-s * 0.65} L ${-s * 0.2} ${-s * 0.45} L 0 ${-s * 0.8} L ${s * 0.2} ${-s * 0.45} L ${s * 0.5} ${-s * 0.65} L ${s * 0.45} ${-s * 0.3} Z" fill="${c5}" filter="url(#glow)"/>
        <circle cx="0" cy="${s * 0.05}" r="${s * 0.3}" fill="url(#coreGrad)" stroke="${c5}" stroke-width="2" filter="url(#drop)"/>
        <text x="0" y="${s * 0.15}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Cinzel', serif" font-weight="900" font-size="${s * 0.4}">${initial}</text>
        `
      }
      if (variantIndex === 1) {
        return `
        <!-- Variation 2: Imperial 5-Point Crown & Brilliant-Cut Diamond -->
        <polygon points="0,${-s * 0.75} ${s * 0.65},${-s * 0.3} ${s * 0.45},${s * 0.6} ${-s * 0.45},${s * 0.6} ${-s * 0.65},${-s * 0.3}" fill="url(#grad1)" stroke="${c5}" stroke-width="2.5" filter="url(#drop)"/>
        <path d="M ${-s * 0.4} ${s * 0.4} L 0 ${-s * 0.65} L ${s * 0.4} ${s * 0.4}" stroke="${c5}" stroke-width="2"/>
        <circle cx="0" cy="${s * 0.05}" r="${s * 0.3}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2"/>
        <text x="0" y="${s * 0.15}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Cinzel', serif" font-weight="900" font-size="${duo.length > 1 ? s * 0.34 : s * 0.42}">${duo.length > 1 ? duo : initial}</text>
        `
      }
      if (variantIndex === 2) {
        return `
        <!-- Variation 3: Fine-Line Solitaire Gem & Radiant Filigree -->
        <polygon points="0,${-s * 0.8} ${s * 0.7},0 0,${s * 0.8} ${-s * 0.7},0" fill="none" stroke="${c5}" stroke-width="3" filter="url(#glow)"/>
        <circle cx="0" cy="0" r="${s * 0.38}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2"/>
        <text x="0" y="${s * 0.08}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Cinzel', serif" font-weight="900" font-size="${s * 0.42}">${initial}</text>
        `
      }
      return `
      <!-- Variation 4: Cartier-Style Golden Laurel Medallion -->
      ${buildAestheticLaurelWreath(s, c1)}
      <circle cx="0" cy="0" r="${s * 0.5}" fill="url(#coreGrad)" stroke="${c5}" stroke-width="2.5" filter="url(#drop)"/>
      <text x="0" y="${s * 0.14}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Cinzel', serif" font-weight="900" font-size="${s * 0.48}">${initial}</text>
      `
    }

    // ═════════════════════════════════════════════════════════════════════════
    // 8. COFFEE / CAFE / FOOD & BEVERAGE
    // ═════════════════════════════════════════════════════════════════════════
    case 'coffee_food': {
      if (variantIndex === 0) {
        return `
        <!-- Variation 1: Swirling Latte Art Heart & Botanical Coffee Sprigs -->
        <path d="M 0 ${s * 0.6} C ${-s * 0.6} ${s * 0.3} ${-s * 0.7} ${-s * 0.4} ${-s * 0.35} ${-s * 0.7} C ${-s * 0.1} ${-s * 0.5} 0 ${-s * 0.2} 0 0 C 0 ${-s * 0.2} ${s * 0.1} ${-s * 0.5} ${s * 0.35} ${-s * 0.7} C ${s * 0.7} ${-s * 0.4} ${s * 0.6} ${s * 0.3} 0 ${s * 0.6} Z" fill="url(#grad1)" filter="url(#drop)"/>
        <path d="M ${-s * 0.25} ${-s * 0.8} Q 0 ${-s * 1.05} ${-s * 0.15} ${-s * 1.2}" fill="none" stroke="${c5}" stroke-width="3" stroke-linecap="round" opacity="0.85"/>
        <circle cx="0" cy="${s * 0.05}" r="${s * 0.26}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2"/>
        <text x="0" y="${s * 0.13}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Cinzel', cursive" font-weight="bold" font-size="${s * 0.32}">${initial}</text>
        `
      }
      if (variantIndex === 1) {
        return `
        <!-- Variation 2: Artisan Golden Wheat Wreath & Chef Cloche -->
        <path d="M ${-s * 0.6} ${s * 0.6} C ${-s * 0.8} ${-s * 0.2} 0 ${-s * 0.8} 0 ${-s * 0.8} C 0 ${-s * 0.8} ${s * 0.8} ${-s * 0.2} ${s * 0.6} ${s * 0.6}" fill="none" stroke="${c5}" stroke-width="3" stroke-linecap="round"/>
        <circle cx="0" cy="${s * 0.05}" r="${s * 0.34}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2"/>
        <text x="0" y="${s * 0.15}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Cinzel', serif" font-weight="900" font-size="${duo.length > 1 ? s * 0.34 : s * 0.44}">${duo.length > 1 ? duo : initial}</text>
        `
      }
      if (variantIndex === 2) {
        return `
        <!-- Variation 3: Continuous Line-Art Steaming Ceramic Cup -->
        <path d="M ${-s * 0.55} ${-s * 0.1} L ${-s * 0.4} ${s * 0.5} Q 0 ${s * 0.65} ${s * 0.4} ${s * 0.5} L ${s * 0.55} ${-s * 0.1} Z" fill="none" stroke="${c5}" stroke-width="3.5" stroke-linejoin="round"/>
        <path d="M ${s * 0.5} 0 C ${s * 0.75} 0 ${s * 0.75} ${s * 0.35} ${s * 0.45} ${s * 0.35}" fill="none" stroke="${c5}" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="0" cy="${s * 0.15}" r="${s * 0.22}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2"/>
        <text x="0" y="${s * 0.22}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="${s * 0.28}">${initial}</text>
        `
      }
      return `
      <!-- Variation 4: Artisan Roasted Coffee Bean with Velvet Crema Swirl -->
      <ellipse cx="0" cy="${s * 0.05}" rx="${s * 0.6}" ry="${s * 0.72}" fill="url(#grad1)" transform="rotate(-20)" filter="url(#drop)"/>
      <path d="M ${-s * 0.3} ${-s * 0.5} C ${s * 0.15} ${-s * 0.15} ${-s * 0.15} ${s * 0.35} ${s * 0.3} ${s * 0.65}" fill="none" stroke="${c5}" stroke-width="4" stroke-linecap="round"/>
      <circle cx="${-s * 0.1}" cy="${s * 0.1}" r="${s * 0.24}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2"/>
      <text x="${-s * 0.1}" y="${s * 0.18}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Cinzel', serif" font-weight="bold" font-size="${s * 0.3}">${initial}</text>
      `
    }

    // ═════════════════════════════════════════════════════════════════════════
    // 9. DEFAULT / CUSTOM CONCEPT: BESPOKE CALLIGRAPHIC MONOGRAMS
    // ═════════════════════════════════════════════════════════════════════════
    default:
    case 'monogram_emblem': {
      if (variantIndex === 0) {
        return `
        <!-- Variation 1: Interlocking Bespoke Calligraphic Monogram with Laurel & Crown -->
        ${buildAestheticLaurelWreath(s, c1)}
        <circle cx="0" cy="0" r="${s * 0.72}" fill="none" stroke="${c5}" stroke-width="2" stroke-dasharray="4 4" opacity="0.6"/>
        <circle cx="0" cy="0" r="${s * 0.5}" fill="url(#coreGrad)" stroke="${c5}" stroke-width="2.5" filter="url(#drop)"/>
        <text x="0" y="${s * 0.14}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Cinzel', Georgia, serif" font-weight="900" font-size="${duo.length > 1 ? s * 0.42 : s * 0.52}" filter="url(#glow)">${duo.length > 1 ? duo : initial}</text>
        `
      }
      if (variantIndex === 1) {
        return `
        <!-- Variation 2: Dual-Letter Typographic Ligature Shield -->
        <polygon points="0,${-s * 0.85} ${s * 0.75},${-s * 0.35} ${s * 0.75},${s * 0.35} 0,${s * 0.85} ${-s * 0.75},${s * 0.35} ${-s * 0.75},${-s * 0.35}" fill="url(#grad1)" stroke="${c5}" stroke-width="3" filter="url(#drop)"/>
        <text x="0" y="${s * 0.14}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Cinzel', serif" font-weight="900" font-size="${duo.length > 1 ? s * 0.44 : s * 0.54}" filter="url(#glow)">${duo.length > 1 ? duo : initial}</text>
        `
      }
      if (variantIndex === 2) {
        return `
        <!-- Variation 3: Minimalist Flowing Line-Art Circle & Monogram -->
        <circle cx="0" cy="0" r="${s * 0.85}" fill="none" stroke="url(#grad2)" stroke-width="2" opacity="0.4"/>
        <path d="M ${-s * 0.6} ${s * 0.5} C ${-s * 0.8} ${-s * 0.4} 0 ${-s * 0.9} 0 0 C 0 ${s * 0.8} ${s * 0.8} ${-s * 0.4} ${s * 0.6} ${s * 0.5}" fill="none" stroke="url(#grad1)" stroke-width="${s * 0.08}" stroke-linecap="round" filter="url(#glow)"/>
        <circle cx="0" cy="0" r="${s * 0.32}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2" filter="url(#drop)"/>
        <text x="0" y="${s * 0.08}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="${s * 0.36}">${initial}</text>
        `
      }
      return `
      <!-- Variation 4: 3D Dimensional Silk Ribbon Swirl & Monogram -->
      <path d="M ${-s * 0.7} ${s * 0.3} C ${-s * 0.9} ${-s * 0.6} 0 ${-s * 0.85} ${s * 0.7} ${-s * 0.3} C ${s * 0.9} ${s * 0.6} 0 ${s * 0.85} ${-s * 0.7} ${s * 0.3} Z" fill="url(#grad1)" opacity="0.85" filter="url(#drop)"/>
      <circle cx="0" cy="0" r="${s * 0.28}" fill="url(#coreGrad)" stroke="#ffffff" stroke-width="2"/>
      <text x="0" y="${s * 0.08}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="'Cinzel', serif" font-weight="bold" font-size="${s * 0.34}">${initial}</text>
      `
    }
  }
}

function buildAestheticLaurelWreath(s: number, color: string): string {
  return `
  <!-- Aesthetic Laurel Wreath Frame -->
  <path d="M ${-s * 0.1} ${s * 0.75} C ${-s * 0.7} ${s * 0.65} ${-s * 0.85} ${-s * 0.2} ${-s * 0.35} ${-s * 0.75} C ${-s * 0.55} ${-s * 0.3} ${-s * 0.45} ${s * 0.35} ${-s * 0.1} ${s * 0.75} Z" fill="${color}" opacity="0.35"/>
  <path d="M ${s * 0.1} ${s * 0.75} C ${s * 0.7} ${s * 0.65} ${s * 0.85} ${-s * 0.2} ${s * 0.35} ${-s * 0.75} C ${s * 0.55} ${-s * 0.3} ${s * 0.45} ${s * 0.35} ${s * 0.1} ${s * 0.75} Z" fill="${color}" opacity="0.35"/>
  <circle cx="0" cy="${s * 0.76}" r="${s * 0.05}" fill="${color}" opacity="0.8"/>
  <circle cx="${-s * 0.65}" cy="${0}" r="${s * 0.035}" fill="${color}" opacity="0.7"/>
  <circle cx="${s * 0.65}" cy="${0}" r="${s * 0.035}" fill="${color}" opacity="0.7"/>
  `
}

function buildAtmosphericBackground(
  theme: PaletteTheme,
  width: number,
  height: number,
  isNeon: boolean,
  isGold: boolean
): string {
  const { c1, c3, c4 } = theme
  const cx = width / 2
  const cy = height / 2 - 20

  let extra = ''
  if (isGold) {
    extra += `
    <path d="M ${cx - 150} ${cy - 110} L ${cx - 146} ${cy - 100} L ${cx - 136} ${cy - 96} L ${cx - 146} ${cy - 92} L ${cx - 150} ${cy - 82} L ${cx - 154} ${cy - 92} L ${cx - 164} ${cy - 96} L ${cx - 154} ${cy - 100} Z" fill="#ffd700" opacity="0.8" filter="url(#glow)"/>
    <path d="M ${cx + 150} ${cy + 100} L ${cx + 153} ${cy + 108} L ${cx + 161} ${cy + 111} L ${cx + 153} ${cy + 114} L ${cx + 150} ${cy + 122} L ${cx + 147} ${cy + 114} L ${cx + 139} ${cy + 111} L ${cx + 147} ${cy + 108} Z" fill="#ffd700" opacity="0.8" filter="url(#glow)"/>
    `
  }
  if (isNeon) {
    extra += `
    <circle cx="${cx}" cy="${cy}" r="220" fill="none" stroke="${c4}" stroke-width="1.5" stroke-dasharray="10 5" opacity="0.4" filter="url(#glow)"/>
    `
  }

  return `
  <circle cx="${cx}" cy="${cy}" r="180" fill="${c1}" opacity="0.14" filter="url(#ambientGlow)"/>
  <circle cx="${cx + 60}" cy="${cy - 60}" r="120" fill="${c3}" opacity="0.1" filter="url(#ambientGlow)"/>
  ${extra}
  `
}

export function generateLogoImage(
  prompt: string,
  seed: number,
  companyName: string,
  variantIndex: number = 0,
  colors: string = 'blue',
  tagline: string = '',
  width: number = 512,
  height: number = 512,
  style: string = 'modern',
  feedback: string = '',
  industry: string = ''
): string {
  try {
    const monogram = extractMonogram(companyName)
    const semanticConcept = extractSemanticConcept(companyName, industry, tagline)

    const fLower = (feedback || '').toLowerCase()
    const isGold = /\b(gold|metallic|luxury|platinum|regal|24k|champagne)\b/i.test(fLower)
    const isNeon = /\b(neon|glow|cyber|holographic|laser|electric|bright|hologram)\b/i.test(fLower)
    const isBold = /\b(bold|bolder|heavy|thick|black|strong)\b/i.test(fLower)

    const learned = matchLearnedLogo(industry, companyName, tagline)

    let activeColors = colors
    if (learned && (colors === 'blue' || !colors)) {
      activeColors = learned.palette.id in colorMap ? learned.palette.id : 'terracotta'
    } else if (semanticConcept === 'cups_caps_merch' && (colors === 'blue' || !colors || colors === 'terracotta')) {
      activeColors = 'terracotta'
    }

    if (isGold) activeColors = 'orange'
    else if (/\bpink\b/i.test(fLower)) activeColors = 'pink'
    else if (/\bpurple\b/i.test(fLower)) activeColors = 'purple'
    else if (/\bteal|cyan\b/i.test(fLower)) activeColors = 'teal'
    else if (/\bgreen\b/i.test(fLower)) activeColors = 'green'
    else if (/\bblue\b/i.test(fLower)) activeColors = 'blue'
    else if (/\bmonochrome\b/i.test(fLower)) activeColors = 'monochrome'
    else if (/\bterracotta|slate|charcoal|burnt\b/i.test(fLower)) activeColors = 'terracotta'

    let theme: PaletteTheme = colorMap[activeColors] || colorMap.blue
    if (learned && (!colors || colors === 'blue')) {
      theme = {
        c1: learned.palette.c1,
        c2: learned.palette.c2,
        c3: learned.palette.c3,
        c4: learned.palette.c4,
        c5: learned.palette.c5,
        bg1: learned.palette.bg1,
        bg2: learned.palette.bg2,
        glow: learned.palette.glow,
      }
    }
    if (isGold) theme = goldTheme
    else if (isNeon) theme = neonTheme

    const { c1, c2, c3, c4, c5, bg1, bg2 } = theme
    const sanitizedName = escapeXml(companyName.trim() || 'Brand')
    const cx = width / 2
    const cy = height / 2 - 32
    const markSize = isBold ? 105 : 95

    const markContent = buildAestheticMark(semanticConcept, variantIndex, theme, monogram, markSize)
    const atmosphericBg = buildAtmosphericBackground(theme, width, height, isNeon, isGold)

    const nameWords = sanitizedName.split(' ')
    const wordmarkWeight = isBold ? '900' : '800'
    const wordmarkFontSize = isBold ? 26 : 23
    const strokeAttr = isBold ? `stroke="url(#textGrad)" stroke-width="1"` : ''

    let wordmarkSvg = ''
    if (nameWords.length > 1) {
      const firstWord = nameWords[0]
      const restWords = nameWords.slice(1).join(' ')
      wordmarkSvg = `
      <text x="${cx}" y="${cy + markSize + 54}" text-anchor="middle" ${strokeAttr}>
        <tspan fill="#ffffff" font-weight="${wordmarkWeight}">${firstWord} </tspan>
        <tspan fill="url(#textGrad)" font-weight="${wordmarkWeight}">${restWords}</tspan>
      </text>`
    } else {
      wordmarkSvg = `
      <text x="${cx}" y="${cy + markSize + 54}" text-anchor="middle" fill="#ffffff" font-weight="${wordmarkWeight}" ${strokeAttr}>${sanitizedName}</text>`
    }

    const taglineY = cy + markSize + 84
    const taglineBlock = tagline
      ? `
      <rect x="${cx - 110}" y="${taglineY - 14}" width="220" height="22" rx="11" fill="rgba(255,255,255,0.06)" stroke="${c1}" stroke-width="1" stroke-opacity="0.3"/>
      <text x="${cx}" y="${taglineY}" text-anchor="middle" fill="${c3}" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="700" font-size="9.5" letter-spacing="3.5">${escapeXml(tagline.toUpperCase())}</text>
      `
      : `
      <line x1="${cx - 45}" y1="${taglineY - 6}" x2="${cx + 45}" y2="${taglineY - 6}" stroke="url(#grad1)" stroke-width="2" stroke-linecap="round" opacity="0.75"/>
      <circle cx="${cx}" cy="${taglineY - 6}" r="3" fill="${c5}" filter="url(#glow)"/>
      `

    const fontFamily =
      style === 'classic'
        ? "'Cinzel', Georgia, serif"
        : style === 'tech'
        ? "'Orbitron', 'Courier New', monospace"
        : style === 'playful'
        ? "'Fredoka', 'Nunito', cursive"
        : "'Plus Jakarta Sans', system-ui, sans-serif"

    const letterSpacing = style === 'classic' ? '4' : style === 'tech' ? '3' : '1.5'
    const glowDeviation = isNeon ? 12 : 6

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bg1}"/>
      <stop offset="50%" stop-color="${bg2}"/>
      <stop offset="100%" stop-color="${bg1}"/>
    </linearGradient>

    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="60%" stop-color="${c2}"/>
      <stop offset="100%" stop-color="${c4}"/>
    </linearGradient>

    <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${c3}"/>
      <stop offset="50%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>

    <linearGradient id="grad3" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${c4}"/>
      <stop offset="50%" stop-color="${c3}"/>
      <stop offset="100%" stop-color="${c5}"/>
    </linearGradient>

    <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>

    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${c3}"/>
      <stop offset="100%" stop-color="${c1}"/>
    </linearGradient>

    <radialGradient id="radialGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${c3}" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="${c1}" stop-opacity="0"/>
    </radialGradient>

    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="${glowDeviation}" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <filter id="ambientGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="40" result="blur"/>
    </filter>

    <filter id="drop" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="8" stdDeviation="14" flood-color="#000000" flood-opacity="0.65"/>
    </filter>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#bgGrad)"/>
  ${atmosphericBg}

  <g transform="translate(${cx}, ${cy})">
    ${markContent}
  </g>

  <g font-family="${fontFamily}" font-size="${wordmarkFontSize}" letter-spacing="${letterSpacing}">
    ${wordmarkSvg}
  </g>

  ${taglineBlock}
</svg>`

    return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
  } catch (error) {
    console.error('SVG logo generation error:', error)
    return generatePlaceholderLogo(companyName, seed, colors, width, height)
  }
}

function generatePlaceholderLogo(
  companyName: string,
  seed: number,
  colors: string = 'blue',
  width: number = 512,
  height: number = 512
): string {
  const theme = colorMap[colors] || colorMap.blue
  const monogram = extractMonogram(companyName)
  const initial = monogram.combined || 'L'
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${theme.bg1}"/>
  <circle cx="${width / 2}" cy="${height / 2 - 20}" r="${width * 0.22}" fill="${theme.c1}"/>
  <text x="${width / 2}" y="${height / 2 - 8}" text-anchor="middle" dominant-baseline="middle" fill="#fff" font-family="'Cinzel',serif" font-weight="900" font-size="${width * 0.16}">${initial}</text>
  <text x="${width / 2}" y="${height / 2 + width * 0.28}" text-anchor="middle" fill="#fff" font-family="'Cinzel',serif" font-weight="bold" font-size="20">${escapeXml(companyName)}</text>
</svg>`
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

export function validateLogoRequest(request: Partial<LogoGenerationRequest>): string | null {
  if (!request.companyName?.trim()) return 'Company name is required'
  if (!request.industry?.trim()) return 'Industry is required'
  if (!request.style) return 'Style is required'
  if (!request.colors) return 'Colors is required'
  return null
}

export function generateMultipleLogos(
  prompt: string,
  companyName: string,
  count: number = 4,
  request?: Partial<LogoImprovementRequest>
): Promise<string[]> {
  const colors = request?.colors || 'blue'
  const tagline = request?.tagline || ''
  const style = request?.style || 'modern'
  const feedback = request?.feedback || ''
  const industry = request?.industry || ''

  const logos = Array.from({ length: count }, (_, i) =>
    generateLogoImage(
      prompt,
      Date.now() + i * 1000,
      companyName,
      i,
      colors,
      tagline,
      512,
      512,
      style,
      feedback,
      industry
    )
  )
  return Promise.resolve(logos)
}
