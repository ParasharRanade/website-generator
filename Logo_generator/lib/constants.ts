// Logo generation constants and configurations

export const stylePrompts: Record<string, string> = {
  modern: 'clean, minimalist design with bold typography and geometric shapes, professional and contemporary',
  classic: 'timeless, elegant design with traditional serif fonts and balanced proportions, sophisticated and refined',
  playful: 'fun, energetic design with bright colors, rounded shapes, and whimsical elements, friendly and approachable',
  professional: 'corporate, trustworthy design with muted tones, strong typography, and structured layout, reliable and established',
  creative: 'artistic, unique design with abstract shapes, artistic elements, and creative typography, innovative and distinctive',
  tech: 'futuristic, digital design with geometric patterns, circuit-like elements, and modern sans-serif fonts, cutting-edge and innovative',
}

export const colorPrompts: Record<string, string> = {
  blue: 'ocean blue color palette with shades from navy to sky blue',
  green: 'forest green color palette with natural, earthy tones',
  purple: 'royal purple color palette with luxurious violet and lavender shades',
  orange: 'sunset orange color palette with warm coral and amber tones',
  pink: 'vibrant pink color palette with hot pink and magenta shades',
  teal: 'teal turquoise color palette with refreshing cyan and aquamarine tones',
  monochrome: 'monochrome black and white color palette with grayscale tones',
  gradient: 'multi-color gradient palette with vibrant rainbow colors',
  terracotta: 'artisanal terracotta and deep forest charcoal slate with warm cream porcelain accents',
}

export const industryElements: Record<string, string> = {
  technology: 'circuit patterns, digital elements, tech symbols, binary code, pixels',
  finance: 'shield symbols, currency symbols, growth charts, secure lock icons, geometric shapes',
  healthcare: 'medical cross symbols, heart shapes, DNA helix, health-related icons, organic curves',
  education: 'book symbols, graduation caps, lightbulbs, knowledge icons, academic elements',
  'e-commerce': 'shopping cart, bag icons, price tags, shopping symbols, retail elements',
  'food & beverage': 'fork and spoon, chef hat, food icons, organic shapes, appetizing colors',
  entertainment: 'play button, star symbols, entertainment icons, dynamic shapes, vibrant elements',
  'real estate': 'house symbols, building icons, location markers, architectural elements, property symbols',
  consulting: 'handshake symbols, professional icons, growth arrows, business elements, corporate shapes',
  manufacturing: 'gear symbols, factory elements, industrial icons, mechanical shapes, production symbols',
  fashion: 'clothing hanger, fashion icons, elegant curves, style symbols, trendy elements',
  'design & printing': 'CMYK color registration targets, halftones, precision print crop marks, ink rollers, press cylinders, offset lithography glyphs, chromatic color wheels, vector pen bezier curves',
  'drinkware & headwear': 'ceramic coffee cup, cap visor brim, steam swirl, 3D puff embroidery, dad hat silhouette, travel tumbler, heritage seal, dual visual metaphor',
  'travel & tourism': 'airplane icons, globe symbols, location markers, travel elements, adventure symbols',
  other: 'abstract shapes, geometric patterns, universal symbols, clean lines, versatile elements',
}

export const placeholderColors = ['1E40AF', '3B82F6', '60A5FA', '93C5FD', '7C3AED', '0D9488', 'EA580C', '10B981']

// Frontend UI constants
export const industries = [
  'Drinkware & Headwear',
  'Design & Printing',
  'Technology',
  'Finance',
  'Healthcare',
  'Education',
  'E-commerce',
  'Food & Beverage',
  'Entertainment',
  'Real Estate',
  'Consulting',
  'Manufacturing',
  'Fashion',
  'Travel & Tourism',
  'Other',
]

export const styleOptions = [
  { id: 'modern', name: 'Modern', description: 'Clean, minimalist design with bold typography' },
  { id: 'classic', name: 'Classic', description: 'Timeless, elegant design with traditional elements' },
  { id: 'playful', name: 'Playful', description: 'Fun, energetic design with bright colors' },
  { id: 'professional', name: 'Professional', description: 'Corporate, trustworthy design with muted tones' },
  { id: 'creative', name: 'Creative', description: 'Artistic, unique design with abstract elements' },
  { id: 'tech', name: 'Tech', description: 'Futuristic, digital design with geometric shapes' },
]

export const colorPalettes = [
  { id: 'terracotta', name: 'Terracotta & Slate', colors: ['#E3702D', '#C8571B', '#2B4348', '#1E3135'] },
  { id: 'blue', name: 'Ocean Blue', colors: ['#1E40AF', '#3B82F6', '#60A5FA', '#93C5FD'] },
  { id: 'green', name: 'Forest Green', colors: ['#14532D', '#166534', '#22C55E', '#86EFAC'] },
  { id: 'purple', name: 'Royal Purple', colors: ['#581C87', '#7C3AED', '#A78BFA', '#C4B5FD'] },
  { id: 'orange', name: 'Sunset Orange', colors: ['#7C2D12', '#EA580C', '#F97316', '#FDBA74'] },
  { id: 'pink', name: 'Vibrant Pink', colors: ['#831843', '#DB2777', '#EC4899', '#F472B6'] },
  { id: 'teal', name: 'Teal Turquoise', colors: ['#115E59', '#0D9488', '#14B8A6', '#5EEAD4'] },
  { id: 'monochrome', name: 'Monochrome', colors: ['#000000', '#374151', '#6B7280', '#9CA3AF'] },
  { id: 'gradient', name: 'Multi-Color', colors: ['#EF4444', '#F59E0B', '#10B981', '#3B82F6'] },
]
