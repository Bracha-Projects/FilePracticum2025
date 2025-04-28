import React from "react"
import { Link } from "react-router-dom"
import { ChevronRight, Home, FolderOpen } from "lucide-react"
import { cn } from "@/lib/utils"

// Embedding tailwind config directly
const tailwindConfig = {
  theme: {
    extend: {
      colors: {
        tagit: {
          blue: "#4d6a84",
          darkblue: "#3a5269",
          mint: "#a8ebc7",
          lightmint: "#cff6e3",
        },
      },
    },
  },
}

interface BreadcrumbItem {
  name: string
  path: string
}

interface FileBreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

const FileBreadcrumb: React.FC<FileBreadcrumbProps> = ({ items, className }) => {
  return (
    <nav className={cn("flex", className)}>
      <ol className="flex items-center space-x-1 overflow-x-auto py-1 scrollbar-none">
        <li>
          <Link to="/files" className="breadcrumb-item">
            <Home className="h-4 w-4 mr-1" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li className="flex items-center">
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </li>
            <li>
              {index === items.length - 1 ? (
                <span className="breadcrumb-item text-tagit-blue">
                  <FolderOpen className="h-4 w-4 mr-1" />
                  {item.name}
                </span>
              ) : (
                <Link to={item.path} className="breadcrumb-item">
                  <FolderOpen className="h-4 w-4 mr-1" />
                  {item.name}
                </Link>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  )
}

export default FileBreadcrumb
