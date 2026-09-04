'use client'

import React, { useState, useEffect } from 'react'
import {
  Wand2,
  Download,
  Sparkles,
  Palette,
  Layers,
  RefreshCw,
  Zap,
  Copy,
  Check,
  Eye,
  Sliders,
  ChevronRight,
  Laptop,
  CreditCard,
  Smartphone,
  Store,
  Compass,
  Hexagon,
  FileCheck,
  Printer,
  Award,
  GraduationCap,
  BookOpen,
  Trash2,
  Plus,
  ArrowUpRight
} from 'lucide-react'
import { industries, styleOptions, colorPalettes } from '@/lib/constants'

// Ready-made showcase presets for instant one-click inspiration
const PRESET_TEMPLATES = [
  {
    companyName: 'Apex Horizon',
    industry: 'Technology',
    tagline: 'Autonomous Cloud Intelligence',
    style: 'tech',
    colors: 'blue',
  },
  {
    companyName: 'Chromatic Press',
    industry: 'Design & Printing',
    tagline: 'CMYK Offset & Letterpress',
    style: 'creative',
    colors: 'gradient',
  },
  {
    companyName: 'Aurelia & Co.',
    industry: 'Fashion',
    tagline: 'Haute Horlogerie & Jewels',
    style: 'classic',
    colors: 'orange',
  },
  {
    companyName: 'Lumina Bio',
    industry: 'Healthcare',
    tagline: 'Precision Genomic Medicine',
    style: 'modern',
    colors: 'teal',
  },
  {
    companyName: 'Aether Capital',
    industry: 'Finance',
    tagline: 'Quantitative Asset Growth',
    style: 'professional',
    colors: 'monochrome',
  },
  {
    companyName: 'Velvet Roastery',
    industry: 'Food & Beverage',
    tagline: 'Artisan Small-Batch Roasts',
    style: 'playful',
    colors: 'orange',
  },
]

const AI_CHIPS = [
  '✨ Make typography bolder',
  '⚡ Add cyber holographic glow',
  '💎 Apply luxury gold metallic lines',
  '🍃 Make it organic & sleek',
  '📐 Emphasize geometric symmetry',
  '🔥 High-contrast neon theme',
]

