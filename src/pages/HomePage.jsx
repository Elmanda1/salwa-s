import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [showSalwa, setshowSalwa] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setIsVisible(true), 100);
    const timer2 = setTimeout(() => setshowSalwa(true), 1400);
    const timer3 = setTimeout(() => setShowButton(true), 2200);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div>
      {/* Landing Section */}
      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 text-center overflow-hidden bg-gradient-to-br from-slate-900 via-navy-900 to-indigo-950">
        {/* Elegant Background Effects */}
        <div className="absolute inset-0">
          {/* Main gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-navy-950/40 via-slate-900/60 to-indigo-950/80"></div>
          
          {/* Floating aurora effects */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-gradient-to-r from-slate-400/15 to-blue-300/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-r from-indigo-300/10 to-blue-200/10 rounded-full blur-2xl animate-pulse delay-500"></div>
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="z-10 max-w-6xl mx-auto px-4">
          {/* Main heading with staggered animation */}
          <div className="mb-2 sm:mb-4">
            <h1 className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-slate-100 leading-relaxed transform transition-all duration-1000 ease-out ${
              isVisible ? 'scale-100 opacity-100 rotate-0' : 'scale-95 opacity-0 rotate-1'
            }`} style={{
              fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif',
              letterSpacing: '0.02em',
              lineHeight: '1.2'
            }}>
              Selamat Ulang Tahun,
            </h1>
          </div>
          
          <div className="mb-2 sm:mb-4">
            <h1 className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight text-slate-200 leading-relaxed transform transition-all duration-1000 ease-out delay-300 ${
              isVisible ? 'scale-100 opacity-100 filter-none' : 'scale-90 opacity-0 blur-sm'
            }`} style={{
              fontFamily: '"Dancing Script", "Brush Script MT", cursive',
              letterSpacing: '0.03em',
              lineHeight: '1.3',
              paddingBottom: '0.2em'
            }}>
              Salwa Nur Syahbani
            </h1>
          </div>

          {/* Description with fade-in */}
          <div className="max-w-3xl mx-auto mb-6 sm:mb-10">
            <p className={`text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300/90 leading-relaxed transform transition-all duration-1000 ease-out delay-1000 px-4 ${
              isVisible ? 'scale-100 opacity-100 filter-none' : 'scale-95 opacity-0 blur-sm'
            }`} style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '0.01em',
              lineHeight: '1.7'
            }}>
              Website ini kusiapkan untuk merayakan hari kelahiranmu. Kenangan kita memang belum banyak, tapi izinkan aku untuk mengulas momen-momen kecil yang telah kita lalui.
            </p>
          </div>
          
          {/* Buttons with entrance animation */}
          <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center transform transition-all duration-1000 ease-out ${
            showButton ? 'rotate-0 opacity-100 scale-100 filter-none' : 'rotate-1 opacity-0 scale-80 blur-sm'
          }`}>
            <button
              onClick={() => navigate('/quiz')}
              className="group relative py-3 sm:py-4 px-8 sm:px-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 hover:-rotate-1 active:scale-95 overflow-hidden w-full sm:w-auto max-w-xs"
              style={{
                boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(147, 197, 253, 0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(147, 197, 253, 0.2)'
              }}
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              
              {/* Button text */}
              <span className="relative z-10 tracking-wide text-sm sm:text-base">Quiz</span>
              
              {/* Premium shine effect */}
              <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/30 to-transparent w-6 h-full transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[300%] transition-transform duration-700"></div>
            </button>
            
            <button
              onClick={() => navigate('/gallery')}
              className="group relative py-3 sm:py-4 px-8 sm:px-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 hover:-rotate-1 active:scale-95 overflow-hidden w-full sm:w-auto max-w-xs"
              style={{
                boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(147, 197, 253, 0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(147, 197, 253, 0.2)'
              }}
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                            
              {/* Button text */}
              <span className="relative z-10 tracking-wide text-sm sm:text-base">Galeri</span>
              
              {/* Premium shine effect */}
              <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/30 to-transparent w-6 h-full transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[300%] transition-transform duration-700"></div>
            </button>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400/60 rounded-full animate-pulse delay-2000"></div>
          <div className="absolute top-20 right-16 w-1 h-1 bg-indigo-300/60 rounded-full animate-pulse delay-3000"></div>
          <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-slate-400/60 rounded-full animate-pulse delay-1500"></div>
          <div className="absolute bottom-32 right-12 w-1 h-1 bg-blue-300/60 rounded-full animate-pulse delay-2500"></div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}

export default HomePage;