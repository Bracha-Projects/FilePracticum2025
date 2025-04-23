import React from 'react';
import { cn } from '@/lib/utils';

interface PageHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
  className?: string;
}

const PageHeading: React.FC<PageHeadingProps> = ({
  title,
  subtitle,
  alignment = 'left',
  className,
}) => {
  return (
    <div 
      className={cn(
        'mb-8',
        alignment === 'center' && 'text-center',
        className
      )}
    >
      <h1 className="text-3xl font-bold text-tagit-darkblue tracking-tight md:text-4xl animate-fade-in">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 text-lg text-tagit-blue animate-slide-up animation-delay-150">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeading;