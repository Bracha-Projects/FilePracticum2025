import React from 'react';
import { Workflow, FileBadge, BarChart4, Newspaper, FileSearch } from 'lucide-react';
import LayoutWrapper from '@/components/LayoutWrapper';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <LayoutWrapper>
      <div className="page-container">
        <section className="flex flex-col items-center justify-center text-center py-20 px-4 md:py-28">
          <div className="space-y-6 max-w-3xl mx-auto">
            <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-tagit-mint/30 text-tagit-darkblue">
              About Tag-it
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-tagit-darkblue leading-tight tracking-tight animate-fade-in">
              Intelligent file management with automatic tagging
            </h1>
            <p className="text-xl text-tagit-blue animate-slide-up">
              Revolutionize your file organization with AI-powered tagging and smart categorization
            </p>
          </div>
          
          {/* <div className="mt-12 flex flex-col items-center animate-fade-in">
            <div className="w-24 h-24 relative bg-tagit-mint/10 rounded-2xl flex items-center justify-center">
              <img
                src="../../public/logo.png"
                alt="Tag-it Logo"
                className="w-16 h-16 object-contain"
              />
            </div>
          </div> */}
        </section>
        
        <section className="py-16 md:py-24 bg-tagit-mint/5 rounded-3xl my-12">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-tagit-darkblue mb-6">Our Mission</h2>
              <p className="text-xl text-tagit-blue max-w-3xl mx-auto">
                We're building an intelligent file management system that eliminates manual tagging and organization, saving businesses countless hours and increasing productivity.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <div className="glass p-8 rounded-xl animate-slide-in">
                <h3 className="text-xl font-semibold text-tagit-darkblue mb-4">The Problem</h3>
                <p className="text-tagit-blue mb-6">
                  Businesses struggle with managing thousands of files across different platforms and formats. Manual tagging is time-consuming, inconsistent, and often neglected, making it difficult to find and utilize crucial information when needed.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="h-5 w-5 rounded-full bg-tagit-mint/30 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs text-tagit-darkblue">✓</span>
                    </span>
                    <span className="text-tagit-blue">Time wasted searching for files</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 rounded-full bg-tagit-mint/30 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs text-tagit-darkblue">✓</span>
                    </span>
                    <span className="text-tagit-blue">Inconsistent manual tagging</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 rounded-full bg-tagit-mint/30 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs text-tagit-darkblue">✓</span>
                    </span>
                    <span className="text-tagit-blue">Duplicate files and version confusion</span>
                  </li>
                </ul>
              </div>
              
              <div className="glass p-8 rounded-xl animate-slide-in" style={{ animationDelay: '150ms' }}>
                <h3 className="text-xl font-semibold text-tagit-darkblue mb-4">Our Solution</h3>
                <p className="text-tagit-blue mb-6">
                  Tag-it uses advanced NLP and AI to automatically analyze and tag files as they're uploaded. Our system understands document content, identifies key information, and applies relevant tags for effortless organization and retrieval.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="h-5 w-5 rounded-full bg-tagit-mint/30 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs text-tagit-darkblue">✓</span>
                    </span>
                    <span className="text-tagit-blue">Automatic content recognition</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 rounded-full bg-tagit-mint/30 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs text-tagit-darkblue">✓</span>
                    </span>
                    <span className="text-tagit-blue">Intelligent tag suggestions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 rounded-full bg-tagit-mint/30 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs text-tagit-darkblue">✓</span>
                    </span>
                    <span className="text-tagit-blue">Powerful search across all content</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-tagit-darkblue mb-6">Key Features</h2>
              <p className="text-xl text-tagit-blue max-w-3xl mx-auto">
                Our platform combines cutting-edge AI with intuitive design to transform how businesses manage their files.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-dark p-8 rounded-xl text-white animate-fade-in">
                <div className="mb-6 inline-block p-3 bg-white/10 rounded-lg">
                  <FileBadge className="h-6 w-6 text-tagit-mint" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Automatic Tagging</h3>
                <p className="text-white/80">
                  Our AI engine analyzes documents, images, and files to apply relevant tags automatically, eliminating manual work.
                </p>
              </div>
              <div className="glass-dark p-8 rounded-xl text-white animate-fade-in" style={{ animationDelay: '150ms' }}>
                <div className="mb-6 inline-block p-3 bg-white/10 rounded-lg">
                  <FileSearch className="h-6 w-6 text-tagit-mint" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Search</h3>
                <p className="text-white/80">
                  Find files instantly with our powerful search that looks through tags, content, and metadata across your entire library.
                </p>
              </div>
              
              <div className="glass-dark p-8 rounded-xl text-white animate-fade-in" style={{ animationDelay: '300ms' }}>
                <div className="mb-6 inline-block p-3 bg-white/10 rounded-lg">
                  <Workflow className="h-6 w-6 text-tagit-mint" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Tag Editing</h3>
                <p className="text-white/80">
                  Easily review, modify, or add tags manually when needed, giving you full control over your organization system.
                </p>
              </div>
              
              <div className="glass-dark p-8 rounded-xl text-white animate-fade-in" style={{ animationDelay: '150ms' }}>
                <div className="mb-6 inline-block p-3 bg-white/10 rounded-lg">
                  <Newspaper className="h-6 w-6 text-tagit-mint" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Document Analysis</h3>
                <p className="text-white/80">
                  Extract key information from documents like contracts, invoices, and reports for better categorization.
                </p>
              </div>
              
              <div className="glass-dark p-8 rounded-xl text-white animate-fade-in" style={{ animationDelay: '300ms' }}>
                <div className="mb-6 inline-block p-3 bg-white/10 rounded-lg">
                  <BarChart4 className="h-6 w-6 text-tagit-mint" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Analytics</h3>
                <p className="text-white/80">
                  Gain insights into your file usage, popular tags, and content trends with comprehensive analytics.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24 bg-gradient-to-br from-tagit-blue to-tagit-darkblue rounded-3xl my-12 text-white">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to transform your file management?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Join organizations that are saving hours every week with Tag-it's intelligent file system.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button className="px-8 py-6 bg-tagit-mint text-tagit-darkblue hover:bg-tagit-lightmint hover:text-tagit-darkblue text-base">
                  Get Started for Free
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="px-8 py-6 border-white text-white hover:bg-white/10 text-base">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </LayoutWrapper>
  );
};

export default AboutPage;