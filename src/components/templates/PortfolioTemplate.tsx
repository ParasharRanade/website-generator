'use client'

import { useState, useEffect } from 'react'
import { Palette, Code2, Briefcase, Award, Mail, Globe, ExternalLink } from 'lucide-react'
import Navbar from '../Navbar'
import Footer from '../Footer'

// Animated Icon Component
const AnimatedIcon = ({ icon: Icon, className, style }: { icon: any, className?: string, style?: React.CSSProperties }) => {
  return (
    <div className={`relative ${className}`} style={style}>
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

interface PortfolioTemplateProps {
  websiteName: string
  industry: string
  tagline?: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
}

export default function PortfolioTemplate({ websiteName, industry, tagline, colors }: PortfolioTemplateProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background, color: colors.text }}>
      <Navbar websiteName={websiteName} links={['Home', 'About', 'Projects', 'Skills', 'Contact']} />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <FloatingAnimation delay={0}>
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 animate-slide-up" style={{ color: colors.primary }}>
              <GradientText>{websiteName}</GradientText>
            </h1>
            {tagline && (
              <p className="text-2xl mb-8 animate-slide-up" style={{ animationDelay: '200ms', color: colors.secondary }}>
                {tagline}
              </p>
            )}
            <p className="text-xl mb-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '400ms' }}>
              Creative {industry} professional passionate about delivering exceptional results.
            </p>
            <FloatingAnimation delay={600}>
              <button
                className="px-8 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity animate-glow"
                style={{ backgroundColor: colors.primary }}
              >
                <AnimatedIcon icon={Briefcase} className="w-5 h-5 inline mr-2" />
                View My Work
              </button>
            </FloatingAnimation>
          </div>
        </FloatingAnimation>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 animate-slide-up" style={{ color: colors.primary }}>
            <AnimatedIcon icon={Palette} className="w-10 h-10 inline mr-3" />
            About Me
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div>
              <p className="text-lg mb-6">
                I'm a passionate {industry} professional with years of experience creating innovative solutions. 
                My work combines creativity with technical excellence to deliver outstanding results.
              </p>
              <p className="text-lg">
                I believe in clean design, efficient code, and user-centered experiences. 
                Let's work together to bring your vision to life.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Code2, label: 'Development' },
                { icon: Palette, label: 'Design' },
                { icon: Briefcase, label: 'Projects' },
                { icon: Award, label: 'Awards' }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-slide-up group" style={{ animationDelay: `${300 + index * 100}ms` }}>
                  <AnimatedIcon icon={item.icon} className="w-12 h-12 mb-3" style={{ color: colors.accent }} />
                  <h3 className="font-semibold group-hover:scale-105 transition-transform">{item.label}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 animate-slide-up" style={{ color: colors.primary }}>
            <AnimatedIcon icon={Briefcase} className="w-10 h-10 inline mr-3" />
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Project Alpha', category: industry, description: 'Innovative solution for modern businesses' },
              { title: 'Project Beta', category: industry, description: 'Creative approach to complex challenges' },
              { title: 'Project Gamma', category: industry, description: 'Cutting-edge technology implementation' },
              { title: 'Project Delta', category: industry, description: 'User-centered design philosophy' },
              { title: 'Project Epsilon', category: industry, description: 'Scalable architecture design' },
              { title: 'Project Zeta', category: industry, description: 'Performance optimization expert' }
            ].map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow animate-slide-up group" style={{ animationDelay: `${100 + index * 100}ms` }}>
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center">
                  <AnimatedIcon icon={Code2} className="w-16 h-16 group-hover:scale-110 transition-transform" style={{ color: colors.accent }} />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:scale-105 transition-transform">{project.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{project.category}</p>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 animate-slide-up" style={{ color: colors.primary }}>
            <AnimatedIcon icon={Award} className="w-10 h-10 inline mr-3" />
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Design', 'Development', 'UI/UX', 'Strategy',
              'Leadership', 'Communication', 'Problem Solving', 'Innovation'
            ].map((skill, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-slide-up group" style={{ animationDelay: `${200 + index * 50}ms` }}>
                <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center group-hover:scale-110 transition-transform" style={{ backgroundColor: colors.accent }}>
                  <AnimatedIcon icon={Palette} className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold group-hover:scale-105 transition-transform">{skill}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 animate-slide-up" style={{ color: colors.primary }}>
            <AnimatedIcon icon={Mail} className="w-10 h-10 inline mr-3" />
            Get In Touch
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-8 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <p className="text-gray-600 mb-4">Feel free to reach out for collaborations or just a friendly hello.</p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <AnimatedIcon icon={Mail} className="w-5 h-5 mr-3" style={{ color: colors.accent }} />
                    <span className="text-gray-600">hello@example.com</span>
                  </div>
                  <div className="flex items-center">
                    <AnimatedIcon icon={Globe} className="w-5 h-5 mr-3" style={{ color: colors.accent }} />
                    <span className="text-gray-600">www.example.com</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Social Links</h3>
                <div className="flex space-x-4">
                  <button className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform animate-glow" style={{ backgroundColor: colors.primary }}>
                    <AnimatedIcon icon={Globe} className="w-5 h-5 text-white" />
                  </button>
                  <button className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform animate-glow" style={{ backgroundColor: colors.primary }}>
                    <AnimatedIcon icon={ExternalLink} className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer websiteName={websiteName} links={['Home', 'About', 'Projects', 'Skills', 'Contact']} />
    </div>
  )
}
