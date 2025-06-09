import type React from "react"
import LayoutWrapper from "@/components/LayoutWrapper"

const TermsPage: React.FC = () => {
  return (
    <LayoutWrapper>
      <div className="page-container">
        <section className="flex flex-col items-center justify-center text-center py-20 px-4 md:py-28 relative overflow-hidden">
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#A8EBC7]/30 rounded-full blur-3xl opacity-70 animate-pulse-slow" />
          <div
            className="absolute bottom-1/3 right-10 w-72 h-72 bg-[#4B6982]/20 rounded-full blur-3xl opacity-70 animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          />

          <div className="space-y-6 max-w-3xl mx-auto relative z-10">
            <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-[#A8EBC7]/40 text-[#4B6982] border border-[#A8EBC7]/60">
              Legal
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-[#4B6982] leading-tight tracking-tight animate-fade-in">
              Terms of <span className="text-[#A8EBC7]">Service</span>
            </h1>
            <p className="text-xl text-[#4B6982]/80 animate-slide-up">
              Please read these terms carefully before using Tag-it
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto glass p-8 md:p-12 rounded-xl border-2 border-[#A8EBC7]/30 shadow-lg mb-16">
          <div className="prose prose-lg max-w-none">
            <p className="text-[#4B6982]/70 mb-6">
              <strong>Last updated:</strong> December 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#4B6982] mb-4">1. Acceptance of Terms</h2>
              <p className="text-[#4B6982]/80 mb-4">
                By accessing and using Tag-it ("the Service"), you accept and agree to be bound by the terms and
                provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#4B6982] mb-4">2. Description of Service</h2>
              <p className="text-[#4B6982]/80 mb-4">
                Tag-it is an AI-powered file management and organization service that helps users automatically tag,
                organize, and search their digital files. The service includes file storage, AI-powered tagging, search
                functionality, and file sharing capabilities.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#4B6982] mb-4">3. User Accounts</h2>
              <p className="text-[#4B6982]/80 mb-4">
                To use certain features of the Service, you must register for an account. You are responsible for
                maintaining the confidentiality of your account credentials and for all activities that occur under your
                account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#4B6982] mb-4">4. Privacy and Data Protection</h2>
              <p className="text-[#4B6982]/80 mb-4">
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your
                information when you use our Service. By using our Service, you agree to the collection and use of
                information in accordance with our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#4B6982] mb-4">5. Acceptable Use</h2>
              <p className="text-[#4B6982]/80 mb-4">You agree not to use the Service to:</p>
              <ul className="list-disc list-inside text-[#4B6982]/80 mb-4 space-y-2">
                <li>Upload, store, or share illegal, harmful, or offensive content</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on the intellectual property rights of others</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Distribute malware or other malicious software</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#4B6982] mb-4">6. Intellectual Property</h2>
              <p className="text-[#4B6982]/80 mb-4">
                The Service and its original content, features, and functionality are and will remain the exclusive
                property of Tag-it and its licensors. The Service is protected by copyright, trademark, and other laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#4B6982] mb-4">7. Limitation of Liability</h2>
              <p className="text-[#4B6982]/80 mb-4">
                In no event shall Tag-it, nor its directors, employees, partners, agents, suppliers, or affiliates, be
                liable for any indirect, incidental, special, consequential, or punitive damages, including without
                limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#4B6982] mb-4">8. Changes to Terms</h2>
              <p className="text-[#4B6982]/80 mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                revision is material, we will try to provide at least 30 days notice prior to any new terms taking
                effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#4B6982] mb-4">9. Contact Information</h2>
              <p className="text-[#4B6982]/80 mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-[#4B6982]/80">
                Email: legal@tagit.com
                <br />
                Address: 123 Innovation Drive, Tech Valley, CA 94000
              </p>
            </section>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}

export default TermsPage
