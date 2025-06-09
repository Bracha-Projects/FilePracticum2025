import type React from "react"
import LayoutWrapper from "@/components/LayoutWrapper"

const PrivacyPage: React.FC = () => {
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
              Privacy
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-[#4B6982] leading-tight tracking-tight animate-fade-in">
              Privacy <span className="text-[#A8EBC7]">Policy</span>
            </h1>
            <p className="text-xl text-[#4B6982]/80 animate-slide-up">
              Your privacy and data security are our top priorities
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto glass p-8 md:p-12 rounded-xl border-2 border-[#A8EBC7]/30 shadow-lg mb-16">
          <div className="prose prose-lg max-w-none">
            <p className="text-[#4B6982]/70 mb-6">
              <strong>Last updated:</strong> December 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#4B6982] mb-4">1. Information We Collect</h2>
              <p className="text-[#4B6982]/80 mb-4">
                We collect information you provide directly to us, such as when you create an account, upload files, or
                contact us for support. This may include:
              </p>
              <ul className="list-disc list-inside text-[#4B6982]/80 mb-4 space-y-2">
                <li>Account information (name, email address, password)</li>
                <li>Files and content you upload to our service</li>
                <li>Usage data and analytics</li>
                <li>Communication preferences</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#4B6982] mb-4">2. How We Use Your Information</h2>
              <p className="text-[#4B6982]/80 mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-[#4B6982]/80 mb-4 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process and complete transactions</li>
                <li>Send you technical notices and support messages</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Protect against fraud and abuse</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#4B6982] mb-4">3. AI Processing and File Analysis</h2>
              <p className="text-[#4B6982]/80 mb-4">
                Our AI systems analyze your files to provide automatic tagging and organization features. This
                processing is done securely and your file content is never shared with third parties. The AI analysis
                helps improve the accuracy of our tagging system while maintaining your privacy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#4B6982] mb-4">4. Data Security</h2>
              <p className="text-[#4B6982]/80 mb-4">
                We implement appropriate technical and organizational measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction. This includes:
              </p>
              <ul className="list-disc list-inside text-[#4B6982]/80 mb-4 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and assessments</li>
                <li>Access controls and authentication measures</li>
                <li>Secure data centers with physical security</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#4B6982] mb-4">5. Data Sharing and Disclosure</h2>
              <p className="text-[#4B6982]/80 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties. We may share
                your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-[#4B6982]/80 mb-4 space-y-2">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and prevent fraud</li>
                <li>With service providers who assist in our operations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#4B6982] mb-4">6. Your Rights and Choices</h2>
              <p className="text-[#4B6982]/80 mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-[#4B6982]/80 mb-4 space-y-2">
                <li>Access and update your personal information</li>
                <li>Delete your account and associated data</li>
                <li>Export your data in a portable format</li>
                <li>Opt out of certain communications</li>
                <li>Request correction of inaccurate information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#4B6982] mb-4">7. Data Retention</h2>
              <p className="text-[#4B6982]/80 mb-4">
                We retain your information for as long as your account is active or as needed to provide you services.
                We will delete your personal information when you request account deletion, subject to legal
                requirements for data retention.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#4B6982] mb-4">8. International Data Transfers</h2>
              <p className="text-[#4B6982]/80 mb-4">
                Your information may be transferred to and processed in countries other than your own. We ensure that
                such transfers comply with applicable data protection laws and implement appropriate safeguards.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#4B6982] mb-4">9. Changes to This Policy</h2>
              <p className="text-[#4B6982]/80 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#4B6982] mb-4">10. Contact Us</h2>
              <p className="text-[#4B6982]/80 mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-[#4B6982]/80">
                Email: privacy@tagit.com
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

export default PrivacyPage
