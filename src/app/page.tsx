'use client'

import { useState, useEffect, useRef } from 'react'
import { Wand2, Download, Sparkles, Globe, Check, Zap, Layout, Palette, Rocket, Cpu, Code2, Layers, Star, ExternalLink, Trash2, Heart } from 'lucide-react'
import SaaSTemplate from '@/components/templates/SaaSTemplate'
import PortfolioTemplate from '@/components/templates/PortfolioTemplate'
import EcommerceTemplate from '@/components/templates/EcommerceTemplate'
import { TemplateConfig } from '@/lib/types'

// Animated Icon Component
const AnimatedIcon = ({ icon: Icon, className }: { icon: any, className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <Icon className="animate-pulse" />
      <div className="absolute inset-0 blur-lg opacity-50 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
    </div>
  )
}

// Floating Animation Component
const FloatingAnimation = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  return (
    <div 
      className="animate-float"
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// Gradient Text Component
const GradientText = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <span className={`bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient ${className}`}>
      {children}
    </span>
  )
}

// Animated Card Component
const AnimatedCard = ({ children, className, style }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) => {
  return (
    <div className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl ${className}`} style={style}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// Particle Effect Component
const ParticleEffect = () => {
  const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, size: number }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.id * 100}ms`,
          }}
        />
      ))}
    </div>
  )
}

const industries = [
  'SaaS', 'Technology', 'Portfolio', 'Design', 'E-commerce', 'Retail',
  'Healthcare', 'Finance', 'Education', 'Food & Beverage', 'Real Estate',
  'Consulting', 'Marketing'
]

