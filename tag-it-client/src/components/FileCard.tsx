import React from 'react';
import { File, Tag, Clock, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface FileCardProps {
  id: string;
  name: string;
  type: string;
  size: string;
  tags: string[];
  lastModified: string;
  className?: string;
}

const FileCard: React.FC<FileCardProps> = ({
  id,
  name,
  type,
  size,
  tags,
  lastModified,
  className,
}) => {
  const getFileIcon = () => {
    // You can expand this to include different file type icons
    return <File className="h-10 w-10 text-tagit-blue" />;
  };

  const truncateFileName = (fileName: string, maxLength: number = 28) => {
    if (fileName.length <= maxLength) return fileName;
    const extension = fileName.split('.').pop();
    const name = fileName.substring(0, fileName.lastIndexOf('.'));
    if (name.length <= maxLength - 3 - (extension?.length || 0)) return fileName;
    return `${name.substring(0, maxLength - 3 - (extension?.length || 0))}...${extension ? `.${extension}` : ''}`;
  };

  return (
    <div className={cn("group relative p-4 rounded-xl border border-border bg-white hover:shadow-elevation transition-all duration-300 hover:border-tagit-mint/50", className)}>
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-tagit-mint/10 rounded-lg">
          {getFileIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between">
            <h3 className="font-medium text-tagit-darkblue truncate" title={name}>
              {truncateFileName(name)}
            </h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem className="cursor-pointer">
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-1 flex flex-col space-y-2">
            <div className="flex items-center text-xs text-muted-foreground space-x-4">
              <span>{type}</span>
              <span>{size}</span>
            </div>
            
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>{lastModified}</span>
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {tags.map((tag, index) => (
                  <div key={index} className="tag-pill">
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-tagit-mint/5 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"></div>
    </div>
  );
};

export default FileCard;