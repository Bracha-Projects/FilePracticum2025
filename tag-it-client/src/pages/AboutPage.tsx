import { Workflow, Lock, Users, CheckCircle, ArrowRight, FileText, Tag, Search } from "lucide-react"
import LayoutWrapper from "@/components/LayoutWrapper"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import Logo from "@/components/Logo"

const AboutPage = () => {
  return (
    <LayoutWrapper>
      <div className="page-container">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[#4B6982]/5 z-0"></div>
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#A8EBC7]/30 rounded-full blur-3xl opacity-70 animate-pulse-slow" />
          <div
            className="absolute bottom-1/3 right-10 w-72 h-72 bg-[#4B6982]/20 rounded-full blur-3xl opacity-70 animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          />

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 space-y-6">
                <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-[#A8EBC7]/40 text-[#4B6982] border border-[#A8EBC7]/60">
                  About Tag-it
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-[#4B6982] leading-tight">
                  We're on a mission to <span className="text-[#A8EBC7]">simplify document management</span>
                </h1>
                <p className="text-xl text-[#4B6982]/80">
                  Tag-it was founded to solve a universal problem: the chaos of document organization. Our AI-powered
                  platform automatically tags, categorizes, and organizes your files so you can focus on what matters.
                </p>
                <div className="pt-4">
                  <Link to="/register">
                    <Button className="px-8 py-6 bg-[#4B6982] text-white hover:bg-[#3a5269] text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300">
                      Join Our Community
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute -top-6 -right-6 w-full h-full rounded-3xl border-2 border-[#A8EBC7]/60 rotate-6"></div>
                  <div className="absolute -bottom-6 -left-6 w-full h-full rounded-3xl border-2 border-[#4B6982]/60 -rotate-6"></div>
                  <div className="relative aspect-square rounded-3xl bg-white p-8 shadow-xl border border-[#A8EBC7]/30 flex items-center justify-center">
                    <Logo size="lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                <div className="relative">
                  <div className="aspect-video rounded-3xl bg-gradient-to-br from-[#4B6982] to-[#3a5269] shadow-xl overflow-hidden p-8 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-6 w-full">
                      <div className="space-y-4">
                        <div className="h-8 w-3/4 bg-white/20 rounded-md"></div>
                        <div className="h-8 w-full bg-white/20 rounded-md"></div>
                        <div className="h-8 w-2/3 bg-white/20 rounded-md"></div>
                      </div>
                      <div className="space-y-4">
                        <div className="h-8 w-full bg-white/20 rounded-md"></div>
                        <div className="h-8 w-2/3 bg-white/20 rounded-md"></div>
                        <div className="h-8 w-3/4 bg-white/20 rounded-md"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 order-1 md:order-2">
                <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-[#A8EBC7]/40 text-[#4B6982] border border-[#A8EBC7]/60">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#4B6982] leading-tight">
                  From frustration to innovation
                </h2>
                <p className="text-lg text-[#4B6982]/80">
                  Tag-it was born out of frustration. Our founders, who worked in document-heavy industries, were tired
                  of wasting countless hours searching for files, manually tagging documents, and dealing with
                  inconsistent organization systems.
                </p>
                <p className="text-lg text-[#4B6982]/80">
                  In 2020, they assembled a team of AI specialists and document management experts to create a solution
                  that would automate the entire process. After two years of development and testing, Tag-it was
                  launched to help businesses reclaim their time and organize their documents effortlessly.
                </p>
                <div className="pt-4">
                  <Link to="/about#values">
                    <Button
                      variant="outline"
                      className="group px-6 py-2 border-2 border-[#4B6982] text-[#4B6982] hover:bg-[#4B6982]/10"
                    >
                      Our Values <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section
          id="values"
          className="py-20 bg-gradient-to-br from-[#A8EBC7]/10 to-[#A8EBC7]/20 rounded-3xl my-12 border border-[#A8EBC7]/30"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-[#A8EBC7]/40 text-[#4B6982] border border-[#A8EBC7]/60 mb-4">
                Our Values
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#4B6982] mb-4">What drives us</h2>
              <p className="text-xl text-[#4B6982]/80 max-w-3xl mx-auto">
                These core principles guide everything we do at Tag-it.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-[#A8EBC7]/30 hover:border-[#A8EBC7]/60 transition-all duration-300 hover:shadow-xl">
                <div className="w-14 h-14 rounded-full bg-[#A8EBC7]/20 flex items-center justify-center mb-6">
                  <Users className="h-7 w-7 text-[#4B6982]" />
                </div>
                <h3 className="text-xl font-bold text-[#4B6982] mb-4">User-Centered Design</h3>
                <p className="text-[#4B6982]/80">
                  We believe technology should adapt to humans, not the other way around. Every feature is designed with
                  our users' needs at the forefront.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-[#A8EBC7]/30 hover:border-[#A8EBC7]/60 transition-all duration-300 hover:shadow-xl">
                <div className="w-14 h-14 rounded-full bg-[#A8EBC7]/20 flex items-center justify-center mb-6">
                  <Lock className="h-7 w-7 text-[#4B6982]" />
                </div>
                <h3 className="text-xl font-bold text-[#4B6982] mb-4">Security First</h3>
                <p className="text-[#4B6982]/80">
                  We treat your documents with the utmost care. Security isn't an afterthought—it's built into every
                  aspect of our platform.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-[#A8EBC7]/30 hover:border-[#A8EBC7]/60 transition-all duration-300 hover:shadow-xl">
                <div className="w-14 h-14 rounded-full bg-[#A8EBC7]/20 flex items-center justify-center mb-6">
                  <Workflow className="h-7 w-7 text-[#4B6982]" />
                </div>
                <h3 className="text-xl font-bold text-[#4B6982] mb-4">Continuous Improvement</h3>
                <p className="text-[#4B6982]/80">
                  We're never satisfied with the status quo. Our team is constantly innovating and refining our
                  technology to deliver better results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-[#A8EBC7]/40 text-[#4B6982] border border-[#A8EBC7]/60 mb-4">
                Our Solution
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#4B6982] mb-4">How Tag-it works</h2>
              <p className="text-xl text-[#4B6982]/80 max-w-3xl mx-auto">
                Our platform combines cutting-edge AI with intuitive design to transform document management.
              </p>
            </div>

            <div className="space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#4B6982] text-white text-xl font-bold">
                    1
                  </div>
                  <h3 className="text-2xl font-bold text-[#4B6982]">Intelligent Upload</h3>
                  <p className="text-lg text-[#4B6982]/80">
                    Simply upload your documents to Tag-it. Our AI immediately begins analyzing the content, structure,
                    and metadata.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#A8EBC7] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[#4B6982]">Supports all major file formats</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#A8EBC7] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[#4B6982]">Bulk upload capabilities</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#A8EBC7] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[#4B6982]">Drag-and-drop interface</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-[#4B6982]/5 p-8 rounded-3xl border border-[#A8EBC7]/30">
                  <div className="aspect-video rounded-xl bg-white shadow-lg p-6">
                    <div className="flex flex-col h-full justify-center items-center">
                      <FileText className="h-16 w-16 text-[#4B6982] mb-4" />
                      <div className="w-full h-4 bg-[#A8EBC7]/30 rounded-full mb-3"></div>
                      <div className="w-3/4 h-4 bg-[#A8EBC7]/30 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="bg-[#4B6982]/5 p-8 rounded-3xl border border-[#A8EBC7]/30 order-2 md:order-1">
                  <div className="aspect-video rounded-xl bg-white shadow-lg p-6">
                    <div className="flex flex-col h-full justify-center items-center">
                      <Tag className="h-16 w-16 text-[#4B6982] mb-4" />
                      <div className="flex flex-wrap gap-2 justify-center">
                        <span className="px-3 py-1 bg-[#A8EBC7]/30 rounded-full text-[#4B6982] text-sm">Invoice</span>
                        <span className="px-3 py-1 bg-[#A8EBC7]/30 rounded-full text-[#4B6982] text-sm">Finance</span>
                        <span className="px-3 py-1 bg-[#A8EBC7]/30 rounded-full text-[#4B6982] text-sm">2023</span>
                        <span className="px-3 py-1 bg-[#A8EBC7]/30 rounded-full text-[#4B6982] text-sm">Q2</span>
                        <span className="px-3 py-1 bg-[#A8EBC7]/30 rounded-full text-[#4B6982] text-sm">Approved</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6 order-1 md:order-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#4B6982] text-white text-xl font-bold">
                    2
                  </div>
                  <h3 className="text-2xl font-bold text-[#4B6982]">Automatic Tagging</h3>
                  <p className="text-lg text-[#4B6982]/80">
                    Our AI analyzes your documents and automatically applies relevant tags based on content, context,
                    and document type.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#A8EBC7] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[#4B6982]">Content-aware tagging</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#A8EBC7] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[#4B6982]">Custom tag suggestions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#A8EBC7] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[#4B6982]">Consistent organization</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#4B6982] text-white text-xl font-bold">
                    3
                  </div>
                  <h3 className="text-2xl font-bold text-[#4B6982]">Powerful Search & Retrieval</h3>
                  <p className="text-lg text-[#4B6982]/80">
                    Find exactly what you need in seconds with our advanced search capabilities that understand natural
                    language queries.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#A8EBC7] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[#4B6982]">Full-text search</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#A8EBC7] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[#4B6982]">Tag-based filtering</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#A8EBC7] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[#4B6982]">Natural language queries</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-[#4B6982]/5 p-8 rounded-3xl border border-[#A8EBC7]/30">
                  <div className="aspect-video rounded-xl bg-white shadow-lg p-6">
                    <div className="flex flex-col h-full justify-center items-center">
                      <Search className="h-16 w-16 text-[#4B6982] mb-4" />
                      <div className="w-full h-10 bg-[#A8EBC7]/20 rounded-lg flex items-center px-4">
                        <div className="w-3/4 h-4 bg-[#4B6982]/20 rounded-full"></div>
                        <Search className="h-5 w-5 text-[#4B6982] ml-auto" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Expertise Section (Replacing Team Section) */}
        <section className="py-20 bg-gradient-to-br from-[#4B6982]/10 to-[#4B6982]/5 rounded-3xl my-12 border border-[#4B6982]/20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-[#A8EBC7]/40 text-[#4B6982] border border-[#A8EBC7]/60 mb-4">
                Our Technology
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#4B6982] mb-4">Cutting-edge AI capabilities</h2>
              <p className="text-xl text-[#4B6982]/80 max-w-3xl mx-auto">
                Tag-it leverages the latest advancements in artificial intelligence to deliver exceptional document
                management.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-[#A8EBC7]/30 hover:shadow-xl transition-all duration-300">
                <div className="h-3 bg-[#4B6982]"></div>
                <div className="p-6">
                  <div className="w-12 h-12 rounded-full bg-[#A8EBC7]/20 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-[#4B6982]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#4B6982] mb-2">Document Analysis</h3>
                  <p className="text-[#4B6982]/80">
                    Our AI can understand document structure, extract key information, and identify document types
                    automatically.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-[#A8EBC7]/30 hover:shadow-xl transition-all duration-300">
                <div className="h-3 bg-[#4B6982]"></div>
                <div className="p-6">
                  <div className="w-12 h-12 rounded-full bg-[#A8EBC7]/20 flex items-center justify-center mb-4">
                    <Tag className="h-6 w-6 text-[#4B6982]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#4B6982] mb-2">Smart Tagging</h3>
                  <p className="text-[#4B6982]/80">
                    Advanced algorithms identify relevant keywords and concepts to apply the most appropriate tags to
                    each document.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-[#A8EBC7]/30 hover:shadow-xl transition-all duration-300">
                <div className="h-3 bg-[#4B6982]"></div>
                <div className="p-6">
                  <div className="w-12 h-12 rounded-full bg-[#A8EBC7]/20 flex items-center justify-center mb-4">
                    <Search className="h-6 w-6 text-[#4B6982]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#4B6982] mb-2">Semantic Search</h3>
                  <p className="text-[#4B6982]/80">
                    Our search engine understands the meaning behind your queries, not just keywords, for more accurate
                    results.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-[#A8EBC7]/30 hover:shadow-xl transition-all duration-300">
                <div className="h-3 bg-[#4B6982]"></div>
                <div className="p-6">
                  <div className="w-12 h-12 rounded-full bg-[#A8EBC7]/20 flex items-center justify-center mb-4">
                    <Workflow className="h-6 w-6 text-[#4B6982]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#4B6982] mb-2">Learning System</h3>
                  <p className="text-[#4B6982]/80">
                    Our AI continuously improves by learning from user interactions and feedback to deliver better
                    results over time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-[#4B6982] to-[#3a5269] rounded-3xl my-12 text-white shadow-xl border border-[#A8EBC7]/30">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Join us in revolutionizing document management</h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Experience the power of AI-driven organization with Tag-it.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button className="px-8 py-6 bg-[#A8EBC7] text-[#4B6982] hover:bg-[#cff6e3] hover:text-[#4B6982] text-base font-bold border-2 border-[#A8EBC7] shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-3px]">
                  Get Started for Free
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outline"
                  className="px-8 py-6 border-2 border-white text-white hover:bg-white/10 text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-3px]"
                >
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </LayoutWrapper>
  )
}

export default AboutPage
