import Logo from './Logo';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-tagit-blue/10 border-t border-tagit-mint/20 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo size="md" />
            <p className="mt-4 text-sm text-tagit-blue max-w-xs">
              Intelligent file management system with AI-powered automatic tagging capabilities for businesses and organizations.
            </p>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <nav>
              <h3 className="text-sm font-semibold text-tagit-darkblue mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-sm text-tagit-blue hover:text-tagit-mint transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/underConstruction" className="text-sm text-tagit-blue hover:text-tagit-mint transition">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/underConstruction" className="text-sm text-tagit-blue hover:text-tagit-mint transition">
                    Pricing
                  </Link>
                </li>
              </ul>
            </nav>
            
            <nav>
              <h3 className="text-sm font-semibold text-tagit-darkblue mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/underConstruction" className="text-sm text-tagit-blue hover:text-tagit-mint transition">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/underConstruction" className="text-sm text-tagit-blue hover:text-tagit-mint transition">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/underConstruction" className="text-sm text-tagit-blue hover:text-tagit-mint transition">
                    API
                  </Link>
                </li>
              </ul>
            </nav>
            
            <nav>
              <h3 className="text-sm font-semibold text-tagit-darkblue mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/contact" className="text-sm text-tagit-blue hover:text-tagit-mint transition">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-sm text-tagit-blue hover:text-tagit-mint transition">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm text-tagit-blue hover:text-tagit-mint transition">
                    Terms
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-tagit-mint/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-tagit-blue mb-4 md:mb-0">
              &copy; {currentYear} Tag-it. All rights reserved.
            </p>
            
            <div className="flex space-x-6">
              <Link to="/underConstruction" className="text-tagit-blue hover:text-tagit-mint transition">
                <span className="sr-only">LinkedIn</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </Link>
              <Link to="/underConstruction" className="text-tagit-blue hover:text-tagit-mint transition">
                <span className="sr-only">Twitter</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </Link>
              <Link to="/underConstruction" className="text-tagit-blue hover:text-tagit-mint transition">
                <span className="sr-only">Facebook</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;