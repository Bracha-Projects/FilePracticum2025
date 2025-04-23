import React from 'react';
import { Folder, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface FolderCardProps {
  id: string;
  name: string;
  filesCount: number;
  path: string;
  className?: string;
}

const FolderCard: React.FC<FolderCardProps> = ({
  id,
  name,
  filesCount,
  path,
  className,
}) => {
  return (
    <Link to={path} className={cn("block", className)}>
      <div className="group folder-card">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="p-2 bg-tagit-mint/10 rounded-lg mr-3">
              <Folder className="h-8 w-8 text-tagit-blue" />
            </div>
            <div>
              <h3 className="font-medium text-tagit-darkblue">{name}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {filesCount} {filesCount === 1 ? 'file' : 'files'}
              </p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem className="cursor-pointer" onClick={(e) => e.preventDefault()}>
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={(e) => e.preventDefault()}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="absolute inset-0 bg-tagit-mint/5 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"></div>
      </div>
    </Link>
  );
};

export default FolderCard;