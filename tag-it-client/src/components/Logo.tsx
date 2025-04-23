import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', withText = true }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className={`relative ${sizeClasses[size]} transition-transform duration-500 group-hover:rotate-[5deg]`}>
        <div className="absolute inset-0 rotate-45 border-2 border-tagit-mint rounded-md"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1/4 h-1/4 rounded-full bg-tagit-mint"></div>
        </div>
        <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-5 h-5 flex items-center justify-center">
            <div className="w-2/3 h-2/3 rounded-full border border-tagit-mint"></div>
            <div className="absolute w-1/4 h-1/4 rounded-full bg-tagit-mint"></div>
            <div className="absolute w-[1px] h-1/2 bg-tagit-mint top-1/2"></div>
          </div>
        </div>
      </div>
      {withText && (
        <div className="flex flex-col">
          <span className={`font-semibold ${textSizeClasses[size]} text-tagit-darkblue tracking-tight`}>
            Tag<span className="text-tagit-mint">-</span>it
          </span>
          {size === 'lg' && <span className="text-xs text-tagit-blue mt-1">Intelligent File Management</span>}
        </div>
      )}
    </Link>
  );
};

export default Logo;