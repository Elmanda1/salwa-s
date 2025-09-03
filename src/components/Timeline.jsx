import React, { useState, useEffect, useRef } from 'react';
import { Heart, Star, Clock, Gamepad2 } from 'lucide-react';

const timelineData = [
  {
    title: "Tower of Hell",
    description:
      "Rame banget kalo kita main ini! Kamu selalu lebih cepet sampe atas, tapi aku yang sering jatoh duluan 😅",
    category: "Parkour",
    icon: "🗼",
    gameImage: "/assets/roblox/1.png",
    gameUrl: "https://www.roblox.com/games/1962086868/Tower-of-Hell"
  },
  {
    title: "Tandem",
    description:
      "Obby unik di mana kita naik sepeda tandem. Satu ngatur arah, satunya ngatur pedal dan rem. Seru banget karena harus kompak!",
    category: "Teamwork Obby",
    icon: "🚲",
    gameImage: "/assets/roblox/2.png",
    gameUrl: "https://www.roblox.com/games/6718939346/Tandem"
  },
  {
    title: "Roll a Friend",
    description:
      "Game absurd tapi lucu! Kita harus gulung satu sama lain kayak bola biar bisa lewat rintangan.",
    category: "Funny Obby",
    icon: "⚽",
    gameImage: "/assets/roblox/3.png",
    gameUrl: "https://www.roblox.com/games/6940985180/Roll-a-Friend"
  },
  {
    title: "Experience Gravity",
    description:
      "Santai banget! Kita bisa ngobrol sambil ngambang di luar angkasa dan main-main dengan gravitasi rendah.",
    category: "Chill",
    icon: "🌌",
    gameImage: "/assets/roblox/4.png",
    gameUrl: "https://www.roblox.com/games/1962085437/Experience-Gravity"
  },
  {
    title: "Adventure Story",
    description:
      "RPG kooperatif! Kita bisa lawan musuh bareng, kumpulin kartu, dan jadi tim paling solid.",
    category: "RPG",
    icon: "🃏",
    gameImage: "/assets/roblox/5.png",
    gameUrl: "https://www.roblox.com/games/3587619225/Adventure-Story"
  },
  {
    title: "Entry Point",
    description:
      "Main heist bareng-bareng! Bisa pilih mau main stealth atau hajar musuh langsung. Kerja tim penting banget di sini.",
    category: "Heist",
    icon: "🕵️",
    gameImage: "/assets/roblox/6.png",
    gameUrl: "https://www.roblox.com/games/4458803037/Entry-Point"
  },
  {
    title: "Stop It, Slender!",
    description:
      "Game horor klasik Roblox. Cari halaman bareng-bareng sambil berusaha kabur dari Slenderman.",
    category: "Horror",
    icon: "👻",
    gameImage: "/assets/roblox/7.png",
    gameUrl: "https://www.roblox.com/games/308697938/Stop-it-Slender-2"
  },
  {
    title: "Incognito",
    description:
      "Game strategi sosial: kita harus nyamar jadi NPC biar gak ketahuan. Lucu dan tegang kalau bareng!",
    category: "Social Strategy",
    icon: "🎭",
    gameImage: "/assets/roblox/8.png",
    gameUrl: "https://www.roblox.com/games/127720196/Incognito"
  },
  {
    title: "Isolator",
    description:
      "Puzzle dua pemain dengan tema eksperimen psikologis. Kita harus saling komunikasiin kode biar bisa kabur bareng!",
    category: "Puzzle",
    icon: "🧩",
    gameImage: "/assets/roblox/9.png",
    gameUrl: "https://www.roblox.com/games/4591014840/Isolator"
  },
  {
    title: "The Maze",
    description:
      "Game horror survival. Kita masuk ke gua gelap, cuma bawa senter, dan harus bareng-bareng kabur dari monster. Deg-degan tapi seru kalau berdua!",
    category: "Horror",
    icon: "🕯️",
    gameImage: "/assets/roblox/10.png",
    gameUrl: "https://www.roblox.com/games/295798546/The-Maze"
  },
  {
    title: "2 Player Teamwork Obby",
    description:
      "Classic teamwork obby. Kita harus bantuin satu sama lain untuk buka jalan dan lanjut level berikutnya.",
    category: "Teamwork Obby",
    icon: "🤝",
    gameImage: "/assets/roblox/11.png",
    gameUrl: "https://www.roblox.com/games/6783612601/2-Player-Teamwork-Obby"
  },
  {
    title: "Pull a Friend",
    description:
      "Satu narik, satu ditarik. Bareng-bareng kita harus lewatin obstacle biar bisa finish!",
    category: "Funny Obby",
    icon: "🪢",
    gameImage: "/assets/roblox/12.png",
    gameUrl: "https://www.roblox.com/games/6513337343/Pull-a-Friend"
  }
];


