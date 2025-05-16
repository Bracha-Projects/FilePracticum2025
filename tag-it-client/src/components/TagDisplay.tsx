import type React from "react"

interface TagDisplayProps {
  tags: string[]
  maxDisplay?: number
  className?: string
}

const TagDisplay: React.FC<TagDisplayProps> = ({ tags, maxDisplay = 3, className = "" }) => {
  if (!tags || tags.length === 0) return null

  const displayTags = tags.slice(0, maxDisplay)
  const remainingCount = tags.length - maxDisplay

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {displayTags.map((tag, index) => (
        <span
          key={index}
          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-tagit-mint/20 text-tagit-blue"
        >
          {tag}
        </span>
      ))}
      {remainingCount > 0 && (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          +{remainingCount}
        </span>
      )}
    </div>
  )
}

export default TagDisplay
