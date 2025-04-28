"use client"

import React from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Upload, Tag, Search, BarChart3, FolderSymlink, Shield } from "lucide-react"
import LayoutWrapper from "@/components/LayoutWrapper"
import Logo from "@/components/Logo"

const LandingPage = () => {
  const featuresRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    // Immediately make feature cards visible instead of waiting for intersection
    const elements = document.querySelectorAll(".feature-card")
    elements.forEach((el) => {
      el.classList.add("animate-fade-in")
    })
  }, [])

  return (
    <LayoutWrapper>
      {/* Hero Section */}
      <section className="relative py-20 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4B6982]/20 to-[#A8EBC7]/20 opacity-20 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6 animate-fade-in">
              <Logo size="lg" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-[#4B6982] leading-tight tracking-tight mb-6 animate-fade-in">
              Intelligent File Management with
              <span className="text-[#A8EBC7]"> AI-Powered Tagging</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#4B6982]/80 mb-8 animate-slide-up">
              Transform your document organization with automatic content recognition and smart tagging
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in">
              <Link to="/register">
                <button className="px-8 py-4 bg-[#A8EBC7] text-[#4B6982] hover:bg-[#A8EBC7]/90 text-lg font-bold rounded-lg shadow-lg border-2 border-[#A8EBC7] transition-all hover:shadow-xl hover:-translate-y-1">
                  Get Started <ArrowRight className="ml-2 h-5 w-5 inline" />
                </button>
              </Link>
              <Link to="/about">
                <button className="px-8 py-4 bg-[#4B6982] text-white hover:bg-[#4B6982]/90 text-lg font-bold rounded-lg shadow-lg border-2 border-[#4B6982] transition-all hover:shadow-xl hover:-translate-y-1">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Abstract shapes */}
        <div className="absolute top-1/4 left-10 w-48 h-48 bg-[#A8EBC7]/40 rounded-full blur-3xl opacity-70 animate-pulse-slow" />
        <div
          className="absolute bottom-1/3 right-10 w-48 h-48 bg-[#4B6982]/30 rounded-full blur-3xl opacity-70 animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />
      </section>

      {/* Features Section - Fixed visibility issue by removing opacity-0 */}
      <section className="py-16 bg-gradient-to-b from-white to-[#A8EBC7]/10" ref={featuresRef}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#4B6982] mb-4">Revolutionize Your File Management</h2>
            <p className="text-xl text-[#4B6982]/80">
              Tag-it uses advanced AI to automatically analyze and organize your files, saving you time and increasing
              productivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="feature-card bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#A8EBC7]">
              <div className="p-4 bg-[#A8EBC7]/30 rounded-lg inline-block mb-4">
                <Upload className="h-8 w-8 text-[#4B6982]" />
              </div>
              <h3 className="text-xl font-semibold text-[#4B6982] mb-2">Automatic File Upload</h3>
              <p className="text-[#4B6982]/80">
                Easily upload files of any type including PDFs, images, and documents to our secure platform with our
                intuitive drag-and-drop interface.
              </p>
            </div>

            <div className="feature-card bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#A8EBC7]">
              <div className="p-4 bg-[#A8EBC7]/30 rounded-lg inline-block mb-4">
                <Tag className="h-8 w-8 text-[#4B6982]" />
              </div>
              <h3 className="text-xl font-semibold text-[#4B6982] mb-2">AI-Powered Tagging</h3>
              <p className="text-[#4B6982]/80">
                Our smart system uses NLP to analyze content and automatically assign relevant tags, categorizing files
                without manual effort.
              </p>
            </div>

            <div className="feature-card bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#A8EBC7]">
              <div className="p-4 bg-[#A8EBC7]/30 rounded-lg inline-block mb-4">
                <Search className="h-8 w-8 text-[#4B6982]" />
              </div>
              <h3 className="text-xl font-semibold text-[#4B6982] mb-2">Advanced Search</h3>
              <p className="text-[#4B6982]/80">
                Find any file instantly with our powerful search capabilities that look through tags, content, and
                metadata across your entire library.
              </p>
            </div>

            <div className="feature-card bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#A8EBC7]">
              <div className="p-4 bg-[#A8EBC7]/30 rounded-lg inline-block mb-4">
                <FolderSymlink className="h-8 w-8 text-[#4B6982]" />
              </div>
              <h3 className="text-xl font-semibold text-[#4B6982] mb-2">Smart Organization</h3>
              <p className="text-[#4B6982]/80">
                Automatically organize files into logical folders based on content type, creating a structured system
                without manual sorting.
              </p>
            </div>

            <div className="feature-card bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#A8EBC7]">
              <div className="p-4 bg-[#A8EBC7]/30 rounded-lg inline-block mb-4">
                <Shield className="h-8 w-8 text-[#4B6982]" />
              </div>
              <h3 className="text-xl font-semibold text-[#4B6982] mb-2">Secure Storage</h3>
              <p className="text-[#4B6982]/80">
                Your documents are protected with enterprise-grade encryption and security measures ensuring your
                sensitive information stays private.
              </p>
            </div>

            <div className="feature-card bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#A8EBC7]">
              <div className="p-4 bg-[#A8EBC7]/30 rounded-lg inline-block mb-4">
                <BarChart3 className="h-8 w-8 text-[#4B6982]" />
              </div>
              <h3 className="text-xl font-semibold text-[#4B6982] mb-2">Insightful Analytics</h3>
              <p className="text-[#4B6982]/80">
                Gain valuable insights into your file usage, popular tags, and content trends with comprehensive
                analytics dashboards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the page remains the same */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4B6982]/10 to-[#A8EBC7]/10 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl text-center border-2 border-[#A8EBC7]">
              <h2 className="text-3xl md:text-4xl font-bold text-[#4B6982] mb-4">
                Ready to transform your file management?
              </h2>
              <p className="text-xl text-[#4B6982]/80 mb-6">
                Join organizations that are saving hours every week with Tag-it's intelligent file system.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/register">
                  <button className="px-8 py-4 bg-[#A8EBC7] text-[#4B6982] hover:bg-[#A8EBC7]/90 text-lg font-bold rounded-lg shadow-lg border-2 border-[#A8EBC7] transition-all hover:shadow-xl hover:-translate-y-1">
                    Start for Free
                  </button>
                </Link>
                <Link to="/about">
                  <button className="px-8 py-4 bg-[#4B6982] text-white hover:bg-[#4B6982]/90 text-lg font-bold rounded-lg shadow-lg border-2 border-[#4B6982] transition-all hover:shadow-xl hover:-translate-y-1">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#A8EBC7]/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#4B6982] mb-4">Trusted by Business Leaders</h2>
            <p className="text-xl text-[#4B6982]/80">
              See how Tag-it is transforming document management for organizations around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#A8EBC7]">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#A8EBC7] rounded-full flex items-center justify-center text-[#4B6982] font-semibold">
                    JM
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-[#4B6982]">Jennifer Miller</h4>
                  <p className="text-sm text-[#4B6982]/80">Marketing Director, TechCorp</p>
                </div>
              </div>
              <p className="text-[#4B6982]/80">
                "Tag-it has revolutionized how we organize our marketing assets. The AI tagging is incredibly accurate
                and has saved our team countless hours of manual organization."
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#A8EBC7]">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#A8EBC7] rounded-full flex items-center justify-center text-[#4B6982] font-semibold">
                    RS
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-[#4B6982]">Robert Smith</h4>
                  <p className="text-sm text-[#4B6982]/80">CFO, Global Finance Inc.</p>
                </div>
              </div>
              <p className="text-[#4B6982]/80">
                "As a financial services company, we deal with thousands of documents. Tag-it's automatic categorization
                has improved our workflow efficiency by over 40%."
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#A8EBC7]">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#A8EBC7] rounded-full flex items-center justify-center text-[#4B6982] font-semibold">
                    AP
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-[#4B6982]">Anna Peterson</h4>
                  <p className="text-sm text-[#4B6982]/80">Legal Counsel, LawPro Services</p>
                </div>
              </div>
              <p className="text-[#4B6982]/80">
                "The search functionality in Tag-it is exceptional. We can find specific clauses in contracts instantly,
                which has been a game-changer for our legal team."
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-[#4B6982] to-[#3a5269]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Ready to get started with Tag-it?</h3>
              <p className="text-[#A8EBC7] font-medium">Sign up today and transform your file management experience.</p>
            </div>
            <Link to="/register" className="mt-4 md:mt-0">
              <button className="px-6 py-3 bg-[#A8EBC7] text-[#4B6982] hover:bg-[#A8EBC7]/90 text-lg font-bold rounded-lg shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 border-2 border-[#A8EBC7]">
                Register Now
              </button>
            </Link>
          </div>
        </div>
      </section>
    </LayoutWrapper>
  )
}

export default LandingPage