// Blue color variations for consistent theming
const blueColorVariants = [
  'from-blue-400 to-blue-500',
  'from-blue-500 to-blue-600', 
  'from-indigo-400 to-indigo-500',
  'from-indigo-500 to-indigo-600',
  'from-blue-400 to-indigo-500',
  'from-indigo-400 to-blue-600'
];

// Enhanced Timeline Item - Fully responsive dengan gambar lokal
const TimelineItem3D = ({ data, index, isVisible, onHover, isLiked, onLike }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [likeAnimation, setLikeAnimation] = useState(false);
  const cardRef = useRef(null);
  
  const isEven = index % 2 === 0;
  const cardColor = blueColorVariants[index % blueColorVariants.length];
  
  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };
  
  const handleLikeClick = () => {
    setLikeAnimation(true);
    onLike(index);
    setTimeout(() => setLikeAnimation(false), 600);
  };

  const handlePlayGame = () => {
    window.open(data.gameUrl, '_blank');
  };
  
  const cardStyle = {
    transform: isHovered && window.innerWidth >= 768
      ? `perspective(1000px) rotateX(${(mousePosition.y - 150) * 0.02}deg) rotateY(${(mousePosition.x - 200) * 0.02}deg) translateZ(10px)`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.2s ease-out'
  };
  
  return (
    <>
      {/* Mobile Layout (< md) */}
      <div className="block md:hidden w-full mb-8 px-4">
        <div className="relative">
          {/* Mobile timeline indicator */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-indigo-500 opacity-30"></div>
          
          {/* Mobile timeline icon */}
          <div className={`absolute left-3 top-8 w-6 h-6 bg-gradient-to-br ${cardColor} text-white text-xs
            rounded-full flex items-center justify-center shadow-lg z-10 border-2 border-slate-800`}>
            <span className="text-xs">{data.icon}</span>
          </div>
          
          {/* Mobile card */}
          <div className="ml-12">
            <div className={`bg-slate-900/95 backdrop-blur-md p-4 rounded-xl shadow-xl
              transition-all duration-500 ease-out border border-slate-700/50
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              
              {/* Category badge */}
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white 
                bg-gradient-to-r ${cardColor} mb-3 shadow-md`}>
                <Gamepad2 className="w-3 h-3 mr-1" />
                {data.category}
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-bold mb-3 text-slate-100 leading-tight">
                {data.title}
              </h3>
              
              {/* Roblox Game Image dari direktori lokal */}
              <div className="relative mb-4 overflow-hidden rounded-lg bg-slate-800 border border-slate-600">
                <div className="aspect-video relative group">
                  <img 
                    src={data.gameImage}
                    alt={data.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIzMCIgZmlsbD0iIzMzNDI1NSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk0YTNiOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdhbWUgaW1hZ2Ugbm90IGZvdW5kPC90ZXh0Pjwvc3ZnPg==';
                    }}
                  />
                  
                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={handlePlayGame}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transform hover:scale-105 transition-all duration-200 shadow-lg"
                    >
                      <Gamepad2 className="w-4 h-4" />
                      Play Game
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-slate-300 leading-relaxed text-sm mb-4">
                {data.description}
              </p>
              
              {/* Like button */}
              <div className="flex justify-center">
                <button 
                  onClick={handleLikeClick}
                  className={`bg-slate-800/70 hover:bg-slate-700/70 text-blue-400 py-2.5 px-4 
                    rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg
                    transform hover:-translate-y-0.5 relative overflow-hidden flex items-center gap-2
                    ${isLiked ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}
                >
                  <Heart 
                    className={`w-4 h-4 transition-all duration-300 relative z-10
                      ${isLiked ? 'fill-current scale-110' : 'hover:scale-110'}`} 
                  />
                  <span className="relative z-10">
                    {isLiked ? 'Liked!' : 'Like'}
                  </span>
                  
                  {likeAnimation && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-blue-500 animate-ping opacity-75"></div>
                    </div>
                  )}
                </button>
              </div>
              
              {/* Like status */}
              {isLiked && (
                <div className="mt-3 text-center">
                  <span className="text-blue-300 text-xs font-medium bg-slate-800/50 px-2 py-1 rounded-full">
                    🎮 Game favorit!
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout (md and up) */}
      <div className={`hidden md:flex items-center w-full mb-16 ${isEven ? 'md:flex-row-reverse' : ''} relative`}>
        {/* Enhanced background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute w-96 h-96 bg-gradient-to-r ${cardColor} opacity-8 rounded-full blur-3xl 
            ${isEven ? 'right-0' : 'left-0'} top-1/2 transform -translate-y-1/2 transition-all duration-1000
            ${isVisible ? 'opacity-8 scale-100' : 'opacity-0 scale-50'}`} />
        </div>
        
        {/* Content Card */}
        <div className="w-5/12 relative z-10">
          <div
            ref={cardRef}
            className={`bg-slate-900/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl 
              transition-all duration-700 ease-out cursor-pointer overflow-hidden relative
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
              border-2 border-slate-700/50 hover:border-blue-400/50 hover:shadow-blue-500/25`}
            style={{
              ...cardStyle,
              animationDelay: `${index * 0.3}s`
            }}
            onMouseEnter={() => {
              setIsHovered(true);
              onHover(index);
            }}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
          >
            {/* Enhanced shimmer effect */}
            <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent 
              ${isHovered ? 'translate-x-[100%]' : 'translate-x-[-100%]'} 
              transition-transform duration-1200 ease-out`} />
            
            {/* Category badge */}
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-white 
              bg-gradient-to-r ${cardColor} mb-6 shadow-lg relative overflow-hidden`}>
              <Gamepad2 className="w-4 h-4 mr-2" />
              <span className="relative z-10">{data.category}</span>
            </div>
            
            {/* Title */}
            <h3 className="text-3xl font-bold mb-6 text-slate-100 relative group leading-tight">
              {data.title}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 
                group-hover:w-full transition-all duration-500 rounded-full"></div>
            </h3>
            
            {/* Roblox Game Image dari direktori lokal */}
            <div className="relative mb-6 group overflow-hidden rounded-2xl bg-slate-800 border border-slate-600">
              <div className="aspect-video relative">
                <img 
                  src={data.gameImage}
                  alt={data.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIzMCIgZmlsbD0iIzMzNDI1NSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk0YTNiOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdhbWUgaW1hZ2Ugbm90IGZvdW5kPC90ZXh0Pjwvc3ZnPg==';
                  }}
                />
                
                {/* Play overlay */}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button 
                    onClick={handlePlayGame}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-3 transform hover:scale-105 transition-all duration-200 shadow-xl"
                  >
                    <Gamepad2 className="w-5 h-5" />
                    Play on Roblox
                  </button>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-slate-300 leading-relaxed text-lg mb-6">
              {data.description}
            </p>
            
            {/* Like button */}
            <div className="flex justify-center">
              <button 
                onClick={handleLikeClick}
                className={`relative bg-slate-800/70 hover:bg-slate-700/70 text-blue-400 py-3 px-6 
                  rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl
                  transform hover:-translate-y-1 overflow-hidden group flex items-center gap-3
                  ${isLiked ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}
              >
                <Heart 
                  className={`w-5 h-5 transition-all duration-300 relative z-10
                    ${isLiked ? 'fill-current scale-110' : 'group-hover:scale-110'}`} 
                />
                <span className="relative z-10 font-semibold">
                  {isLiked ? 'Liked!' : 'Like This Game'}
                </span>
                
                {likeAnimation && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-blue-500 animate-ping opacity-75"></div>
                  </div>
                )}
              </button>
            </div>
            
            {/* Like status */}
            {isLiked && (
              <div className="mt-4 text-center">
                <span className="text-blue-300 text-sm font-medium bg-slate-800/50 px-3 py-1 rounded-full">
                  🎮 Salwa suka game ini!
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Timeline line and icon */}
        <div className="flex items-center justify-center w-2/12 relative">
          <div className="absolute w-1 bg-gradient-to-b from-blue-400 via-indigo-300 to-blue-400 
            rounded-full shadow-lg z-0"
            style={{ 
              height: index === timelineData.length - 1 ? '50%' : '100%',
              top: index === 0 ? '50%' : '0%',
              left: '50%',
              transform: 'translateX(-50%)'
            }}>
            <div className={`absolute inset-0 bg-gradient-to-b from-white/30 to-transparent 
              transition-opacity duration-1000 rounded-full
              ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
          </div>
          
          <div className={`relative w-20 h-20 bg-gradient-to-br ${cardColor} text-white text-3xl 
            rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 z-10
            ${isHovered ? 'scale-125 shadow-blue-400/50' : 'scale-100'}
            border-4 border-slate-800`}
            style={{
              transform: isHovered ? 'translateZ(30px) scale(1.25)' : 'translateZ(0px) scale(1)',
              transformStyle: 'preserve-3d'
            }}>
            <span className="relative z-10 drop-shadow-lg">{data.icon}</span>
            
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${cardColor} 
              ${isHovered ? 'animate-ping' : ''} opacity-30`} />
          </div>
          
          {index < timelineData.length - 1 && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" 
                style={{ animationDelay: `${index * 0.5}s` }} />
            </div>
          )}
        </div>
        
        <div className="w-5/12" />
      </div>
    </>
  );
};

// Main Timeline Component
function Timeline() {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [hoveredItem, setHoveredItem] = useState(null);
  const [likedItems, setLikedItems] = useState(new Set());
  const timelineRef = useRef(null);

  const handleLike = (index) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };
  
  useEffect(() => {
    const allIndices = timelineData.map((_, index) => index);
    setVisibleItems(new Set(allIndices));
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleItems(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1 }
    );
    
    setTimeout(() => {
      const items = document.querySelectorAll('[data-index]');
      items.forEach((item) => observer.observe(item));
    }, 100);
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-5 w-32 h-32 sm:top-20 sm:left-10 sm:w-40 sm:h-40 bg-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-40 h-40 sm:top-60 sm:right-20 sm:w-52 sm:h-52 bg-indigo-400/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-36 h-36 sm:bottom-40 sm:left-1/3 sm:w-48 sm:h-48 bg-blue-300/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/4 w-28 h-28 sm:right-1/3 sm:w-36 sm:h-36 bg-indigo-300/15 rounded-full blur-2xl animate-pulse delay-3000"></div>
      </div>

      {/* Enhanced header */}
      <div className="text-center py-12 sm:py-16 lg:py-20 relative z-10 px-4">
        <div className="inline-block">
          <h1 className="text-3xl pb-2 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight sm:leading-normal lg:leading-relaxed 
            font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 
            bg-clip-text text-transparent mb-4 sm:mb-6 drop-shadow-sm">
            Rekomendasi Game Roblox
          </h1>
          <div className="w-16 h-1 sm:w-24 sm:h-1.5 lg:w-32 lg:h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 
            mx-auto rounded-full shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent animate-pulse"></div>
          </div>
        </div>
        
        <p className="text-base sm:text-lg lg:text-xl text-slate-300 mt-4 sm:mt-6 lg:mt-10 max-w-2xl lg:max-w-3xl mx-auto px-4 leading-relaxed">
          Game-game Roblox seru yang bisa kita cobain bareng-bareng, ada yang horror, ada yang challenging, ada juga yang puzzle!
        </p>
      </div>
      
      {/* Timeline container */}
      <div ref={timelineRef} className="container mx-auto px-0 lg:px-4 pb-12 sm:pb-16 lg:pb-24 relative">
        {/* Desktop timeline line - hidden on mobile */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-indigo-500 
          transform -translate-x-1/2 opacity-20 hidden md:block"></div>
        
        <div className="flex flex-col items-center relative">
          {timelineData.map((data, index) => (
            <div key={index} data-index={index} className="w-full">
              <TimelineItem3D 
                data={data} 
                index={index} 
                isVisible={visibleItems.has(index)}
                onHover={setHoveredItem}
                isLiked={likedItems.has(index)}
                onLike={handleLike}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Enhanced footer */}
      <div className="text-center py-12 sm:py-16 lg:py-20 relative px-4">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-800/30 via-slate-900/10 to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Final message */}
          <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/30 max-w-2xl mx-auto">
            <p className="text-base sm:text-base text-slate-300 italic">
              I cherish every moment that we had, and i hope you do too! 
            </p>
          </div>
        </div>
      </div>
      
      {/* Floating action button for mobile - scroll to top */}
      <div className="fixed bottom-6 right-4 md:hidden z-30">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full 
            shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300
            flex items-center justify-center backdrop-blur-sm border border-blue-400/30"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Timeline;