import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, UserCircle } from 'lucide-react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // This is just for demo purposes - in a real app, you'd check auth state
    const checkPath = location.pathname;
    setIsLoggedIn(checkPath.includes('/dashboard') || checkPath.includes('/files') || checkPath.includes('/upload') || checkPath.includes('/profile'));
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = isLoggedIn 
    ? [
      { name: 'Dashboard', path: '/dashboard' },
      { name: 'Files', path: '/files' },
      { name: 'Upload', path: '/upload' },
    ]
    : [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-tagit-mint ${isActive(link.path) ? 'text-tagit-mint' : 'text-tagit-darkblue'}`}
              >
                {link.name}
              </Link>
            ))}
            
            {isLoggedIn ? (
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                  <UserCircle className="h-5 w-5 text-tagit-blue" />
                </Button>
              </Link>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="outline" className="border-tagit-mint text-tagit-darkblue hover:bg-tagit-mint/20">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-tagit-blue text-white hover:bg-tagit-darkblue">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-tagit-darkblue" />
            ) : (
              <Menu className="h-6 w-6 text-tagit-darkblue" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-16 animate-fade-in">
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className={`text-base font-medium py-2 border-b border-gray-100 ${isActive(link.path) ? 'text-tagit-mint' : 'text-tagit-darkblue'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {isLoggedIn ? (
              <Link 
                to="/profile" 
                className="flex items-center space-x-2 py-2 text-tagit-darkblue"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <UserCircle className="h-5 w-5" />
                <span>My Profile</span>
              </Link>
            ) : (
              <div className="flex flex-col space-y-3 pt-4">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-tagit-mint text-tagit-darkblue">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-tagit-blue text-white">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;