  import React, { useState, useEffect } from 'react';
  import { Menu, X, Sparkles } from 'lucide-react';

  function Navbar({ activeView, onNavigate }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const navItems = [
      { id: 'home', label: 'Home' },
      { id: 'timeline', label: 'Timeline' },
      { id: 'gallery', label: 'Galeri Foto' }
    ];

    // Detect scroll for glass morphism effect
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getButtonClasses = (viewName) => {
      const baseClasses = "relative py-2.5 px-4 lg:px-6 rounded-full text-sm lg:text-base font-medium transition-all duration-500 group overflow-hidden";
      if (activeView === viewName) {
        return `${baseClasses} bg-gradient-to-r from-blue-600/90 via-indigo-600/90 to-slate-600/90 text-white shadow-lg backdrop-blur-xl border border-blue-400/30`;
      }
      return `${baseClasses} text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/80 hover:via-indigo-500/80 hover:to-slate-500/80 hover:shadow-lg backdrop-blur-sm border border-transparent hover:border-blue-400/20`;
    };

    const getMobileButtonClasses = (viewName) => {
      const baseClasses = "w-full py-3 px-4 rounded-xl text-left font-medium transition-all duration-500 flex items-center justify-between backdrop-blur-xl overflow-hidden relative group";
      if (activeView === viewName) {
        return `${baseClasses} bg-gradient-to-r from-blue-600/90 via-indigo-600/90 to-slate-600/90 text-white shadow-lg border border-blue-400/30`;
      }
      return `${baseClasses} text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/70 hover:via-indigo-500/70 hover:to-slate-500/70 border border-slate-700/30 hover:border-blue-400/30 hover:shadow-lg`;
    };

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    const handleNavigation = (view) => {
      console.log('Navbar: handleNavigation called with:', view);
      
      scrollToTop();
      
      setTimeout(() => {
        if (typeof onNavigate === 'function') {
          onNavigate(view);
        } else {
          console.warn('onNavigate is not a function:', onNavigate);
        }
      }, 100);
      
      setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
      <>
        {/* Floating Glass Morphism Navbar */}
        <nav className={`fixed top-3 sm:top-4 lg:top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 w-[95%] sm:w-auto max-w-4xl ${
          isScrolled ? 'top-2 sm:top-3 lg:top-4' : ''
        }`}>
          <div className={`relative transition-all duration-500 ${
            isScrolled 
              ? 'bg-slate-900/95 backdrop-blur-2xl shadow-2xl border border-slate-700/50' 
              : 'bg-slate-900/80 backdrop-blur-xl shadow-xl border border-slate-700/30'
          } rounded-2xl lg:rounded-full overflow-hidden`}>
            
            {/* Gradient overlay for premium look */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-indigo-900/20 to-slate-800/20 pointer-events-none"></div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center px-3 py-3">
              <div className="flex items-center space-x-1">
                {navItems.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => handleNavigation(id)}
                    className={getButtonClasses(id)}
                    aria-label={`Navigate to ${label}`}
                  >
                    <span className="relative z-10 tracking-wide">{label}</span>
                    
                    {/* Active indicator */}
                    {activeView === id && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-300 rounded-full animate-pulse shadow-md"></div>
                    )}
                    
                    {/* Hover shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-4 h-full transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[300%] transition-transform duration-1000"></div>
                  </button>
                ))}
              </div>
              
              {/* Birthday sparkle decoration */}
              <div className="ml-4 flex items-center px-2">
                <Sparkles className="text-blue-400/60 animate-pulse" size={16} />
              </div>
            </div>

            {/* Tablet Navigation */}
            <div className="hidden sm:flex lg:hidden items-center justify-center px-4 py-3">
              <div className="flex items-center space-x-3">
                {navItems.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => handleNavigation(id)}
                    className={`relative py-2 px-4 rounded-xl text-sm font-medium transition-all duration-500 group overflow-hidden ${
                      activeView === id 
                        ? 'bg-gradient-to-r from-blue-600/90 via-indigo-600/90 to-slate-600/90 text-white shadow-lg border border-blue-400/30' 
                        : 'text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/70 hover:via-indigo-500/70 hover:to-slate-500/70 border border-transparent hover:border-blue-400/20'
                    }`}
                    aria-label={`Navigate to ${label}`}
                  >
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Navigation Header */}
            <div className="sm:hidden flex items-center justify-between px-4 py-3">
              {/* Judul di tengah */}
              <div className="flex-1 text-center">
                <span className="block text-xl font-bold text-slate-200">
                  Salwa's Special Day
                </span>
              </div>

              {/* Tombol menu */}
              <button
                onClick={toggleMobileMenu}
                className="relative p-2 rounded-2xl text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/50 hover:to-indigo-500/50 transition-all duration-300 backdrop-blur-sm group"
                aria-label="Toggle mobile menu"
              >
                <div className={`transform transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : ''}`}>
                  {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </div>

                {/* Button glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Floating ambient particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl lg:rounded-full">
            <div className="absolute -top-1 -left-2 w-1 h-1 bg-blue-400/60 rounded-full animate-ping"></div>
            <div className="absolute -top-2 -right-1 w-1 h-1 bg-indigo-400/60 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute -bottom-1 left-1/3 w-1 h-1 bg-slate-400/60 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 -right-2 w-0.5 h-0.5 bg-blue-300/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </nav>

        {/* Enhanced Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 sm:hidden">
            {/* Backdrop with blur */}
            <div 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300" 
              onClick={toggleMobileMenu}
            ></div>
            
            {/* Menu Panel */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-[85%] max-w-xs">
              <div className="relative bg-slate-900/95 backdrop-blur-2xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-indigo-900/20 to-slate-800/30 pointer-events-none"></div>
                
                <div className="relative z-10 p-4">
                  {/* Menu Header */}
                  <div className="mb-4 text-center">
                    <h3 className="text-base font-semibold text-slate-200 tracking-wide">Navigation Menu</h3>
                  </div>
                  
                  {/* Menu Items */}
                  <div className="flex flex-col space-y-2">
                    {navItems.map(({ id, label }) => (
                      <button
                        key={id}
                        onClick={() => handleNavigation(id)}
                        className={getMobileButtonClasses(id)}
                        aria-label={`Navigate to ${label}`}
                      >
                        <span className="text-sm tracking-wide">{label}</span>
                        
                        {/* Button shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent w-6 h-full transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[300%] transition-transform duration-1000"></div>
                        
                        {/* Active indicator */}
                        {activeView === id && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse shadow-lg"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Minimal spacing for content below */}
        <div className="h-10"></div>
      </>
    );
  }

  export default Navbar;