import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Upload, Tag, Search, BarChart3, FolderSymlink, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LayoutWrapper from '@/components/LayoutWrapper';
import Logo from '@/components/Logo';

const LandingPage = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    const elements = document.querySelectorAll('.feature-card');
    elements.forEach(el => {
      el.classList.remove('animate-fade-in');
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <LayoutWrapper>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tagit-darkblue to-tagit-blue opacity-[0.035] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6 animate-fade-in">
              <Logo size="lg" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-tagit-darkblue leading-tight tracking-tight mb-6 animate-fade-in">
              Intelligent File Management with
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-tagit-blue to-tagit-darkblue"> AI-Powered Tagging</span>
            </h1>
            <p className="text-xl md:text-2xl text-tagit-blue mb-8 animate-slide-up">
              Transform your document organization with automatic content recognition and smart tagging
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in">
              <Link to="/register">
                <Button className="px-8 py-6 bg-tagit-blue text-white hover:bg-tagit-darkblue text-lg">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="px-8 py-6 border-tagit-blue text-tagit-blue hover:bg-tagit-blue/5 text-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Abstract shapes */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-tagit-mint/10 rounded-full blur-3xl opacity-70 animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-10 w-72 h-72 bg-tagit-blue/10 rounded-full blur-3xl opacity-70 animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-secondary/30" ref={featuresRef}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-tagit-darkblue mb-6">Revolutionize Your File Management</h2>
            <p className="text-xl text-tagit-blue">
              Tag-it uses advanced AI to automatically analyze and organize your files, saving you time and increasing productivity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="feature-card glass p-8 rounded-xl shadow-elevation opacity-0">
              <div className="p-4 bg-tagit-mint/10 rounded-lg inline-block mb-6">
                <Upload className="h-8 w-8 text-tagit-blue" />
              </div>
              <h3 className="text-xl font-semibold text-tagit-darkblue mb-3">Automatic File Upload</h3>
              <p className="text-tagit-blue">
                Easily upload files of any type including PDFs, images, and documents to our secure platform with our intuitive drag-and-drop interface.
              </p>
            </div>
            
            <div className="feature-card glass p-8 rounded-xl shadow-elevation opacity-0">
              <div className="p-4 bg-tagit-mint/10 rounded-lg inline-block mb-6">
                <Tag className="h-8 w-8 text-tagit-blue" />
              </div>
              <h3 className="text-xl font-semibold text-tagit-darkblue mb-3">AI-Powered Tagging</h3>
              <p className="text-tagit-blue">
                Our smart system uses NLP to analyze content and automatically assign relevant tags, categorizing files without manual effort.
              </p>
            </div>
            
            <div className="feature-card glass p-8 rounded-xl shadow-elevation opacity-0">
              <div className="p-4 bg-tagit-mint/10 rounded-lg inline-block mb-6">
                <Search className="h-8 w-8 text-tagit-blue" />
              </div>
              <h3 className="text-xl font-semibold text-tagit-darkblue mb-3">Advanced Search</h3>
              <p className="text-tagit-blue">
                Find any file instantly with our powerful search capabilities that look through tags, content, and metadata across your entire library.
              </p>
            </div>
            
            <div className="feature-card glass p-8 rounded-xl shadow-elevation opacity-0">
              <div className="p-4 bg-tagit-mint/10 rounded-lg inline-block mb-6">
                <FolderSymlink className="h-8 w-8 text-tagit-blue" />
              </div>
              <h3 className="text-xl font-semibold text-tagit-darkblue mb-3">Smart Organization</h3>
              <p className="text-tagit-blue">
                Automatically organize files into logical folders based on content type, creating a structured system without manual sorting.
              </p>
            </div>
            
            <div className="feature-card glass p-8 rounded-xl shadow-elevation opacity-0">
              <div className="p-4 bg-tagit-mint/10 rounded-lg inline-block mb-6">
                <Shield className="h-8 w-8 text-tagit-blue" />
              </div>
              <h3 className="text-xl font-semibold text-tagit-darkblue mb-3">Secure Storage</h3>
              <p className="text-tagit-blue">
                Your documents are protected with enterprise-grade encryption and security measures ensuring your sensitive information stays private.
              </p>
            </div>
            
            <div className="feature-card glass p-8 rounded-xl shadow-elevation opacity-0">
              <div className="p-4 bg-tagit-mint/10 rounded-lg inline-block mb-6">
                <BarChart3 className="h-8 w-8 text-tagit-blue" />
              </div>
              <h3 className="text-xl font-semibold text-tagit-darkblue mb-3">Insightful Analytics</h3>
              <p className="text-tagit-blue">
                Gain valuable insights into your file usage, popular tags, and content trends with comprehensive analytics dashboards.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tagit-blue to-tagit-darkblue opacity-10 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="glass p-10 md:p-16 rounded-2xl shadow-elevation text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-tagit-darkblue mb-6">
                Ready to transform your file management?
              </h2>
              <p className="text-xl text-tagit-blue mb-8">
                Join organizations that are saving hours every week with Tag-it's intelligent file system.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/register">
                  <Button className="px-8 py-6 bg-tagit-blue text-white hover:bg-tagit-darkblue text-lg">
                    Start for Free
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" className="px-8 py-6 border-tagit-blue text-tagit-blue hover:bg-tagit-blue/5 text-lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-24 bg-tagit-blue/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-tagit-darkblue mb-6">Trusted by Business Leaders</h2>
            <p className="text-xl text-tagit-blue">
              See how Tag-it is transforming document management for organizations around the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-xl shadow-elevation">
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-tagit-mint/20 rounded-full flex items-center justify-center text-tagit-blue font-semibold">JM</div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-tagit-darkblue">Jennifer Miller</h4>
                  <p className="text-sm text-tagit-blue">Marketing Director, TechCorp</p>
                </div>
              </div>
              <p className="text-tagit-blue">
                "Tag-it has revolutionized how we organize our marketing assets. The AI tagging is incredibly accurate and has saved our team countless hours of manual organization."
              </p>
            </div>
            
            <div className="glass p-8 rounded-xl shadow-elevation">
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-tagit-mint/20 rounded-full flex items-center justify-center text-tagit-blue font-semibold">RS</div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-tagit-darkblue">Robert Smith</h4>
                  <p className="text-sm text-tagit-blue">CFO, Global Finance Inc.</p>
                </div>
              </div>
              <p className="text-tagit-blue">
                "As a financial services company, we deal with thousands of documents. Tag-it's automatic categorization has improved our workflow efficiency by over 40%."
              </p>
            </div>
            
            <div className="glass p-8 rounded-xl shadow-elevation">
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-tagit-mint/20 rounded-full flex items-center justify-center text-tagit-blue font-semibold">AP</div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-tagit-darkblue">Anna Peterson</h4>
                  <p className="text-sm text-tagit-blue">Legal Counsel, LawPro Services</p>
                </div>
              </div>
              <p className="text-tagit-blue">
                "The search functionality in Tag-it is exceptional. We can find specific clauses in contracts instantly, which has been a game-changer for our legal team."
              </p>
            </div>
          </div>
        </div>
      </section>
    </LayoutWrapper>
  );
};

export default LandingPage;