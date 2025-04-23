import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutWrapperProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ 
  children,
  showFooter = true 
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  )};
  export default LayoutWrapper;