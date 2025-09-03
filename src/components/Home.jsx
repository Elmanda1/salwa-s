import React, { useState, useEffect } from 'react';

function Home({ onStartQuiz, onNavigate }) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('quotes'); 
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const [displayContent, setDisplayContent] = useState('quotes');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mouse tracking for 3D effect
  const handleMouseMove = (e, cardRef) => {
    if (!cardRef) return;
    
    const rect = cardRef.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / rect.width;
    const deltaY = (e.clientY - centerY) / rect.height;
    
    const rotateX = deltaY * -10;
    const rotateY = deltaX * 10;
    
    cardRef.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale(1.02)`;
  };

  const handleMouseLeave = (cardRef) => {
    if (!cardRef) return;
    cardRef.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
  };
  
  const switchSection = (newSection) => {
    if (newSection === activeSection || isTransitioning) return;
    
    setIsTransitioning(true);
    setContentVisible(false);
    
    setTimeout(() => {
      setDisplayContent(newSection);
      setActiveSection(newSection);
    }, 400);
    
    setTimeout(() => {
      setContentVisible(true);
    }, 450);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 850);
  };

  const quotes = [
    {
      id: 1,
      text: "Karakter bukan dibentuk di saat nyaman, tapi saat kau dipaksa bertahan di tengah badai.",
      author: "Unknown"
    },
    {
      id: 2,
      text: "Orang kuat bukan yang tak pernah jatuh, tapi yang selalu berani bangkit setelah jatuh.",
      author: "Unknown"
    },
    {
      id: 3,
      text: "Keberanian sejati adalah tetap berjalan meski jalan di depan belum terlihat jelas.",
      author: "Unknown"
    },
    {
      id: 4,
      text: "Hidup ini bukan soal menjadi yang terbaik, tapi menjadi lebih baik dari dirimu yang kemarin.",
      author: "Unknown"
    },
    {
      id: 5,
      text: "Disiplin adalah jembatan antara tujuan dan pencapaian.",
      author: "Jim Rohn"
    },
    {
      id: 6,
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill"
    },
    {
      id: 7,
      text: "You can't go back and change the beginning, but you can start where you are and change the ending.",
      author: "C.S.Lewis"
    },
    {
      id: 8,
      text: "You are never too old to set another goal or to dream a new dream.",
      author: "C.S.Lewis"
    },
    {
      id: 9,
      text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
      author: "Ralph Waldo Emerson"
    },
    {
      id: 10,
      text: "Hardships often prepare ordinary people for an extraordinary destiny.",
      author: "C.S. Lewis"
    },
    {
      id: 11,
      text: "Discipline is the bridge between goals and accomplishment.",
      author: "Jim Rohn"
    },
    {
      id: 12,
      text: "Dream big and dare to fail.",
      author: "Norman Vaughan"
    },
    {
      id: 13,
      text: "Act as if what you do makes a difference. It does.",
      author: "William James"
    },
    {
      id: 14,
      text: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt"
    },
    {
      id: 15,
      text: "Happiness depends upon ourselves.",
      author: "Aristotle"
    },
      {
      id: 16,
      text: "Opportunities don't happen. You create them.",
      author: "Chris Grosser"
    },
      {
      id: 17,
      text: "The man who moves a mountain begins by carrying away small stones.",
      author: "Confucius"
    },
        {
      id: 18,
      text: "The secret of getting ahead is getting started.",
      author: "Mark Twain"
    },
        {
      id: 19,
      text: "Everything you've ever wanted is on the other side of fear.",
      author: "George Addair"
    },
        {
      id: 20,
      text: "It always seems impossible until it's done.",
      author: "Nelson Mandela"
    }
  ];

  const wishes = [
    {
      id: 1,
      text: "happy birthdaaay salwa!! my trisakti girlie, may all the good things comes to you, and may the right person be with you <3 sehaat selalu yaa girlie pop LOVE YA!",
      from: "Keysa"
    },
    {
      id: 2,
      text: "wish buat salwa, happy birthday girlll, wish you all the best and god bless you, may this year your life be filled with peace and joyful, and don’t forget to always kind and cheers to many more funtastic journey ahead!!!.",
      from: "Fariz"
    },
    {
      id: 3,
      text: "happy birthdaayy sall!! bahagia selalu yaa, STOP ROBLOX 24/7 ANJAY perbaikin jam tidur lu itu wkwkwk 🤣🤣 wishing u all the yhh trisakti JAYA, JAYA, JAYA 🫰🏻🫰🏻‼️‼️",
      from: "Damita"
    },
    {
      id: 4,
      text: "hbd salwa, semoga lancar hidupnya (emote beruang line)",
      from: "Wira"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      
      <style jsx>{`
        .content-transition {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .content-enter {
          opacity: 1;
          transform: translateY(0px) scale(1);
        }
        
        .content-exit {
          opacity: 0;
          transform: translateY(20px) scale(0.95);
        }
        
        .title-transition {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-transition {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-enter {
          animation: cardSlideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @keyframes cardSlideIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
        }
        
        .button-morphing {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .button-morphing::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        
        .button-morphing:hover::before {
          left: 100%;
        }
        
        .floating-particle {
          animation: float 4s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(90deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
          75% { transform: translateY(-15px) rotate(270deg); }
        }
        
        .card-3d {
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }
        
        .perspective-container {
          perspective: 1000px;
        }
        
        .photo-enter {
          animation: photoSlideIn 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @keyframes photoSlideIn {
          from {
            opacity: 0;
            transform: translateX(-50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0px) scale(1);
          }
        }
        
        .text-enter {
          animation: textSlideIn 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @keyframes textSlideIn {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0px);
          }
        }
      `}</style>

      {/* Dark theme background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 md:w-40 md:h-40 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 md:right-20 w-40 h-40 md:w-56 md:h-56 bg-indigo-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-36 h-36 md:w-48 md:h-48 bg-slate-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-blue-300/5 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 md:w-2 md:h-2 bg-blue-400/30 rounded-full floating-particle"
            style={{
              left: `${15 + i * 12}%`,
              top: `${25 + (i % 4) * 15}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + (i % 3)}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Main welcome section */}
          <div className="bg-slate-900/90 backdrop-blur-xl p-6 md:p-12 lg:p-16 rounded-2xl md:rounded-3xl shadow-2xl border border-slate-700/50 mb-8 md:mb-12 transform hover:scale-[1.01] transition-all duration-500">
            <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center">
              {/* Photo Section */}
              <div className="flex-shrink-0 photo-enter" style={{ animationDelay: '0.3s' }}>
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] group">
                  {/* Outer decorative ring */}
                  <div className="absolute -inset-6 md:-inset-8 border-2 border-blue-400/40 rounded-full group-hover:border-indigo-400/60 transition-colors duration-500 group-hover:scale-105 group-hover:rotate-6"></div>
                  
                  {/* Inner decorative ring */}
                  <div className="absolute -inset-3 md:-inset-4 border border-indigo-400/30 rounded-full group-hover:border-blue-400/50 transition-colors duration-500 group-hover:scale-105 group-hover:-rotate-3"></div>
                  
                  {/* Main gradient border */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-600 rounded-full p-2 group-hover:scale-105 group-hover:rotate-2 transition-all duration-500 shadow-2xl">
                    <div className="w-full h-full rounded-full overflow-hidden bg-slate-800 p-1">
                      <div className="w-full h-full rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
                        {/* Profile image */}
                        <img 
                          src="/assets/home.jpg" 
                          alt="Salwa" 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Content Section */}
              <div className="flex-1 text-center lg:text-left text-enter" style={{ animationDelay: '0.6s' }}>
                {/* Decorative top element */}
                <div className="w-16 md:w-20 h-1.5 md:h-2 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto lg:mx-0 mb-6 md:mb-8 rounded-full"></div>
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent leading-tight">
                  Untuk Salwa,
                </h1>
                
                <div className="space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed">
                  <p className="opacity-90">
                    Selamat memasuki babak baru dalam hidupmu yaa! Website kecil ini aku buat bukan hanya sebagai hadiah sii, tapi juga sebagai <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent font-semibold">kapsul waktu(?) </span> untuk semua moment yang udah kamu atau kita lalui.
                  </p>
                  
                  <p className="opacity-90">
                    Semoga kamu suka sama hadiahku yang sederhana ini. Karena in the end, bukan seberapa megah hadiah yang berarti, tapi seberapa banyak usaha yang dititipin di dalamnya. Semoga hadiahku ini bisa ngingetin dan jadi <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent font-semibold">moment of rebirth</span> kamu lahh. HAHAHAHA APASIH AKU INI. 
                  </p>
                  
                  <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-blue-500/20">
                    <p className="opacity-95 font-medium text-blue-300">
                      Selamat ulang tahun sekali lagi, Salwa! Semoga tahun ini dipenuhi dengan kebahagiaan, cinta, dan pencapaian yang luar biasa untukmu.
                    </p>
                  </div>
                </div>
                
                {/* Signature */}
                <div className="mt-8 md:mt-10">
                  <div className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-3">
                    - Falih Elmanda 
                  </div>
                  <div className="w-24 md:w-32 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto lg:mx-0 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Wall of Quotes and Wishes Section */}
          <div className="mb-12 md:mb-16 relative">
            {/* Section Header */}
            <div className="text-center mb-8 md:mb-12">
              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent title-transition ${
                contentVisible ? 'content-enter' : 'content-exit'
              }`}>
                {displayContent === 'quotes' ? 'Wall of Quotes' : 'Wall of Wishes'}
              </h2>
              
              {/* Toggle Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 md:mb-8 px-4">
                <button
                  onClick={() => switchSection('quotes')}
                  disabled={isTransitioning}
                  className={`px-6 sm:px-8 py-3 sm:py-4 rounded-xl md:rounded-2xl font-semibold text-sm md:text-base button-morphing ${
                    activeSection === 'quotes'
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-600 text-white shadow-2xl shadow-blue-500/30 scale-105'
                      : 'bg-slate-800/80 backdrop-blur-md text-slate-200 hover:bg-slate-700/80 shadow-xl hover:shadow-2xl hover:scale-105 border border-slate-600/50'
                  } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''} transition-all duration-300`}
                >
                  Quotes
                </button>
                <button
                  onClick={() => switchSection('wishes')}
                  disabled={isTransitioning}
                  className={`px-6 sm:px-8 py-3 sm:py-4 rounded-xl md:rounded-2xl font-semibold text-sm md:text-base button-morphing ${
                    activeSection === 'wishes'
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-600 text-white shadow-2xl shadow-blue-500/30 scale-105'
                      : 'bg-slate-800/80 backdrop-blur-md text-slate-200 hover:bg-slate-700/80 shadow-xl hover:shadow-2xl hover:scale-105 border border-slate-600/50'
                  } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''} transition-all duration-300`}
                >
                  Wishes
                </button>
              </div>
            </div>

            {/* Content Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 perspective-container content-transition ${
              contentVisible ? 'content-enter' : 'content-exit'
            }`} style={{ transitionDelay: '0.2s' }}>
              {displayContent === 'quotes' ? (
                // Quotes Grid
                quotes.map((quote, index) => (
                  <div
                    key={quote.id}
                    className="card-3d cursor-pointer group card-transition"
                    style={{
                      animationDelay: contentVisible ? `${index * 0.1}s` : '0s'
                    }}
                    onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                  >
                    <div className="bg-slate-900/90 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-700/50 hover:shadow-2xl h-full transition-all duration-500 group-hover:scale-105 hover:border-slate-600/70">
                      <div className="relative h-full flex flex-col">
                        {/* Quote Text */}
                        <div className="flex-1 mb-4 md:mb-6">
                          <div className="relative">
                            <div className="absolute -top-2 md:-top-4 -left-2 md:-left-4 text-4xl md:text-6xl text-blue-400/30 font-serif">"</div>
                            <p className="text-slate-200 leading-relaxed italic text-sm sm:text-base md:text-lg font-medium pt-4 md:pt-6 relative z-10 opacity-90">
                              {quote.text}
                            </p>
                            <div className="absolute -bottom-1 md:-bottom-2 -right-1 md:-right-2 text-2xl md:text-4xl text-blue-400/30 font-serif">"</div>
                          </div>
                        </div>
                        
                        {/* Author */}
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-2">
                            <div className="w-6 md:w-8 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                            <span className="text-sm sm:text-base md:text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                              {quote.author}
                            </span>
                          </div>
                          <div className="w-4 h-4 md:w-6 md:h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg">
                            <div className="w-1 h-1 md:w-2 md:h-2 bg-white rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // Wishes Grid
                wishes.map((wish, index) => (
                  <div
                    key={wish.id}
                    className="card-3d cursor-pointer group card-transition"
                    style={{
                      animationDelay: contentVisible ? `${index * 0.1}s` : '0s'
                    }}
                    onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                  >
                    <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-700/50 hover:shadow-2xl h-full transition-all duration-500 group-hover:scale-105 hover:border-slate-600/70">
                      <div className="relative h-full flex flex-col">
                        {/* Wish Text */}
                        <div className="flex-1 mb-4 md:mb-6">
                          <div className="relative">
                            <div className="absolute -top-2 md:-top-4 -left-2 md:-left-4 text-lg md:text-2xl text-indigo-400/50">♡</div>
                            <p className="text-slate-200 leading-relaxed text-sm sm:text-base md:text-lg font-medium pt-4 md:pt-6 relative z-10 opacity-90">
                              {wish.text}
                            </p>
                            <div className="absolute -bottom-1 md:-bottom-2 -right-1 md:-right-2 text-sm md:text-xl text-indigo-400/50">♡</div>
                          </div>
                        </div>
                        
                        {/* From */}
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-2">
                            <div className="w-6 md:w-8 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                            <span className="text-sm sm:text-base md:text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                              {wish.from}
                            </span>
                          </div>
                          <div className="w-4 h-4 md:w-6 md:h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg">
                            <div className="w-1 h-1 md:w-2 md:h-2 bg-white rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Inspirational quote */}
          <div className="text-center px-4">
            <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-slate-700/30 max-w-md mx-auto transform hover:scale-105 transition-all duration-500">
              <p className="text-slate-300/80 italic text-base md:text-lg hover:text-slate-200 transition-colors duration-300">
                "Setiap usaha yang tulus akan selalu menjadi harta berharga yang tak ternilai."
              </p>
              <div className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-3 md:mt-4 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating star elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute text-blue-400/30 animate-pulse text-xs md:text-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;