export default function LogoGeneratorPage() {
  const [formData, setFormData] = useState({
    companyName: 'Apex Horizon',
    industry: 'Technology',
    tagline: 'Autonomous Cloud Intelligence',
    style: 'tech',
    colors: 'blue',
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState('')
  const [generatedLogos, setGeneratedLogos] = useState<string[]>([])
  const [selectedLogoIndex, setSelectedLogoIndex] = useState<number>(0)
  const [activeTab, setActiveTab] = useState<'grid' | 'focus' | 'mockup' | 'brandkit' | 'learn'>('grid')
  const [activeMockup, setActiveMockup] = useState<'saas' | 'card' | 'app' | 'store'>('saas')
  const [canvasBg, setCanvasBg] = useState<'dark' | 'white' | 'slate' | 'transparent'>('dark')
  const [feedback, setFeedback] = useState('')
  const [originalPrompt, setOriginalPrompt] = useState('')
  const [isImproving, setIsImproving] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [svgCopied, setSvgCopied] = useState(false)

  // Learning Engine State
  const [learnedModels, setLearnedModels] = useState<any[]>([])
  const [isTraining, setIsTraining] = useState(false)
  const [trainSuccess, setTrainSuccess] = useState('')
  const [trainForm, setTrainForm] = useState({
    brandName: '',
    industry: 'Drinkware & Headwear',
    designMetaphor: '',
    conceptTags: '',
    svgText: '',
  })

  const fetchLearnedModels = async () => {
    try {
      const res = await fetch('/api/logo-generator/learn')
      const data = await res.json()
      if (data.success && data.logos) {
        setLearnedModels(data.logos)
      }
    } catch (err) {
      console.error('Failed to fetch learned models:', err)
    }
  }

  // Initial load generation & learned models fetch
  useEffect(() => {
    handleGenerate(true)
    fetchLearnedModels()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectedLogo = generatedLogos[selectedLogoIndex] || generatedLogos[0] || null

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const applyPreset = (preset: typeof PRESET_TEMPLATES[0]) => {
    setFormData({ ...preset })
    setTimeout(() => {
      handleGenerateWithData({ ...preset })
    }, 50)
  }

  const handleGenerateWithData = async (data: typeof formData) => {
    if (!data.companyName?.trim()) return
    setIsGenerating(true)
    setGenerationStep('Correlating brand name & vector geometry...')

    try {
      const response = await fetch('/api/logo-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const res = await response.json()
      if (res.success && res.logos?.length > 0) {
        setGeneratedLogos(res.logos)
        setSelectedLogoIndex(0)
        setOriginalPrompt(res.prompt || '')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsGenerating(false)
      setGenerationStep('')
    }
  }

  const handleGenerate = async (isInitial: boolean = false) => {
    if (!formData.companyName?.trim()) {
      alert('Please enter a company name')
      return
    }

    setIsGenerating(true)
    setGenerationStep('Analyzing name semantics & monogram...')

    try {
      const response = await fetch('/api/logo-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success && data.logos?.length > 0) {
        setGeneratedLogos(data.logos)
        setSelectedLogoIndex(0)
        setOriginalPrompt(data.prompt || '')
      } else {
        if (!isInitial) {
          alert('Failed to generate logos. Please try again.')
        }
      }
    } catch (error) {
      console.error('Error generating logos:', error)
      if (!isInitial) {
        alert('An error occurred while generating logos.')
      }
    } finally {
      setIsGenerating(false)
      setGenerationStep('')
    }
  }

  const handleImproveWithChip = (chipText: string) => {
    setFeedback(chipText)
    triggerImprovement(chipText)
  }

  const triggerImprovement = async (customFeedback?: string) => {
    const textToUse = customFeedback || feedback
    if (!textToUse.trim()) {
      alert('Please enter or select improvement feedback')
      return
    }

    setIsImproving(true)
    try {
      const response = await fetch('/api/logo-generator/improve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          feedback: textToUse,
          originalPrompt,
        }),
      })

      const data = await response.json()

      if (data.success && data.logos?.length > 0) {
        setGeneratedLogos(data.logos)
        setSelectedLogoIndex(0)
        setOriginalPrompt(data.prompt || '')
        setFeedback('')
      } else {
        alert('Failed to improve logos. Please try again.')
      }
    } catch (error) {
      console.error('Error improving logos:', error)
      alert('An error occurred while improving logos.')
    } finally {
      setIsImproving(false)
    }
  }

  const handleDownload = async (dataUrl: string, format: 'svg' | 'png', size: number = 1024) => {
    try {
      if (format === 'svg') {
        const link = document.createElement('a')
        link.href = dataUrl
        link.download = `${formData.companyName.toLowerCase().replace(/\s+/g, '-')}-logo.svg`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        return
      }

      // Convert to high-res PNG
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0, size, size)
          const pngUrl = canvas.toDataURL('image/png')
          const link = document.createElement('a')
          link.href = pngUrl
          link.download = `${formData.companyName.toLowerCase().replace(/\s+/g, '-')}-logo-${size}px.png`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      }
      img.src = dataUrl
    } catch (error) {
      console.error('Download error:', error)
      alert('Failed to download logo.')
    }
  }

  const copySvgXml = async (dataUrl: string) => {
    try {
      const base64Data = dataUrl.split(',')[1]
      const svgText = atob(base64Data)
      await navigator.clipboard.writeText(svgText)
      setSvgCopied(true)
      setTimeout(() => setSvgCopied(false), 2000)
    } catch (error) {
      console.error('Copy error:', error)
    }
  }

  const copyDataUrl = async (dataUrl: string, index: number) => {
    try {
      await navigator.clipboard.writeText(dataUrl)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  const getCanvasBackgroundClass = () => {
    switch (canvasBg) {
      case 'white':
        return 'bg-white shadow-inner'
      case 'slate':
        return 'bg-slate-900 border border-slate-700'
      case 'transparent':
        return 'checkerboard-bg border border-slate-700'
      case 'dark':
      default:
        return 'bg-[#0a0e1c] border border-slate-800'
    }
  }

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 relative overflow-x-hidden">
      {/* Subtle Ambient Glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="fixed bottom-10 right-1/4 w-[30rem] h-[30rem] bg-purple-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Clean Modern Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#070913]/85 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-300 animate-pulse" />
              <div className="relative w-11 h-11 bg-slate-950 rounded-xl flex items-center justify-center border border-white/20">
                <Wand2 className="w-6 h-6 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-black tracking-tight text-white">LogoForge</span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full">PRO AI</span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Professional Vector Brand Identity Studio</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-semibold">Vector Engine v3.2 Online</span>
            </div>
            <button
              onClick={() => handleGenerate()}
              disabled={isGenerating}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Generating...' : 'New Brand Kit'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero & Quick Presets Section */}
      <section className="relative pt-10 pb-4 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            <span>Semantic Name Correlation &bull; Scalable Vectors &bull; 100% Free</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Design Iconic Logos{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              In Seconds
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Enter your company details to generate correlated vector symbols, custom monograms,
            color harmonics, and real-world mockups.
          </p>

          {/* Quick Preset Badges */}
          <div className="pt-2 flex items-center justify-center flex-wrap gap-2">
            <span className="text-xs text-slate-400 font-medium mr-1 flex items-center">
              <Compass className="w-3.5 h-3.5 mr-1 text-slate-500" /> Quick Presets:
            </span>
            {PRESET_TEMPLATES.map((preset) => (
              <button
                key={preset.companyName}
                onClick={() => applyPreset(preset)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all duration-150 ${
                  formData.companyName === preset.companyName
                    ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200 shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {preset.companyName} ({preset.industry})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Studio Grid: Left Form Controls + Right Live Showcase */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Controls (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6 border border-white/10">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <Sliders className="w-5 h-5 text-indigo-400" />
                  <h2 className="text-lg font-bold text-white">Customize Your Logo</h2>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                  Step-by-Step
                </span>
              </div>

              {/* 1. Company Name & Tagline */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="companyName" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Company / Brand Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g. Apex Horizon, Chromatic Press"
                    className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="industry" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Industry Sector <span className="text-rose-400">*</span>
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full px-3.5 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-medium"
                    >
                      {industries.map((ind) => (
                        <option key={ind} value={ind} className="bg-slate-900 text-white">
                          {ind}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="tagline" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Tagline / Slogan (Optional)
                    </label>
                    <input
                      type="text"
                      id="tagline"
                      name="tagline"
                      value={formData.tagline}
                      onChange={handleChange}
                      placeholder="e.g. Innovate Everyday"
                      className="w-full px-3.5 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Visual Style Archetype */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center justify-between">
                  <span className="flex items-center space-x-1.5">
                    <Layers className="w-4 h-4 text-purple-400" />
                    <span>Logo Style Archetype</span>
                  </span>
                  <span className="text-[11px] text-indigo-400 capitalize">{formData.style}</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {styleOptions.map((style) => {
                    const isSelected = formData.style === style.id
                    return (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, style: style.id })}
                        className={`p-3 rounded-xl border text-left transition-all duration-200 relative overflow-hidden group ${
                          isSelected
                            ? 'bg-indigo-600/25 border-indigo-500 shadow-md shadow-indigo-500/10'
                            : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/50'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                        )}
                        <div className="font-bold text-xs text-white mb-0.5">{style.name}</div>
                        <div className="text-[10px] text-slate-400 line-clamp-1">{style.description}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 3. Color Palette */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center justify-between">
                  <span className="flex items-center space-x-1.5">
                    <Palette className="w-4 h-4 text-pink-400" />
                    <span>Color Palette</span>
                  </span>
                  <span className="text-[11px] text-pink-400 capitalize">{formData.colors}</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {colorPalettes.map((pal) => {
                    const isSelected = formData.colors === pal.id
                    return (
                      <button
                        key={pal.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, colors: pal.id })}
                        className={`p-2.5 rounded-xl border transition-all duration-150 text-left flex flex-col justify-between space-y-2 ${
                          isSelected
                            ? 'bg-pink-500/15 border-pink-500 shadow-md'
                            : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-[11px] font-bold text-slate-200 truncate">{pal.name}</div>
                        <div className="flex space-x-1">
                          {pal.colors.map((c, i) => (
                            <span
                              key={i}
                              className="w-3.5 h-3.5 rounded-full border border-black/30 shadow-sm"
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Generate Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleGenerate()}
                  disabled={isGenerating}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold text-base shadow-xl shadow-indigo-500/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>{generationStep || 'Rendering Brand Vectors...'}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Generate 4 Vector Logos</span>
                      <ChevronRight className="w-5 h-5 ml-1" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* AI Refinement Box */}
            <div className="glass-panel rounded-3xl p-6 shadow-xl border border-white/10 space-y-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white">AI Refinement Studio</h3>
              </div>
              <p className="text-xs text-slate-400">
                Enhance, recolor, or add 3D effects to your logos with one click:
              </p>

              <div className="flex flex-wrap gap-1.5">
                {AI_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleImproveWithChip(chip)}
                    disabled={isImproving || generatedLogos.length === 0}
                    className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-900 border border-slate-700/80 text-slate-300 hover:border-indigo-400 hover:text-white transition-all disabled:opacity-40"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              <div className="flex space-x-2 pt-1">
                <input
                  type="text"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="e.g. Add 3D metallic gradient bevel, make it cyber minimal..."
                  className="flex-1 px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={() => triggerImprovement()}
                  disabled={isImproving || !feedback.trim() || generatedLogos.length === 0}
                  className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition-all disabled:opacity-50 flex items-center space-x-1.5"
                >
                  {isImproving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                  <span>Apply</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase & Brand Kit (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Toolbar: View Switcher & Canvas Background */}
            <div className="glass-panel rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 border border-white/10">
              
              {/* Tabs */}
              <div className="flex items-center space-x-1 p-1 bg-slate-950/70 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveTab('grid')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    activeTab === 'grid'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>4-Variations</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('focus')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    activeTab === 'focus'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Focus Artboard</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('mockup')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    activeTab === 'mockup'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span>Live Mockups</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('brandkit')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    activeTab === 'brandkit'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Social Kit</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('learn')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    activeTab === 'learn'
                      ? 'bg-amber-600 text-white shadow'
                      : 'text-amber-400/80 hover:text-amber-300'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Learning Engine</span>
                </button>
              </div>

              {/* Background Theme Switcher */}
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-semibold text-slate-400">Canvas BG:</span>
                <div className="flex items-center space-x-1 bg-slate-950/70 p-1 rounded-lg border border-slate-800">
                  <button
                    type="button"
                    title="Obsidian Dark"
                    onClick={() => setCanvasBg('dark')}
                    className={`w-6 h-6 rounded-md bg-[#0a0e1c] border ${canvasBg === 'dark' ? 'border-indigo-400 scale-110' : 'border-slate-700'}`}
                  />
                  <button
                    type="button"
                    title="Studio White"
                    onClick={() => setCanvasBg('white')}
                    className={`w-6 h-6 rounded-md bg-white border ${canvasBg === 'white' ? 'border-indigo-400 scale-110' : 'border-slate-300'}`}
                  />
                  <button
                    type="button"
                    title="Deep Slate"
                    onClick={() => setCanvasBg('slate')}
                    className={`w-6 h-6 rounded-md bg-slate-900 border ${canvasBg === 'slate' ? 'border-indigo-400 scale-110' : 'border-slate-700'}`}
                  />
                  <button
                    type="button"
                    title="Transparent Grid"
                    onClick={() => setCanvasBg('transparent')}
                    className={`w-6 h-6 rounded-md checkerboard-bg border ${canvasBg === 'transparent' ? 'border-indigo-400 scale-110' : 'border-slate-700'}`}
                  />
                </div>
              </div>
            </div>

            {/* TAB 1: 4-Grid Variations */}
            {activeTab === 'grid' && (
              <div className="space-y-4">
                {isGenerating && generatedLogos.length === 0 ? (
                  /* Loading Skeletons */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="rounded-3xl p-5 bg-slate-950/60 border border-white/10 animate-pulse space-y-4">
                        <div className="h-4 bg-slate-800 rounded w-24" />
                        <div className="aspect-square bg-slate-900/80 rounded-2xl flex items-center justify-center">
                          <RefreshCw className="w-8 h-8 text-indigo-500/40 animate-spin" />
                        </div>
                        <div className="h-8 bg-slate-800 rounded" />
                      </div>
                    ))}
                  </div>
                ) : generatedLogos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {generatedLogos.map((logoUrl, idx) => {
                      const isSelected = selectedLogoIndex === idx
                      return (
                        <div
                          key={idx}
                          onClick={() => setSelectedLogoIndex(idx)}
                          className={`group relative rounded-3xl p-4 transition-all duration-300 cursor-pointer overflow-hidden border ${
                            isSelected
                              ? 'border-indigo-500 bg-slate-900/90 ring-2 ring-indigo-500/50 shadow-2xl scale-[1.01]'
                              : 'border-white/10 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/60'
                          }`}
                        >
                          {/* Variant Badge */}
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono">
                              Variation 0{idx + 1}
                            </span>
                            {isSelected && (
                              <span className="flex items-center space-x-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                                <Check className="w-3.5 h-3.5" />
                                <span>Active</span>
                              </span>
                            )}
                          </div>

                          {/* Visual SVG Render Frame */}
                          <div className={`aspect-square w-full rounded-2xl flex items-center justify-center p-4 transition-colors duration-200 ${getCanvasBackgroundClass()}`}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={logoUrl}
                              alt={`${formData.companyName} Logo Variation ${idx + 1}`}
                              className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>

                          {/* Card Action Bar */}
                          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                            <div className="flex space-x-1.5">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDownload(logoUrl, 'svg')
                                }}
                                className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white transition-colors flex items-center space-x-1"
                              >
                                <Download className="w-3 h-3" />
                                <span>SVG</span>
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDownload(logoUrl, 'png', 2048)
                                }}
                                className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-800 hover:bg-purple-600 text-slate-200 hover:text-white transition-colors flex items-center space-x-1"
                              >
                                <Download className="w-3 h-3" />
                                <span>2K PNG</span>
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                copyDataUrl(logoUrl, idx)
                              }}
                              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                              title="Copy image link"
                            >
                              {copiedIndex === idx ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  /* Initial Empty State */
                  <div className="glass-panel rounded-3xl p-12 text-center space-y-4 border border-white/10">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Ready to Design Your Brand</h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      Click the &quot;Generate 4 Vector Logos&quot; button on the left or select a quick preset above to generate instant vector logos.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleGenerate()}
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
                    >
                      Generate Now
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Focus Canvas */}
            {activeTab === 'focus' && selectedLogo && (
              <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">Focus Artboard Inspection</h3>
                    <p className="text-xs text-slate-400">
                      Pixel-perfect vector fidelity for variation 0{selectedLogoIndex + 1}
                    </p>
                  </div>
                  <div className="flex space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                    {generatedLogos.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedLogoIndex(i)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                          selectedLogoIndex === i
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        0{i + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={`w-full max-w-md mx-auto aspect-square rounded-2xl flex items-center justify-center p-8 transition-colors ${getCanvasBackgroundClass()}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedLogo}
                    alt={`${formData.companyName} Focus Logo`}
                    className="w-full h-full object-contain filter drop-shadow-2xl"
                  />
                </div>

                {/* Focus Canvas Export Center */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => handleDownload(selectedLogo, 'svg')}
                    className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs flex flex-col items-center justify-center space-y-1 transition-all"
                  >
                    <Download className="w-4 h-4 text-indigo-400" />
                    <span>Vector SVG (Infinite Res)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownload(selectedLogo, 'png', 2048)}
                    className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500 hover:bg-purple-600 text-white font-bold text-xs flex flex-col items-center justify-center space-y-1 transition-all"
                  >
                    <Download className="w-4 h-4 text-purple-400" />
                    <span>2K HD PNG (Raster)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => copySvgXml(selectedLogo)}
                    className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-500 hover:bg-pink-600 text-white font-bold text-xs flex flex-col items-center justify-center space-y-1 transition-all"
                  >
                    {svgCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-pink-400" />}
                    <span>{svgCopied ? 'SVG Code Copied!' : 'Copy Raw SVG Code'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: Live Realistic Mockups */}
            {activeTab === 'mockup' && selectedLogo && (
              <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">Live Real-World Mockups</h3>
                    <p className="text-xs text-slate-400">
                      See your logo in real product & brand environments
                    </p>
                  </div>
                  <div className="flex space-x-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setActiveMockup('saas')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center space-x-1 ${
                        activeMockup === 'saas' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Laptop className="w-3.5 h-3.5" />
                      <span>SaaS App</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveMockup('card')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center space-x-1 ${
                        activeMockup === 'card' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveMockup('app')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center space-x-1 ${
                        activeMockup === 'app' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Mobile</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveMockup('store')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center space-x-1 ${
                        activeMockup === 'store' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Store className="w-3.5 h-3.5" />
                      <span>Store</span>
                    </button>
                  </div>
                </div>

                {/* Mockup 1: Dark SaaS App Header */}
                {activeMockup === 'saas' && (
                  <div className="rounded-2xl border border-slate-700/80 bg-slate-950 p-4 shadow-2xl overflow-hidden">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500" />
                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        <span className="text-[11px] text-slate-500 ml-2 font-mono">https://app.{formData.companyName.toLowerCase().replace(/\s+/g, '')}.io/dashboard</span>
                      </div>
                    </div>

                    <div className="py-4 px-6 flex items-center justify-between bg-slate-900/60 rounded-xl mt-3 border border-slate-800">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center bg-black/40 p-0.5 border border-white/10">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={selectedLogo} alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-extrabold text-white text-base tracking-tight">{formData.companyName}</span>
                      </div>

                      <div className="flex items-center space-x-4 text-xs text-slate-400">
                        <span className="hover:text-white cursor-pointer font-medium">Dashboard</span>
                        <span className="hover:text-white cursor-pointer font-medium">Analytics</span>
                        <span className="hover:text-white cursor-pointer font-medium">Settings</span>
                        <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                          {formData.companyName.charAt(0)}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-6 bg-slate-900/30 rounded-xl border border-dashed border-slate-800 text-center space-y-2">
                      <div className="w-16 h-16 mx-auto rounded-2xl overflow-hidden p-1 bg-black/50 border border-white/10 shadow-lg">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={selectedLogo} alt="Logo Center" className="w-full h-full object-contain" />
                      </div>
                      <h4 className="text-sm font-bold text-white">Welcome to {formData.companyName} Cloud</h4>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">{formData.tagline || 'Experience the future of intelligent brand management.'}</p>
                    </div>
                  </div>
                )}

                {/* Mockup 2: Matte Luxe Business Card */}
                {activeMockup === 'card' && (
                  <div className="flex items-center justify-center py-6">
                    <div className="w-full max-w-md aspect-[1.75/1] rounded-3xl bg-gradient-to-br from-slate-900 via-black to-slate-950 p-6 sm:p-8 border border-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col justify-between">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-bl-full pointer-events-none" />
                      
                      <div className="flex items-start justify-between">
                        <div className="w-16 h-16 rounded-2xl bg-black/60 p-1 border border-white/20 shadow-lg">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={selectedLogo} alt="Card Logo" className="w-full h-full object-contain" />
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-400 font-bold">EXECUTIVE PASS</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-lg font-black text-white tracking-wide">{formData.companyName}</h4>
                        <p className="text-xs text-slate-400 font-medium">{formData.tagline || 'Chief Executive Officer'}</p>
                        <p className="text-[10px] text-slate-500 font-mono pt-2">contact@{formData.companyName.toLowerCase().replace(/\s+/g, '')}.com &bull; +1 (800) 555-0199</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mockup 3: Mobile App Squircle Icon */}
                {activeMockup === 'app' && (
                  <div className="flex flex-col items-center justify-center py-6 space-y-4">
                    <div className="relative group">
                      <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2.5rem] blur-xl opacity-60 group-hover:opacity-90 transition duration-300" />
                      <div className="relative w-36 h-36 rounded-[2.2rem] bg-gradient-to-br from-slate-900 to-black p-3 border border-white/20 shadow-2xl flex items-center justify-center overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={selectedLogo} alt="App Icon" className="w-full h-full object-contain filter drop-shadow-lg" />
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-sm text-white">{formData.companyName}</div>
                      <div className="text-xs text-slate-400">iOS & Android App Store Ready</div>
                    </div>
                  </div>
                )}

                {/* Mockup 4: Storefront & Neon Glass Sign */}
                {activeMockup === 'store' && (
                  <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-8 text-center shadow-2xl relative overflow-hidden">
                    <div className="w-28 h-28 mx-auto rounded-3xl p-2.5 bg-black/70 border border-white/20 shadow-[0_0_50px_rgba(99,102,241,0.3)] mb-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={selectedLogo} alt="Store Sign" className="w-full h-full object-contain" />
                    </div>
                    <h3 className="text-xl font-black text-white tracking-tight">{formData.companyName}</h3>
                    <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">{formData.tagline || 'Headquarters Studio Entrance'}</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: SOCIAL MEDIA BRAND KIT */}
            {activeTab === 'brandkit' && selectedLogo && (
              <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Social Media Brand Asset Kit</h3>
                  <p className="text-xs text-slate-400">Pre-formatted export dimensions for all platforms.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-center">
                    <span className="text-[11px] font-bold text-slate-400 font-mono">Profile Avatar (512px)</span>
                    <div className="w-20 h-20 mx-auto rounded-full overflow-hidden p-1.5 bg-slate-900 border border-white/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={selectedLogo} alt="Square" className="w-full h-full object-contain" />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDownload(selectedLogo, 'png', 512)}
                      className="w-full py-2 bg-slate-800 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold transition-all"
                    >
                      Download Avatar
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-center">
                    <span className="text-[11px] font-bold text-slate-400 font-mono">Web Favicon (64px)</span>
                    <div className="w-16 h-16 mx-auto rounded-xl overflow-hidden p-1.5 bg-slate-900 border border-white/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={selectedLogo} alt="Favicon" className="w-full h-full object-contain" />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDownload(selectedLogo, 'png', 64)}
                      className="w-full py-2 bg-slate-800 hover:bg-purple-600 text-white rounded-lg text-xs font-bold transition-all"
                    >
                      Download Favicon
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-center">
                    <span className="text-[11px] font-bold text-slate-400 font-mono">4K Ultra Print Ready</span>
                    <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden p-2 bg-slate-900 border border-white/10 flex items-center justify-center">
                      <FileCheck className="w-8 h-8 text-emerald-400" />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDownload(selectedLogo, 'png', 4096)}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all"
                    >
                      Download 4K HD
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: AI LOGO LEARNING ENGINE */}
            {activeTab === 'learn' && (
              <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div>
                    <div className="flex items-center space-x-2.5">
                      <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/30">
                        <GraduationCap className="w-5 h-5 text-amber-400" />
                      </div>
                      <h3 className="text-xl font-black text-white tracking-tight">AI Logo Learning Engine</h3>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Feed exemplary logos, SVGs, or design specifications to continually evolve vector synthesis rules for targeted industries.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold font-mono self-start sm:self-auto">
                    {learnedModels.length} Models Active
                  </span>
                </div>

                {trainSuccess && (
                  <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
                    <span>✨ {trainSuccess}</span>
                    <button onClick={() => setTrainSuccess('')} className="text-emerald-400 hover:text-white font-bold ml-2">✕</button>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Train / Submit New Logo */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center space-x-2">
                      <Plus className="w-4 h-4 text-amber-400" />
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">Feed New Logo</h4>
                    </div>
                    <p className="text-xs text-slate-400">
                      Paste SVG markup or describe the core metaphor and industry. The engine deconstructs colors, geometry, and typography into reusable vector rules.
                    </p>

                    <form
                      onSubmit={async (e) => {
                        e.preventDefault()
                        if (!trainForm.brandName.trim() || !trainForm.industry.trim()) return
                        setIsTraining(true)
                        setTrainSuccess('')
                        try {
                          const tags = trainForm.conceptTags.split(',').map((t) => t.trim()).filter(Boolean)
                          const res = await fetch('/api/logo-generator/learn', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              brandName: trainForm.brandName,
                              industry: trainForm.industry,
                              designMetaphor: trainForm.designMetaphor,
                              conceptTags: tags,
                              svgText: trainForm.svgText,
                            }),
                          })
                          const data = await res.json()
                          if (data.success) {
                            setTrainSuccess(`Successfully learned '${trainForm.brandName}' for industry '${trainForm.industry}'!`)
                            setTrainForm({
                              brandName: '',
                              industry: 'Drinkware & Headwear',
                              designMetaphor: '',
                              conceptTags: '',
                              svgText: '',
                            })
                            fetchLearnedModels()
                          }
                        } catch (err) {
                          console.error(err)
                        } finally {
                          setIsTraining(false)
                        }
                      }}
                      className="space-y-3.5 bg-slate-950/60 p-4 rounded-2xl border border-white/5"
                    >
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">Target Industry *</label>
                        <select
                          value={trainForm.industry}
                          onChange={(e) => setTrainForm({ ...trainForm, industry: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                        >
                          {industries.map((ind) => (
                            <option key={ind} value={ind}>{ind}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">Exemplary Brand / Logo Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Cups & Caps Studio"
                          value={trainForm.brandName}
                          onChange={(e) => setTrainForm({ ...trainForm, brandName: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">Design Metaphor / Core Concept</label>
                        <input
                          type="text"
                          placeholder="e.g. Dual Metaphor: Ceramic Cup fused with Cap Visor"
                          value={trainForm.designMetaphor}
                          onChange={(e) => setTrainForm({ ...trainForm, designMetaphor: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">Concept Keywords (comma-separated)</label>
                        <input
                          type="text"
                          placeholder="cup, cap, visor, mug, embroidery, merch"
                          value={trainForm.conceptTags}
                          onChange={(e) => setTrainForm({ ...trainForm, conceptTags: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">Raw SVG Markup (Optional)</label>
                        <textarea
                          rows={4}
                          placeholder="Paste <svg ...> XML code from Figma, Illustrator, or website..."
                          value={trainForm.svgText}
                          onChange={(e) => setTrainForm({ ...trainForm, svgText: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isTraining || !trainForm.brandName.trim()}
                        className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-amber-900/30 flex items-center justify-center space-x-2"
                      >
                        {isTraining ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Analyzing & Learning Rules...</span>
                          </>
                        ) : (
                          <>
                            <GraduationCap className="w-4 h-4" />
                            <span>Train Engine on This Logo</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>

                  {/* Right Column: Learned Models Registry */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-amber-400" />
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">Active Learned Models Registry</h4>
                    </div>

                    <div className="space-y-3.5 max-h-[560px] overflow-y-auto pr-1">
                      {learnedModels.length === 0 ? (
                        <div className="p-8 text-center text-slate-500 bg-slate-950/40 rounded-2xl border border-slate-800">
                          <p className="text-xs">No learned models registered yet. Submit your first logo on the left!</p>
                        </div>
                      ) : (
                        learnedModels.map((model) => (
                          <div
                            key={model.id}
                            className="p-4 rounded-2xl bg-slate-950/70 border border-white/10 hover:border-amber-500/40 transition-all space-y-3"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h5 className="text-sm font-black text-white">{model.name}</h5>
                                  <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold">
                                    {model.industry}
                                  </span>
                                </div>
                                <p className="text-xs text-amber-200/80 mt-1 font-medium">
                                  {model.designMetaphor}
                                </p>
                              </div>
                              {model.id !== 'cups-caps-dual-metaphor' && (
                                <button
                                  type="button"
                                  onClick={async () => {
                                    try {
                                      const res = await fetch(`/api/logo-generator/learn?id=${model.id}`, { method: 'DELETE' })
                                      const d = await res.json()
                                      if (d.success) fetchLearnedModels()
                                    } catch (err) {
                                      console.error(err)
                                    }
                                  }}
                                  className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                  title="Remove Model"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>

                            <p className="text-[11px] text-slate-400 line-clamp-2">
                              {model.description}
                            </p>

                            {/* Extracted Color Palette Swatches */}
                            <div className="flex items-center justify-between pt-2 border-t border-white/5">
                              <div className="flex items-center space-x-1.5">
                                <span className="text-[10px] text-slate-400 uppercase font-mono mr-1">Palette:</span>
                                {[model.palette?.c1, model.palette?.c2, model.palette?.c3, model.palette?.c4, model.palette?.c5].filter(Boolean).map((hex, i) => (
                                  <span
                                    key={i}
                                    className="w-4 h-4 rounded-md border border-white/20 inline-block shadow-sm"
                                    style={{ backgroundColor: hex }}
                                    title={hex}
                                  />
                                ))}
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  setFormData({
                                    companyName: model.name.replace(' Learned Archetype', '').replace(' Dual-Metaphor Fusion', ''),
                                    industry: model.industry,
                                    tagline: model.conceptTags?.[0] ? `${model.conceptTags[0].toUpperCase()} STUDIO` : 'PREMIUM BRAND',
                                    style: 'modern',
                                    colors: model.palette?.id === 'terracotta_slate' ? 'terracotta' : 'terracotta',
                                  })
                                  setActiveTab('grid')
                                  setTimeout(() => {
                                    handleGenerateWithData({
                                      companyName: model.name.replace(' Learned Archetype', '').replace(' Dual-Metaphor Fusion', ''),
                                      industry: model.industry,
                                      tagline: model.conceptTags?.[0] ? `${model.conceptTags[0].toUpperCase()} STUDIO` : 'PREMIUM BRAND',
                                      style: 'modern',
                                      colors: model.palette?.id === 'terracotta_slate' ? 'terracotta' : 'terracotta',
                                    })
                                  }, 50)
                                }}
                                className="px-2.5 py-1 rounded-lg bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white border border-amber-500/30 text-[11px] font-bold transition-all flex items-center space-x-1"
                              >
                                <span>Apply to Generator</span>
                                <ArrowUpRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Export Commercial Banner */}
            {selectedLogo && (
              <div className="glass-panel rounded-2xl p-4 flex items-center justify-between border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                    <Award className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Full Commercial Rights Included</h4>
                    <p className="text-[11px] text-slate-400">Export vector SVGs ready for print, web, and physical merchandise.</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleDownload(selectedLogo, 'svg')}
                    className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg flex items-center space-x-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download SVG</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Feature Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-white/10 mt-12">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Built for Modern Founders & Design Creators
          </h2>
          <p className="text-sm text-slate-400">
            Everything you need to launch your brand identity without expensive design agencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel-interactive rounded-2xl p-6 border border-white/10 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
              <Hexagon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Semantic Brand Correlation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Synthesizes icons and dual-letter monograms that directly correlate with your company name, industry, and keyword meaning.
            </p>
          </div>

          <div className="glass-panel-interactive rounded-2xl p-6 border border-white/10 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 border border-purple-500/30">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Color Theory Harmonics</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Intelligent multi-stop gradient synthesis and color matching algorithms ensure your brand colors convey trust, innovation, or elegance.
            </p>
          </div>

          <div className="glass-panel-interactive rounded-2xl p-6 border border-white/10 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400 border border-pink-500/30">
              <Printer className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Print & Web Ready (CMYK & SVG)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Export pixel-perfect vector SVGs, 4K HD print rasters, and live mockups ready for business cards, billboards, and mobile apps.
            </p>
          </div>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="border-t border-white/10 bg-slate-950/80 backdrop-blur-lg py-10 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Wand2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-white text-sm">LogoForge AI Studio</span>
              <p className="text-[11px] text-slate-500">&copy; {new Date().getFullYear()} PSK Infotech. All rights reserved.</p>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-xs text-slate-400">
            <span className="flex items-center space-x-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Free Vector Studio Online</span>
            </span>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