export default function Home() {
  const [formData, setFormData] = useState({
    websiteName: '',
    industry: '',
    tagline: '',
    useOnlineTemplates: true,
    style: 'modern' as 'modern' | 'classic' | 'minimalist',
    template: '',
    showProfile: false,
    customerProfile: {
      companyName: '',
      founderName: '',
      missionStatement: '',
      targetAudience: '',
      colorPreferences: '',
      designGoals: ''
    }
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDeploying, setIsDeploying] = useState(false)
  const [generatedTemplate, setGeneratedTemplate] = useState<TemplateConfig | null>(null)
  const [selectedOnlineTemplate, setSelectedOnlineTemplate] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const [externalTemplates, setExternalTemplates] = useState<any[]>([])
  const [selectedExternalTemplate, setSelectedExternalTemplate] = useState<any>(null)
  const [isLoadingExternal, setIsLoadingExternal] = useState(false)
  const [savedTemplates, setSavedTemplates] = useState<any[]>([])
  const [showSavedTemplates, setShowSavedTemplates] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setMounted(true)
    loadSavedTemplates()
  }, [])

  const loadSavedTemplates = async () => {
    try {
      const response = await fetch('/api/saved-templates')
      const data = await response.json()
      if (data.success) {
        setSavedTemplates(data.data)
      }
    } catch (error) {
      console.error('Error loading saved templates:', error)
    }
  }

  const handleSaveTemplate = async (template: any) => {
    try {
      const response = await fetch('/api/saved-templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: template.id,
          name: template.name,
          description: template.description,
          thumbnail: template.thumbnail,
          previewUrl: template.previewUrl,
          downloadUrl: template.downloadUrl,
          price: template.price,
          rating: template.rating,
          downloads: template.downloads,
          tags: template.tags,
          category: template.category,
          source: template.source,
          features: template.features,
          license: template.license
        })
      })
      const data = await response.json()
      if (data.success) {
        await loadSavedTemplates()
        alert('Template saved successfully!')
      }
    } catch (error) {
      console.error('Error saving template:', error)
      alert('Failed to save template')
    }
  }

  const handleDeleteTemplate = async (id: string) => {
    try {
      const response = await fetch(`/api/saved-templates?id=${id}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      if (data.success) {
        await loadSavedTemplates()
        alert('Template deleted successfully!')
      }
    } catch (error) {
      console.error('Error deleting template:', error)
      alert('Failed to delete template')
    }
  }

  useEffect(() => {
    if (!mounted || !canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; alpha: number }> = []
    
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(139, 92, 246, ${particle.alpha})`
        ctx.fill()
      })

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / 150)})`
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mounted])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleGenerate = async () => {
    if (!formData.websiteName || !formData.industry) {
      alert('Please enter website name and select an industry')
      return
    }

    setIsGenerating(true)
    setIsLoadingExternal(true)

    try {
      // Fetch external templates based on industry
      const externalResponse = await fetch(`/api/external-templates?action=industry&industry=${formData.industry}`)
      const externalData = await externalResponse.json()
      
      if (externalData.success) {
        setExternalTemplates(externalData.templates)
      }

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          websiteName: formData.websiteName,
          industry: formData.industry,
          tagline: formData.tagline,
          useOnlineTemplates: formData.useOnlineTemplates,
          preferences: {
            style: formData.style
          },
          customerProfile: formData.showProfile ? {
            companyName: formData.customerProfile.companyName,
            founderName: formData.customerProfile.founderName,
            missionStatement: formData.customerProfile.missionStatement,
            targetAudience: formData.customerProfile.targetAudience,
            colorPreferences: formData.customerProfile.colorPreferences,
            designGoals: formData.customerProfile.designGoals
          } : undefined,
          template: formData.template,
          externalTemplates: externalData.success ? externalData.templates : []
        })
      })

      const data = await response.json()

      if (data.success) {
        setGeneratedTemplate(data.template)
        
        if (data.template.onlineTemplates && data.template.onlineTemplates.length > 0) {
          setSelectedOnlineTemplate(data.template.onlineTemplates[0])
        }
      } else {
        alert('Failed to generate template. Please try again.')
      }
    } catch (error) {
      console.error('Error generating template:', error)
      alert('An error occurred while generating template. Please try again.')
    } finally {
      setIsGenerating(false)
      setIsLoadingExternal(false)
    }
  }

  const handleDownload = () => {
    if (!generatedTemplate) return

    const templateData = JSON.stringify(generatedTemplate, null, 2)
    const blob = new Blob([templateData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${formData.websiteName.replace(/\s+/g, '-').toLowerCase()}-template.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleDeploy = async () => {
    if (!generatedTemplate) return

    setIsDeploying(true)

    try {
      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          websiteName: formData.websiteName,
          templateConfig: generatedTemplate,
          selectedTemplate: formData.template
        })
      })

      const data = await response.json()

      if (data.success) {
        alert('Website deployed successfully! Download the files below.')
        
        // Download the generated website files
        const blob = new Blob([data.websiteFiles], { type: 'application/zip' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${formData.websiteName.replace(/\s+/g, '-').toLowerCase()}-website.zip`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      } else {
        alert('Failed to deploy website. Please try again.')
      }
    } catch (error) {
      console.error('Error deploying website:', error)
      alert('An error occurred while deploying website. Please try again.')
    } finally {
      setIsDeploying(false)
    }
  }

  const handlePreviewWebsite = () => {
    if (!generatedTemplate) return

    // Open the current template preview in a new window
    const previewWindow = window.open('', '_blank')
    if (previewWindow) {
      previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${generatedTemplate.websiteName} - Preview</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script>
            // This is a preview of the generated template
            // In production, this would render the actual template component
            document.body.innerHTML = '<div style="padding: 40px; text-align: center;"><h1>${generatedTemplate.websiteName}</h1><p>${generatedTemplate.tagline || ''}</p><p style="margin-top: 20px; color: #666;">Template Type: ${generatedTemplate.templateType}</p><p style="color: #666;">Industry: ${generatedTemplate.industry}</p></div>';
          </script>
        </body>
        </html>
      `)
      previewWindow.document.close()
    }
  }

  const renderTemplate = () => {
    if (!generatedTemplate) return null

    switch (generatedTemplate.templateType) {
      case 'saas':
        return (
          <SaaSTemplate
            websiteName={generatedTemplate.websiteName}
            industry={generatedTemplate.industry}
            tagline={generatedTemplate.tagline}
            colors={generatedTemplate.colors}
          />
        )
      case 'portfolio':
        return (
          <PortfolioTemplate
            websiteName={generatedTemplate.websiteName}
            industry={generatedTemplate.industry}
            tagline={generatedTemplate.tagline}
            colors={generatedTemplate.colors}
          />
        )
      case 'ecommerce':
        return (
          <EcommerceTemplate
            websiteName={generatedTemplate.websiteName}
            industry={generatedTemplate.industry}
            tagline={generatedTemplate.tagline}
            colors={generatedTemplate.colors}
          />
        )
      default:
        return null
    }
  }

  if (generatedTemplate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-30" />
        <div className="fixed top-4 right-4 z-50 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-4 flex gap-2">
          <button
            onClick={() => setGeneratedTemplate(null)}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all duration-300 backdrop-blur-sm"
          >
            Edit
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 flex items-center gap-2 shadow-lg"
          >
            <Download size={16} />
            Export
          </button>
        </div>
        
        {/* External Templates Panel */}
        {externalTemplates.length > 0 && (
          <div className="fixed top-20 right-4 z-50 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-6 max-w-lg max-h-[70vh] overflow-hidden">
            <h3 className="text-lg font-bold mb-4 flex items-center text-white">
              <Globe className="w-5 h-5 mr-2 text-gray-400" />
              Best Templates from Multiple Sources
            </h3>
            <div className="space-y-3 overflow-y-auto max-h-[50vh] pr-2">
              {isLoadingExternal ? (
                <div className="text-center text-gray-400 py-8">
                  <Sparkles className="w-6 h-6 mx-auto mb-2 animate-spin" />
                  <p>Loading best templates...</p>
                </div>
              ) : (
                externalTemplates.map((template: any, index: number) => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedExternalTemplate(template)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 backdrop-blur-sm ${
                      selectedExternalTemplate?.id === template.id
                        ? 'border-gray-400 bg-white/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-white mb-1">{template.name}</h4>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs px-2 py-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white">
                            {template.source}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-xs font-medium text-gray-400">{template.rating}</span>
                          </div>
                          <span className="text-xs text-gray-400">{template.price === 0 ? 'FREE' : `$${template.price}`}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSaveTemplate(template)
                          }}
                          className="p-2 bg-pink-500/20 hover:bg-pink-500/30 rounded-lg transition-colors"
                          title="Save template"
                        >
                          <Heart className="w-4 h-4 text-pink-400" />
                        </button>
                        {template.previewUrl && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              window.open(template.previewUrl, '_blank')
                            }}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                            title="Preview template"
                          >
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mb-2 line-clamp-2">{template.description}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {template.features.slice(0, 3).map((feature: string, i: number) => (
                        <span key={i} className="text-xs px-2 py-1 bg-white/10 rounded-full text-gray-400">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{template.downloads.toLocaleString()} downloads</span>
                      <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                        {template.license}
                      </span>
                    </div>
                    {selectedExternalTemplate?.id === template.id && (
                      <div className="mt-2 flex items-center justify-center text-gray-400">
                        <Check className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            {selectedExternalTemplate && (
              <button
                onClick={() => window.open(selectedExternalTemplate.downloadUrl, '_blank')}
                className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-slate-400 via-gray-400 to-zinc-400 text-white rounded-xl hover:from-slate-500 hover:via-gray-500 hover:to-zinc-500 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
              >
                <Download size={16} />
                Download Selected Template
              </button>
            )}
          </div>
        )}

        {/* Deploy and Preview Buttons */}
        <div className="fixed bottom-4 left-4 z-50 flex gap-3">
          <button
            onClick={handlePreviewWebsite}
            className="flex items-center gap-3 px-6 py-4 bg-white/20 hover:bg-white/30 text-white font-medium rounded-xl transition-all duration-500 shadow-lg hover:shadow-white/20 transform hover:scale-[1.02] active:scale-[0.99] backdrop-blur-xl border border-white/10"
          >
            <Globe className="w-5 h-5" />
            <span>Preview Website</span>
          </button>
          <button
            onClick={handleDeploy}
            disabled={isDeploying}
            className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-slate-400 via-gray-400 to-zinc-400 text-white font-medium rounded-xl hover:from-slate-500 hover:via-gray-500 hover:to-zinc-500 transition-all duration-500 shadow-lg hover:shadow-gray-500/20 transform hover:scale-[1.02] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none backdrop-blur-xl border border-white/10"
          >
            {isDeploying ? (
              <>
                <Sparkles className="w-5 h-5 animate-spin" />
                <span>Deploying...</span>
              </>
            ) : (
              <>
                <Rocket className="w-5 h-5" />
                <span>Deploy Website</span>
              </>
            )}
          </button>
        </div>
        
        {renderTemplate()}
      </div>
    )
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-950 to-slate-950 relative overflow-hidden">
      {/* Particle Effect */}
      <ParticleEffect />
      
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-20" />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-6 shadow-lg animate-gradient">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FloatingAnimation delay={0}>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center animate-glow">
                <Wand2 className="w-7 h-7" />
              </div>
            </FloatingAnimation>
            <div>
              <h1 className="text-2xl font-bold animate-slide-up">SiteForge AI</h1>
              <p className="text-xs text-white/80 animate-slide-up" style={{ animationDelay: '100ms' }}>Made by PSK Infotech</p>
            </div>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-sm text-white/90 animate-slide-up" style={{ animationDelay: '200ms' }}>AI-Powered Website Generator</p>
            <p className="text-xs text-white/70 animate-slide-up" style={{ animationDelay: '300ms' }}>Dynamic & Modern Designs</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-16">
          <FloatingAnimation delay={0}>
            <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-lg animate-glow">
              <AnimatedIcon icon={Wand2} className="w-8 h-8 text-white" />
            </div>
          </FloatingAnimation>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
            AI Website <GradientText>Generator</GradientText>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '400ms' }}>
            Create stunning, professional websites in seconds using our advanced AI technology. 
            Simply enter your details and let our AI craft the perfect website for your brand.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="px-5 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-gray-300 text-sm font-light">
              <Layout className="w-4 h-4 inline mr-2" />
              20+ Templates
            </div>
            <div className="px-5 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-gray-300 text-sm font-light">
              <Code2 className="w-4 h-4 inline mr-2" />
              Production Ready
            </div>
          </div>
        </div>

        {/* Elegant Main Card */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-xl p-10 md:p-14 relative overflow-hidden animate-slide-up" style={{ animationDelay: '600ms' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-500/5 via-gray-500/5 to-zinc-500/5"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-light text-white mb-10 flex items-center">
              <AnimatedIcon icon={Sparkles} className="w-8 h-8 mr-4 text-gray-400" />
              Enter Your Website Details
            </h2>

            <div className="space-y-8">
              <div className="group">
                <label htmlFor="websiteName" className="block text-sm font-light text-gray-400 mb-3 transition-colors group-hover:text-gray-300">
                  Website Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="websiteName"
                    name="websiteName"
                    value={formData.websiteName}
                    onChange={handleChange}
                    placeholder="Enter your website name"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:ring-1 focus:ring-gray-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-500 backdrop-blur-md hover:bg-white/10 focus:bg-white/15"
                    required
                  />
                </div>
              </div>

              <div className="group">
                <label htmlFor="industry" className="block text-sm font-light text-gray-400 mb-3 transition-colors group-hover:text-gray-300">
                  Industry *
                </label>
                <div className="relative">
                  <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:ring-1 focus:ring-gray-400 focus:border-transparent transition-all duration-300 text-white backdrop-blur-md hover:bg-white/10 focus:bg-white/15 appearance-none cursor-pointer"
                    required
                  >
                    <option value="" className="bg-slate-950">Select your industry</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry} className="bg-slate-950">
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="group">
                <label htmlFor="tagline" className="block text-sm font-light text-gray-400 mb-3 transition-colors group-hover:text-gray-300">
                  Tagline (Optional)
                </label>
                <input
                  type="text"
                  id="tagline"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  placeholder="Enter a catchy tagline"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:ring-1 focus:ring-gray-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-500 backdrop-blur-md hover:bg-white/10 focus:bg-white/15"
                />
              </div>

              <div className="group">
                <label htmlFor="style" className="block text-sm font-light text-gray-400 mb-3 transition-colors group-hover:text-gray-300">
                  Design Style
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'modern', label: 'Modern', icon: Zap },
                    { value: 'classic', label: 'Classic', icon: Layout },
                    { value: 'minimalist', label: 'Minimalist', icon: Palette }
                  ].map((styleOption) => (
                    <button
                      key={styleOption.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, style: styleOption.value as any })}
                      className={`p-5 rounded-xl border transition-all duration-300 ${
                        formData.style === styleOption.value
                          ? 'border-gray-400 bg-white/10 text-white'
                          : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <styleOption.icon className="w-6 h-6 mx-auto mb-2" />
                      <span className="text-sm font-light">{styleOption.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="group">
                <label htmlFor="template" className="block text-sm font-light text-gray-400 mb-3 transition-colors group-hover:text-gray-300">
                  Select Template
                </label>
                <select
                  id="template"
                  name="template"
                  value={formData.template || ''}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:ring-1 focus:ring-gray-400 focus:border-transparent transition-all duration-300 text-white backdrop-blur-md hover:bg-white/10 focus:bg-white/15 appearance-none cursor-pointer"
                >
                  <option value="" className="bg-slate-950">Let AI Recommend</option>
                  <option value="tailwind-landing" className="bg-slate-950">Tailwind Landing Page</option>
                  <option value="shadcn-saas" className="bg-slate-950">Shadcn SaaS Template</option>
                  <option value="vercel-saas" className="bg-slate-950">Vercel SaaS Template</option>
                  <option value="framer-portfolio" className="bg-slate-950">Framer Portfolio</option>
                  <option value="daisyui-portfolio" className="bg-slate-950">DaisyUI Portfolio</option>
                  <option value="shopify-dawn" className="bg-slate-950">Shopify Dawn E-commerce</option>
                  <option value="medusa-store" className="bg-slate-950">Medusa Storefront</option>
                  <option value="nextjs-ecommerce" className="bg-slate-950">Next.js E-commerce</option>
                  <option value="modern-healthcare" className="bg-slate-950">Modern Healthcare</option>
                  <option value="dental-clinic" className="bg-slate-950">Dental Clinic</option>
                  <option value="learning-platform" className="bg-slate-950">Learning Platform</option>
                  <option value="university-portal" className="bg-slate-950">University Portal</option>
                  <option value="modern-restaurant" className="bg-slate-950">Modern Restaurant</option>
                  <option value="food-delivery" className="bg-slate-950">Food Delivery App</option>
                  <option value="property-pro" className="bg-slate-950">Property Pro Real Estate</option>
                  <option value="luxury-homes" className="bg-slate-950">Luxury Homes</option>
                  <option value="marketing-agency" className="bg-slate-950">Marketing Agency</option>
                  <option value="digital-marketing" className="bg-slate-950">Digital Marketing</option>
                  <option value="consulting-pro" className="bg-slate-950">Consulting Pro</option>
                </select>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                <input
                  type="checkbox"
                  id="useOnlineTemplates"
                  name="useOnlineTemplates"
                  checked={formData.useOnlineTemplates}
                  onChange={(e) => setFormData({ ...formData, useOnlineTemplates: e.target.checked })}
                  className="w-5 h-5 text-gray-400 rounded focus:ring-gray-400 bg-white/10 border-white/20"
                />
                <label htmlFor="useOnlineTemplates" className="text-sm font-light text-gray-400">
                  Use AI-recommended online templates
                </label>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                <input
                  type="checkbox"
                  id="showProfile"
                  name="showProfile"
                  checked={formData.showProfile}
                  onChange={(e) => setFormData({ ...formData, showProfile: e.target.checked })}
                  className="w-5 h-5 text-gray-400 rounded focus:ring-gray-400 bg-white/10 border-white/20"
                />
                <label htmlFor="showProfile" className="text-sm font-light text-gray-400">
                  Add Customer Profile Details (Optional)
                </label>
              </div>

              {/* Saved Templates Toggle */}
            <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
              <input
                type="checkbox"
                id="showSavedTemplates"
                checked={showSavedTemplates}
                onChange={(e) => setShowSavedTemplates(e.target.checked)}
                className="w-5 h-5 text-gray-400 rounded focus:ring-gray-400 bg-white/10 border-white/20"
              />
              <label htmlFor="showSavedTemplates" className="text-sm font-light text-gray-400">
                Use Saved Templates ({savedTemplates.length})
              </label>
            </div>

            {showSavedTemplates && savedTemplates.length > 0 && (
              <div className="space-y-3 p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md max-h-64 overflow-y-auto">
                <h3 className="text-lg font-medium text-white mb-4">Your Saved Templates</h3>
                {savedTemplates.map((template: any) => (
                  <div
                    key={template.id}
                    onClick={() => setFormData({ ...formData, template: template.templateId })}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 backdrop-blur-sm ${
                      formData.template === template.templateId
                        ? 'border-gray-400 bg-white/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-white mb-1">{template.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white">
                            {template.source}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-xs font-medium text-gray-400">{template.rating}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteTemplate(template.id)
                        }}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mb-2 line-clamp-1">{template.description}</p>
                    {formData.template === template.templateId && (
                      <div className="flex items-center justify-center text-gray-400">
                        <Check className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {formData.showProfile && (
                <div className="space-y-6 p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
                  <h3 className="text-lg font-medium text-white mb-4">Customer Profile</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-light text-gray-400 mb-2">
                        Company Name (Optional)
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.customerProfile.companyName}
                        onChange={(e) => setFormData({ ...formData, customerProfile: { ...formData.customerProfile, companyName: e.target.value } })}
                        placeholder="Your company name"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-500 backdrop-blur-md hover:bg-white/10 focus:bg-white/15"
                      />
                    </div>

                    <div>
                      <label htmlFor="founderName" className="block text-sm font-light text-gray-400 mb-2">
                        Founder Name (Optional)
                      </label>
                      <input
                        type="text"
                        id="founderName"
                        name="founderName"
                        value={formData.customerProfile.founderName}
                        onChange={(e) => setFormData({ ...formData, customerProfile: { ...formData.customerProfile, founderName: e.target.value } })}
                        placeholder="Your name"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-500 backdrop-blur-md hover:bg-white/10 focus:bg-white/15"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="missionStatement" className="block text-sm font-light text-gray-400 mb-2">
                      Mission Statement (Optional)
                    </label>
                    <textarea
                      id="missionStatement"
                      name="missionStatement"
                      value={formData.customerProfile.missionStatement}
                      onChange={(e) => setFormData({ ...formData, customerProfile: { ...formData.customerProfile, missionStatement: e.target.value } })}
                      placeholder="What drives your business?"
                      rows={3}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-500 backdrop-blur-md hover:bg-white/10 focus:bg-white/15 resize-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="targetAudience" className="block text-sm font-light text-gray-400 mb-2">
                      Target Audience (Optional)
                    </label>
                    <input
                      type="text"
                      id="targetAudience"
                      name="targetAudience"
                      value={formData.customerProfile.targetAudience}
                      onChange={(e) => setFormData({ ...formData, customerProfile: { ...formData.customerProfile, targetAudience: e.target.value } })}
                      placeholder="Who are your customers?"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-500 backdrop-blur-md hover:bg-white/10 focus:bg-white/15"
                    />
                  </div>

                  <div>
                    <label htmlFor="colorPreferences" className="block text-sm font-light text-gray-400 mb-2">
                      Color Preferences (Optional)
                    </label>
                    <input
                      type="text"
                      id="colorPreferences"
                      name="colorPreferences"
                      value={formData.customerProfile.colorPreferences}
                      onChange={(e) => setFormData({ ...formData, customerProfile: { ...formData.customerProfile, colorPreferences: e.target.value } })}
                      placeholder="e.g., Blue, White, Gold"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-500 backdrop-blur-md hover:bg-white/10 focus:bg-white/15"
                    />
                  </div>

                  <div>
                    <label htmlFor="designGoals" className="block text-sm font-light text-gray-400 mb-2">
                      Design Goals (Optional)
                    </label>
                    <textarea
                      id="designGoals"
                      name="designGoals"
                      value={formData.customerProfile.designGoals}
                      onChange={(e) => setFormData({ ...formData, customerProfile: { ...formData.customerProfile, designGoals: e.target.value } })}
                      placeholder="What should the website achieve?"
                      rows={3}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-500 backdrop-blur-md hover:bg-white/10 focus:bg-white/15 resize-none"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-medium rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-500 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none backdrop-blur-xl border border-white/10"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-3 animate-spin" />
                    Generating Website...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-3" />
                    Generate Website
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 animate-slide-up" style={{ animationDelay: '700ms' }}>
            <h2 className="text-3xl font-light text-white mb-10 flex items-center">
              <AnimatedIcon icon={Zap} className="w-8 h-8 mr-4 text-gray-400" />
              Why Choose SiteForge AI?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Layout, title: 'Modern Templates', desc: 'Beautiful, responsive designs' },
                { icon: Palette, title: 'Customizable', desc: 'Tailored to your brand' },
                { icon: Rocket, title: 'Fast Deployment', desc: 'Export in seconds' }
              ].map((feature, index) => (
                <div key={index} className="p-6 bg-white/5 rounded-xl border border-white/10 animate-slide-up" style={{ animationDelay: `${800 + index * 100}ms` }}>
                  <AnimatedIcon icon={feature.icon} className="w-10 h-10 mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 animate-slide-up" style={{ animationDelay: '1100ms' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '10K+', label: 'Websites Created' },
              { value: '50+', label: 'Industries' },
              { value: '5.0', label: 'Avg Rating' },
              { value: '100%', label: 'Free' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl md:text-5xl font-light text-gray-200 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm font-light text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Elegant Footer */}
        <div className="mt-24 text-center animate-slide-up" style={{ animationDelay: '1200ms' }}>
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="text-xl font-light mb-3">
              <GradientText>SiteForge</GradientText> AI
            </div>
            <div className="text-gray-400 mb-6 font-light">
              Powered by AI, Built for the Future
            </div>
            <div className="text-gray-400 font-light">
              Made by <span className="text-gray-300 font-medium">PSK Infotech</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
