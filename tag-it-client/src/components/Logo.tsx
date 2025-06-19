import type React from "react"
import { Link } from "react-router-dom"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  withText?: boolean
  className?: string
  textColor?: string 
}

const Logo: React.FC<LogoProps> = ({ size = "md", withText = true, className = "", textColor }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  }

  const textSizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  }

  const textColorClass = textColor || "text-[#4B6982]"

  return (
    <Link to="/" className={`flex items-center gap-2 group ${className}`}>
      <div className={`relative ${sizeClasses[size]} transition-transform duration-500 group-hover:rotate-[5deg]`}>
        <div className="absolute inset-0 rotate-45 border-2 border-[#A8EBC7] rounded-md"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1/4 h-1/4 rounded-full bg-[#A8EBC7]"></div>
        </div>
        <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-5 h-5 flex items-center justify-center">
            <div className="w-2/3 h-2/3 rounded-full border border-[#A8EBC7]"></div>
            <div className="absolute w-1/4 h-1/4 rounded-full bg-[#A8EBC7]"></div>
            <div className="absolute w-[1px] h-1/2 bg-[#A8EBC7] top-1/2"></div>
          </div>
        </div>
      </div>
      {withText && (
        <div className="flex flex-col">
          <span className={`font-bold ${textSizeClasses[size]} ${textColorClass} tracking-tight`}>
            Tag<span className="text-[#A8EBC7]">-</span>it
          </span>
          {size === "lg" && (
            <span className="text-sm text-[#4B6982] mt-1 font-medium">Intelligent File Management</span>
          )}
        </div>
      )}
    </Link>
  )
}

export default Logo
