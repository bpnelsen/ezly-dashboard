'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { ArrowRight, CheckCircle, Users, Zap, BarChart3, MessageCircle, Mail, Phone, MapPin } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200/50 backdrop-blur-xl bg-white/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-navy-500">EZLY</div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#home" className="text-gray-700 hover:text-navy-500 font-medium transition">Home</a>
            <a href="#about" className="text-gray-700 hover:text-navy-500 font-medium transition">About</a>
            <a href="#solution" className="text-gray-700 hover:text-navy-500 font-medium transition">Solution</a>
            <Link href="/blog" className="text-gray-700 hover:text-navy-500 font-medium transition">Blog</Link>
            <a href="#contact" className="text-gray-700 hover:text-navy-500 font-medium transition">Contact</a>
          </div>
          <div className="flex gap-3">
            <Link href="/login" className="px-4 py-2 text-gray-700 hover:text-navy-500 font-medium transition">
              Sign In
            </Link>
            <Link 
              href="/signup"
              className="px-6 py-2 bg-navy-500 text-white rounded-lg font-medium hover:bg-navy-600 transition shadow-sm hover:shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="max-w-7xl mx-auto px-6 py-32 text-center">
        <div className="space-y-8 mb-16">
          <div className="inline-block px-4 py-2 bg-navy-500/10 text-navy-500 rounded-full text-sm font-semibold border border-navy-500/20">
            ✨ The future of contractor management is here
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
            Stop hunting for contractors.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-500 to-teal-500">
              Start building relationships.
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Connect with 500+ verified contractors, run intelligent campaigns, and close deals faster. All in one beautiful platform built for modern teams.
          </p>

          <div className="flex gap-4 justify-center pt-6">
            <Link 
              href="/signup"
              className="px-8 py-4 bg-navy-500 text-white rounded-lg font-semibold hover:bg-opacity-90 transition shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Start Free Trial <ArrowRight size={20} />
            </Link>
            <Link 
              href="#solution"
              className="px-8 py-4 border-2 border-teal-500 text-navy-500 rounded-lg font-semibold hover:bg-teal-500/5 transition"
            >
              Learn More
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex justify-center gap-8 pt-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                ))}
              </div>
              <span>500+ contractors trust EZLY</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-600" />
              <span>Fully secure & encrypted</span>
            </div>
          </div>
        </div>

        {/* Hero Visual - Dashboard Mockup */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-navy-500/20 to-teal-500/20 rounded-2xl blur-3xl"></div>
          <div className="relative bg-white rounded-2xl border border-gray-200/50 overflow-hidden shadow-2xl">
            {/* Dashboard Header */}
            <div className="bg-navy-500 text-white px-8 py-4 flex justify-between items-center">
              <h3 className="text-lg font-bold">EZLY Dashboard</h3>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-teal-400"></div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-8">
              {/* Stats Row */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                {[
                  { label: '586', desc: 'Contractors' },
                  { label: '47', desc: 'Campaigns' },
                  { label: '3.2K', desc: 'Messages' },
                  { label: '68%', desc: 'Open Rate' }
                ].map((stat, i) => (
                  <div key={i} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
                    <div className="text-2xl font-bold text-navy-500">{stat.label}</div>
                    <div className="text-sm text-gray-600 mt-1">{stat.desc}</div>
                  </div>
                ))}
              </div>

              {/* Content Cards */}
              <div className="grid grid-cols-2 gap-4">
                {/* Contractors Card */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3">Recent Contractors</h4>
                  {[
                    { name: 'Smith\'s Construction', type: 'Electrical • 4.8★' },
                    { name: 'Premium Roofing', type: 'Roofing • 4.9★' },
                    { name: 'Master Plumbing', type: 'Plumbing • 4.7★' }
                  ].map((c, i) => (
                    <div key={i} className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-200 last:border-b-0">
                      <div className="w-8 h-8 rounded bg-teal-400"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{c.name}</p>
                        <p className="text-xs text-gray-600">{c.type}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Campaign Performance Card */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3">Campaign Performance</h4>
                  <div className="flex items-end gap-1 h-20 mb-3">
                    {[60, 75, 45, 80, 55, 90, 70].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-teal-500 to-teal-400 rounded-t-sm"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="text-gray-600">Opens</p>
                      <p className="font-bold text-navy-500">68%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Clicks</p>
                      <p className="font-bold text-navy-500">23%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Converts</p>
                      <p className="font-bold text-navy-500">8%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROLE CHOOSER SECTION */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What's Your Role?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose how you'll use EZLY. We'll customize your experience based on your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Homeowner Card */}
            <Link 
              href="/signup?role=homeowner"
              className="group bg-gradient-to-br from-white to-navy-50 rounded-2xl border-2 border-gray-200 hover:border-navy-500 hover:shadow-xl transition-all duration-300 p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-navy-100/50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition"></div>
              <div className="relative z-10">
                <div className="text-5xl mb-4">🏠</div>
                <div className="p-4 rounded-lg bg-navy-500/10 text-navy-500 w-fit mb-6 group-hover:bg-navy-500 group-hover:text-white transition">
                  <Users size={32} />
                </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">I'm a Homeowner</h3>
              
              <p className="text-gray-600 mb-6">
                Find verified contractors for your home projects. Post jobs, compare bids, and build relationships with trusted professionals.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                  <span>Post unlimited projects</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                  <span>Get multiple contractor bids</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                  <span>Compare quotes & ratings</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                  <span>Direct messaging & contracts</span>
                </div>
              </div>

                <div className="flex items-center gap-2 text-navy-500 font-semibold group-hover:gap-3 transition-all">
                  <span>Get Started</span>
                  <ArrowRight size={20} />
                </div>
              </div>
            </Link>

            {/* Contractor Card */}
            <Link 
              href="/signup?role=contractor"
              className="group bg-gradient-to-br from-white to-teal-50 rounded-2xl border-2 border-gray-200 hover:border-teal-500 hover:shadow-xl transition-all duration-300 p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-100/50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition"></div>
              <div className="relative z-10">
                <div className="text-5xl mb-4">🔨</div>
                <div className="p-4 rounded-lg bg-teal-500/10 text-teal-500 w-fit mb-6 group-hover:bg-teal-500 group-hover:text-white transition">
                  <Zap size={32} />
                </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">I'm a Contractor</h3>
              
              <p className="text-gray-600 mb-6">
                Grow your business by connecting with quality leads. Find projects, submit bids, manage your reputation, and track earnings.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                  <span>Browse available projects</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                  <span>Submit competitive bids</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                  <span>Build your professional profile</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                  <span>Grow your 5-star reputation</span>
                </div>
              </div>

                <div className="flex items-center gap-2 text-teal-500 font-semibold group-hover:gap-3 transition-all">
                  <span>Get Started</span>
                  <ArrowRight size={20} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <section id="about" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About EZLY</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Built by teams who were tired of juggling spreadsheets, lost emails, and missed opportunities. We created EZLY to make contractor management simple, beautiful, and powerful.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: '500+',
                label: 'Verified Contractors',
                desc: 'Pre-screened professionals across all trades'
              },
              {
                number: '10,000+',
                label: 'Connections Made',
                desc: 'Real relationships that turn into real business'
              },
              {
                number: '24/7',
                label: 'Support & Updates',
                desc: 'We\'re here to help you succeed'
              }
            ].map((stat, i) => (
              <div key={i} className="text-center p-8 rounded-xl bg-white border border-gray-200 hover:border-navy-500/30 hover:shadow-lg transition">
                <p className="text-4xl font-bold text-navy-500 mb-2">{stat.number}</p>
                <p className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</p>
                <p className="text-gray-600">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR SOLUTION */}
      <section id="solution" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Solution</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage contractors, run campaigns, and close deals faster.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              {[
                {
                  icon: Users,
                  title: 'Smart Contractor Database',
                  desc: 'Access 500+ verified contractors with complete profiles, ratings, and contact info'
                },
                {
                  icon: Mail,
                  title: 'Powerful Campaigns',
                  desc: 'Create, launch, and track campaigns with real-time analytics and open rates'
                },
                {
                  icon: MessageCircle,
                  title: 'Direct Messaging',
                  desc: 'Communicate instantly with contractors and build real relationships'
                },
                {
                  icon: BarChart3,
                  title: 'Real-Time Analytics',
                  desc: 'Track every interaction and measure ROI on your outreach efforts'
                }
              ].map((feature, i) => (
                <div key={i} className="flex gap-4">
                  <div className="p-3 rounded-lg bg-navy-500/10 text-navy-500 flex-shrink-0 h-fit">
                    <feature.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-navy-500/5 to-teal-500/5 rounded-2xl p-12 border border-navy-500/10">
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-600 mb-2">Average Time Saved</p>
                  <p className="text-3xl font-bold text-gray-900">10+ hours/week</p>
                </div>
                <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-600 mb-2">Success Rate</p>
                  <p className="text-3xl font-bold text-gray-900">3x Higher</p>
                </div>
                <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-600 mb-2">Response Time</p>
                  <p className="text-3xl font-bold text-gray-900">50% Faster</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              'Verified contractor profiles',
              'Email campaign tracking',
              'Real-time messaging',
              'Advanced analytics',
              'One-click outreach',
              'Performance reports',
              'Integration ready',
              'Mobile responsive',
              'Team collaboration'
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-navy-500/30 hover:bg-navy-500/5 transition">
                <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                <span className="text-gray-900 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT US */}
      <section id="contact" className="py-24 bg-gradient-to-b from-white to-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left side */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-xl text-gray-600 mb-8">
                Have questions? Our team is here to help you get started with EZLY.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Mail, label: 'Email', value: 'hello@ezly.co', href: 'mailto:hello@ezly.co' },
                  { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
                  { icon: MapPin, label: 'Address', value: '123 Main St, San Francisco, CA 94105', href: '#' }
                ].map((contact, i) => (
                  <a key={i} href={contact.href} className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-navy-500/30 hover:bg-navy-500/5 transition">
                    <div className="p-3 rounded-lg bg-navy-500/10 text-navy-500">
                      <contact.icon size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{contact.label}</p>
                      <p className="font-semibold text-gray-900">{contact.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Right side - Contact Form */}
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Company</label>
                  <input
                    type="text"
                    placeholder="Your company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
                  <textarea
                    placeholder="Tell us how we can help..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-navy-500 text-white rounded-lg font-semibold hover:bg-opacity-90 transition shadow-sm hover:shadow-md"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-navy-500 to-teal-500 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to transform your contractor network?</h2>
          <p className="text-xl text-white/80 mb-8">Join teams already using EZLY to scale faster and smarter.</p>
          <Link 
            href="/signup"
            className="inline-block px-8 py-4 bg-white text-navy-500 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg"
          >
            Start Your Free Trial Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>&copy; 2026 EZLY. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </footer>
    </div>
  )
}
