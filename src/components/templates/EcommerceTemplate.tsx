'use client'

import { useState, useEffect } from 'react'
import { ShoppingCart, Package, Tag, Truck, Shield, Star, Heart, Search } from 'lucide-react'
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

interface EcommerceTemplateProps {
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

export default function EcommerceTemplate({ websiteName, industry, tagline, colors }: EcommerceTemplateProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background, color: colors.text }}>
      <Navbar websiteName={websiteName} links={['Home', 'Products', 'Categories', 'About', 'Contact']} />

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
              Your premier destination for quality {industry} products. Discover amazing deals and exceptional service.
            </p>
            <FloatingAnimation delay={600}>
              <button
                className="px-8 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity animate-glow"
                style={{ backgroundColor: colors.primary }}
              >
                <AnimatedIcon icon={ShoppingCart} className="w-5 h-5 inline mr-2" />
                Shop Now
              </button>
            </FloatingAnimation>
          </div>
        </FloatingAnimation>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 animate-slide-up" style={{ color: colors.primary }}>
            <AnimatedIcon icon={Tag} className="w-10 h-10 inline mr-3" />
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'New Arrivals', icon: Package },
              { name: 'Best Sellers', icon: Star },
              { name: 'Sale Items', icon: Tag }
            ].map((category, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-slide-up group cursor-pointer" style={{ animationDelay: `${100 + index * 100}ms` }}>
                <AnimatedIcon icon={category.icon} className="w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform" style={{ color: colors.accent }} />
                <h3 className="text-xl font-semibold text-center group-hover:scale-105 transition-transform">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="products" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 animate-slide-up" style={{ color: colors.primary }}>
            <AnimatedIcon icon={Package} className="w-10 h-10 inline mr-3" />
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Product A', price: '$99.99', originalPrice: '$129.99', rating: 4.5 },
              { name: 'Product B', price: '$79.99', originalPrice: '$99.99', rating: 4.8 },
              { name: 'Product C', price: '$149.99', originalPrice: '$199.99', rating: 4.7 },
              { name: 'Product D', price: '$59.99', originalPrice: '$79.99', rating: 4.6 }
            ].map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow animate-slide-up group" style={{ animationDelay: `${100 + index * 100}ms` }}>
                <div className="h-48 bg-gradient-to-br flex items-center justify-center group-hover:scale-105 transition-transform" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
                  <AnimatedIcon icon={Package} className="w-16 h-16 text-white/50" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2 group-hover:scale-105 transition-transform">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <span className="text-xl font-bold" style={{ color: colors.primary }}>{product.price}</span>
                    <span className="text-sm text-gray-400 line-through ml-2">{product.originalPrice}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <AnimatedIcon icon={Star} className="w-4 h-4 mr-1 text-yellow-400" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <button
                    className="w-full py-2 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity animate-glow"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <AnimatedIcon icon={ShoppingCart} className="w-4 h-4 inline mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 animate-slide-up" style={{ animationDelay: '500ms', backgroundColor: colors.primary }}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            <AnimatedIcon icon={Tag} className="w-10 h-10 inline mr-3" />
            Limited Time Offer
          </h2>
          <p className="text-xl mb-8">Get 20% off on all {industry} products this week!</p>
          <div className="flex justify-center gap-4 mb-8">
            {['Days', 'Hours', 'Minutes', 'Seconds'].map((unit, index) => (
              <FloatingAnimation key={index} delay={index * 100}>
                <div className="bg-white/20 backdrop-blur rounded-lg p-4 w-20">
                  <div className="text-3xl font-bold">{['03', '12', '45', '30'][index]}</div>
                  <div className="text-sm">{unit}</div>
                </div>
              </FloatingAnimation>
            ))}
          </div>
          <button className="px-8 py-3 bg-white rounded-lg font-semibold hover:bg-gray-100 transition-colors animate-glow" style={{ color: colors.primary }}>
            Shop Now
          </button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 animate-slide-up" style={{ color: colors.primary }}>
            <AnimatedIcon icon={Star} className="w-10 h-10 inline mr-3" />
            Customer Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Alice M.', rating: 5, text: 'Amazing quality and fast shipping! Will definitely buy again.' },
              { name: 'Bob K.', rating: 5, text: `Best ${industry} products I have ever purchased. Highly recommended!` },
              { name: 'Carol L.', rating: 4, text: 'Great value for money. Customer service was excellent.' }
            ].map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-slide-up" style={{ animationDelay: `${200 + index * 100}ms` }}>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <AnimatedIcon key={i} icon={Star} className="w-4 h-4 mr-1" style={{ color: i < review.rating ? '#fbbf24' : '#d1d5db' }} />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{review.text}"</p>
                <p className="font-semibold" style={{ color: colors.primary }}>{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 animate-slide-up" style={{ color: colors.primary }}>
            <AnimatedIcon icon={Search} className="w-10 h-10 inline mr-3" />
            Contact Us
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-lg animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <input
                type="text"
                placeholder="Name"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all"
              />
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all"
              />
            </div>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all"
              />
            </div>
            <div className="mb-6">
              <textarea
                placeholder="Message"
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all resize-none"
              ></textarea>
            </div>
            <button
              className="w-full py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity animate-glow"
              style={{ backgroundColor: colors.primary }}
            >
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
              { icon: Shield, title: 'Secure Payment', desc: '100% secure checkout' },
              { icon: Heart, title: '24/7 Support', desc: 'Dedicated support team' }
            ].map((feature, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${400 + index * 100}ms` }}>
                <AnimatedIcon icon={feature.icon} className="w-16 h-16 mx-auto mb-4" style={{ color: colors.accent }} />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer websiteName={websiteName} links={['Home', 'Products', 'Categories', 'About', 'Contact']} />
    </div>
  )
}
