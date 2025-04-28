"use client"

import { Construction, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import LayoutWrapper from "@/components/LayoutWrapper"
import { Button } from "@/components/ui/button"
import Logo from "@/components/Logo"

const UnderConstructionPage = () => {
  return (
    <LayoutWrapper>
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>

          <div className="glass p-8 rounded-xl shadow-elevation animate-scale-in border-2 border-[#A8EBC7]/30 mt-8">
            <div className="bg-[#A8EBC7]/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Construction className="h-10 w-10 text-[#4B6982]" />
            </div>

            <h1 className="text-2xl font-bold text-[#4B6982] mb-4">Page Under Construction</h1>
            <p className="text-[#4B6982]/80 mb-8">
              We're currently working on this page. Please check back soon for updates!
            </p>

            <Link to="/">
              <Button className="bg-[#A8EBC7] text-[#4B6982] hover:bg-[#A8EBC7]/90 font-bold">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}

export default UnderConstructionPage
