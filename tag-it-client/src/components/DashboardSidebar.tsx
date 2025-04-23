import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Upload, FileText, Settings, FolderOpen, Tag, UserCircle } from 'lucide-react';
import Logo from './Logo';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, active }) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
        active
          ? "bg-tagit-mint/20 text-tagit-darkblue font-medium"
          : "text-tagit-blue hover:bg-tagit-mint/10 hover:text-tagit-darkblue"
      )}
    >
      <div className="mr-3">{icon}</div>
      <span>{label}</span>
    </Link>
  );
};

const DashboardSidebar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const sidebarLinks = [
    { path: '/dashboard', icon: <Layout className="h-4 w-4" />, label: 'Dashboard' },
    { path: '/files', icon: <FolderOpen className="h-4 w-4" />, label: 'Files' },
    { path: '/upload', icon: <Upload className="h-4 w-4" />, label: 'Upload Files' },
    { path: '/tags', icon: <Tag className="h-4 w-4" />, label: 'Tags' },
    { path: '/profile', icon: <UserCircle className="h-4 w-4" />, label: 'Profile' },
    { path: '/settings', icon: <Settings className="h-4 w-4" />, label: 'Settings' },
  ];
  
  return (
    <aside className="min-h-screen w-64 border-r border-border bg-secondary/30">
      <div className="p-4">
        <Logo withText />
      </div>
      
      <div className="px-3 py-2">
        <p className="mb-2 px-3 text-xs uppercase text-muted-foreground">
          Main
        </p>
        <nav className="space-y-1">
          {sidebarLinks.slice(0, 4).map((link) => (
            <SidebarLink
              key={link.path}
              to={link.path}
              icon={link.icon}
              label={link.label}
              active={isActive(link.path)}
            />
          ))}
        </nav>
      </div>
      
      <div className="px-3 py-2 mt-6">
        <p className="mb-2 px-3 text-xs uppercase text-muted-foreground">
          User
        </p>
        <nav className="space-y-1">
          {sidebarLinks.slice(4).map((link) => (
            <SidebarLink
              key={link.path}
              to={link.path}
              icon={link.icon}
              label={link.label}
              active={isActive(link.path)}
            />
          ))}
        </nav>
      </div>
      
      {/* <div className="absolute bottom-4 left-4 right-4">
        <div className="p-4 rounded-lg bg-tagit-mint/10 border border-tagit-mint/20">
          <p className="text-xs text-tagit-darkblue mb-2">
            Upgrade to Pro for unlimited storage and advanced AI tagging.
          </p>
          <Button className="w-full text-sm h-8 bg-tagit-blue text-white hover:bg-tagit-darkblue">
            Upgrade Plan
          </Button>
        </div>
      </div> */}
    </aside>
  );
};

export default DashboardSidebar;