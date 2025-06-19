"use client"

import type React from "react"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import LayoutWrapper from "@/components/LayoutWrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const ContactPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you for your message! We'll get back to you soon.");
    (e.currentTarget as HTMLFormElement).reset()
  }

  return (
    <LayoutWrapper>
      <div className="page-container">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center py-20 px-4 md:py-28 relative overflow-hidden">
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#A8EBC7]/30 rounded-full blur-3xl opacity-70 animate-pulse-slow" />
          <div
            className="absolute bottom-1/3 right-10 w-72 h-72 bg-[#4B6982]/20 rounded-full blur-3xl opacity-70 animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          />

          <div className="space-y-6 max-w-3xl mx-auto relative z-10">
            <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-[#A8EBC7]/40 text-[#4B6982] border border-[#A8EBC7]/60">
              Contact Us
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-[#4B6982] leading-tight tracking-tight animate-fade-in">
              Get in touch with our <span className="text-[#A8EBC7]">support team</span>
            </h1>
            <p className="text-xl text-[#4B6982]/80 animate-slide-up">
              Have questions about Tag-it? We'd love to hear from you. Send us a message and we'll respond as soon as
              possible.
            </p>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="glass p-8 rounded-xl border-2 border-[#A8EBC7]/30 shadow-lg">
            <h2 className="text-2xl font-bold text-[#4B6982] mb-2">Send us a Message</h2>
            <p className="text-[#4B6982]/70 mb-6">Fill out the form below and we'll get back to you within 24 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-[#4B6982] mb-2">
                    First Name
                  </label>
                  <Input id="firstName" type="text" required className="border-[#A8EBC7]/30 focus:border-[#A8EBC7]" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-[#4B6982] mb-2">
                    Last Name
                  </label>
                  <Input id="lastName" type="text" required className="border-[#A8EBC7]/30 focus:border-[#A8EBC7]" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#4B6982] mb-2">
                  Email Address
                </label>
                <Input id="email" type="email" required className="border-[#A8EBC7]/30 focus:border-[#A8EBC7]" />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[#4B6982] mb-2">
                  Subject
                </label>
                <Input id="subject" type="text" required className="border-[#A8EBC7]/30 focus:border-[#A8EBC7]" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#4B6982] mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  rows={6}
                  placeholder="Tell us how we can help you..."
                  required
                  className="border-[#A8EBC7]/30 focus:border-[#A8EBC7]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#4B6982] text-white hover:bg-[#3a5269] border-2 border-[#4B6982] shadow-md font-bold"
              >
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="glass p-8 rounded-xl border-2 border-[#A8EBC7]/30 shadow-lg">
              <h2 className="text-2xl font-bold text-[#4B6982] mb-2">Get in Touch</h2>
              <p className="text-[#4B6982]/70 mb-6">We're here to help and answer any questions you might have.</p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-[#A8EBC7]/20">
                    <Mail className="h-6 w-6 text-[#4B6982]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#4B6982]">Email</h3>
                    <p className="text-[#4B6982]/70">support@tagit.com</p>
                    <p className="text-[#4B6982]/70">hello@tagit.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-[#A8EBC7]/20">
                    <Phone className="h-6 w-6 text-[#4B6982]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#4B6982]">Phone</h3>
                    <p className="text-[#4B6982]/70">+1 (555) 123-4567</p>
                    <p className="text-[#4B6982]/70">+1 (555) 987-6543</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-[#A8EBC7]/20">
                    <MapPin className="h-6 w-6 text-[#4B6982]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#4B6982]">Office</h3>
                    <p className="text-[#4B6982]/70">123 Innovation Drive</p>
                    <p className="text-[#4B6982]/70">Tech Valley, CA 94000</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-[#A8EBC7]/20">
                    <Clock className="h-6 w-6 text-[#4B6982]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#4B6982]">Business Hours</h3>
                    <p className="text-[#4B6982]/70">Sunday - Friday: 9:00 AM - 6:00 PM PST</p>
                    <p className="text-[#4B6982]/70">Saturday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-xl border-2 border-[#A8EBC7]/30 shadow-lg">
              <h3 className="text-xl font-bold text-[#4B6982] mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#4B6982]">How does AI tagging work?</h4>
                  <p className="text-[#4B6982]/70 text-sm">
                    Our AI analyzes your files' content and automatically assigns relevant tags.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#4B6982]">Is my data secure?</h4>
                  <p className="text-[#4B6982]/70 text-sm">
                    Yes, we use enterprise-grade encryption and never share your data.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#4B6982]">Can I try Tag-it for free?</h4>
                  <p className="text-[#4B6982]/70 text-sm">
                    We offer a 14-day free trial with full access to all features.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}

export default ContactPage
