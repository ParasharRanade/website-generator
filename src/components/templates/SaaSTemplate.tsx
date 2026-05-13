'use client'

import { useState, useEffect } from 'react'
import { Zap, Rocket, Shield, Cpu, Globe, Check } from 'lucide-react'
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

interface SaaSTemplateProps {
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

export default function SaaSTemplate({ websiteName, industry, tagline, colors }: SaaSTemplateProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background, color: colors.text }}>
      <Navbar websiteName={websiteName} links={['Home', 'Features', 'Pricing', 'About', 'Contact']} />

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
              Leading {industry} solutions for modern businesses. Transform your operations with our cutting-edge platform.
            </p>
            <FloatingAnimation delay={600}>
              <button
                className="px-8 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity animate-glow"
                style={{ backgroundColor: colors.primary }}
              >
                <AnimatedIcon icon={Rocket} className="w-5 h-5 inline mr-2" />
                Get Started
              </button>
            </FloatingAnimation>
          </div>
        </FloatingAnimation>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 animate-slide-up" style={{ color: colors.primary }}>
            <AnimatedIcon icon={Zap} className="w-10 h-10 inline mr-3" />
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Real-time Analytics', icon: Cpu },
              { name: 'Secure Infrastructure', icon: Shield },
              { name: 'Scalable Solutions', icon: Globe },
              { name: '24/7 Support', icon: Zap },
              { name: 'Easy Integration', icon: Rocket },
              { name: 'Custom Workflows', icon: Cpu }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-slide-up group" style={{ animationDelay: `${100 + index * 100}ms` }}>
                <AnimatedIcon icon={feature.icon} className="w-12 h-12 mb-4" style={{ color: colors.accent }} />
                <h3 className="text-xl font-semibold mb-3 group-hover:scale-105 transition-transform" style={{ color: colors.accent }}>
                  {feature.name}
                </h3>
                <p className="text-gray-600">
                  Leverage our advanced {feature.name} to enhance your {industry} operations.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 animate-slide-up" style={{ color: colors.primary }}>
            <AnimatedIcon icon={Zap} className="w-10 h-10 inline mr-3" />
            Simple Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', price: '$29', features: ['5 Users', '10GB Storage', 'Email Support'] },
              { name: 'Professional', price: '$79', features: ['25 Users', '100GB Storage', 'Priority Support', 'API Access'] },
              { name: 'Enterprise', price: '$199', features: ['Unlimited Users', 'Unlimited Storage', '24/7 Support', 'Custom Integrations'] }
            ].map((plan, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg border-2 hover:border-blue-500 transition-all animate-slide-up group hover:scale-105" style={{ borderColor: index === 1 ? colors.primary : 'transparent', animationDelay: `${200 + index * 100}ms` }}>
                <h3 className="text-2xl font-bold mb-4 group-hover:scale-105 transition-transform">{plan.name}</h3>
                <div className="text-4xl font-bold mb-6" style={{ color: colors.primary }}>{plan.price}<span className="text-lg font-normal text-gray-600">/month</span></div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <AnimatedIcon icon={Check} className="w-5 h-5 mr-3" style={{ color: colors.accent }} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity animate-glow"
                  style={{ backgroundColor: colors.primary }}
                >
                  Choose {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 animate-slide-up" style={{ color: colors.primary }}>
            <AnimatedIcon icon={Rocket} className="w-10 h-10 inline mr-3" />
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'John Doe', role: 'CEO', company: 'TechCorp', text: 'Amazing platform that transformed our business!' },
              { name: 'Jane Smith', role: 'CTO', company: 'InnovateInc', text: 'Best solution we have ever used.' },
              { name: 'Bob Johnson', role: 'Founder', company: 'StartupXYZ', text: 'Incredible value for money.' }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-slide-up" style={{ animationDelay: `${300 + index * 100}ms` }}>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Join thousands of businesses already using {websiteName}</p>
          <button className="px-8 py-3 bg-white rounded-lg font-semibold hover:bg-gray-100 transition-colors" style={{ color: colors.primary }}>
            Start Free Trial
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ color: colors.primary }}>
            Contact Us
          </h2>
          <form className="bg-white p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <input
                type="text"
                placeholder="Name"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <textarea
              placeholder="Message"
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: colors.primary }}
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <Footer websiteName={websiteName} links={['Home', 'Features', 'Pricing', 'About', 'Contact']} />
    </div>
  )
}
