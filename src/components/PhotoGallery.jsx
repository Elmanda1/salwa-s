import React, { useState, useEffect } from 'react';

function PhotoGallery() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [shuffledPhotos, setShuffledPhotos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const mockPhotoData = [
    {
      url: "/assets/gallery/salwa1.jpg",
      type: "image",
      title: "Momen Spesial",
      description: "Ini adalah contoh deskripsi untuk gambar pertama. Anda bisa menambahkan cerita atau penjelasan tentang momen yang tertangkap dalam foto ini."
    },
    {
      url: "/assets/gallery/salwa2.jpg",
      type: "image",
      title: "Kenangan Indah",
      description: "Deskripsi untuk gambar kedua. Setiap foto memiliki ceritanya sendiri yang bisa Anda bagikan di sini."
    },
    {
      url: "/assets/gallery/video1.mp4",
      type: "video",
      title: "Video Memorable",
      description: "Ini adalah contoh deskripsi untuk video. Anda bisa menjelaskan apa yang terjadi dalam video atau momen apa yang diabadikan."
    }
  ];

  // Shuffle array function
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Shuffle photos on component mount
  useEffect(() => {
    const shuffled = shuffleArray(mockPhotoData);
    setShuffledPhotos(shuffled);
    // Add staggered animation delay
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background decorative elements - responsive */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-32 sm:w-64 h-32 sm:h-64 bg-blue-400/20 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-40 sm:w-80 h-40 sm:h-80 bg-indigo-400/15 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-96 h-48 sm:h-96 bg-slate-400/10 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating particles - responsive */}
        <div className="absolute top-1/4 left-1/4 w-1 sm:w-2 h-1 sm:h-2 bg-blue-400/60 rounded-full animate-bounce" style={{ animationDuration: '3s', animationDelay: '0s' }}></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-indigo-400/80 rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-2 sm:w-3 h-2 sm:h-3 bg-slate-400/40 rounded-full animate-bounce" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 sm:w-2 h-1 sm:h-2 bg-blue-500/30 rounded-full animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header Section - responsive */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 
              bg-clip-text text-transparent mb-5 drop-shadow-sm px-4">
              Galeri Kenangan
            </h1>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-6 sm:mb-8 rounded-full"></div>
            <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed opacity-90 px-4">
              Koleksi momen-momen berharga yang telah kamu lalui. Setiap foto pastinya menyimpan cerita dan kenangan yang memorable buat kamu.
            </p>
          </div>

          {/* Modal Popup - Enhanced with description */}
          {selectedItem && (
            <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4" onClick={closeModal}>
              <div className="relative max-w-6xl max-h-[95vh] w-full flex flex-col items-center justify-center">
                {/* Close button - responsive */}
                <button
                  onClick={closeModal}
                  className="absolute top-2 sm:top-4 right-2 sm:right-4 z-20 w-10 sm:w-12 h-10 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Content Container */}
                <div className="w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  {/* Media Container */}
                  <div className="flex justify-center mb-4 sm:mb-6">
                    {selectedItem.type === 'video' ? (
                      <div className="relative bg-black rounded-lg overflow-hidden max-h-[50vh] sm:max-h-[60vh] w-full max-w-4xl">
                        <div className="flex items-center justify-center h-[40vh] sm:h-[60vh] bg-gradient-to-r from-blue-600 to-indigo-600">
                          <div className="text-white text-center p-4">
                            <svg className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                            <p className="text-lg sm:text-xl font-semibold">Video Player</p>
                            <p className="text-xs sm:text-sm opacity-80">Click to play video</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={selectedItem.url}
                        alt="Gallery image"
                        className="max-h-[50vh] sm:max-h-[60vh] max-w-full object-contain rounded-lg shadow-2xl"
                      />
                    )}
                  </div>

                  {/* Description Section */}
                  <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 mx-2 sm:mx-4 border border-slate-700/50 shadow-xl">
                    <h3 className="text-xl sm:text-2xl font-bold text-blue-400 mb-3 sm:mb-4">
                      {selectedItem.title || "Tanpa Judul"}
                    </h3>
                    <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 mb-3 sm:mb-4 rounded-full"></div>
                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed opacity-90">
                      {selectedItem.description || "Belum ada deskripsi untuk item ini."}
                    </p>
                    
                    {/* Optional metadata */}
                    <div className="mt-4 sm:mt-6 pt-4 border-t border-slate-700/30">
                      <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-slate-400">
                        <span className="bg-slate-800/50 px-2 sm:px-3 py-1 rounded-full">
                          {selectedItem.type === 'video' ? 'Video' : 'Foto'}
                        </span>
                        <span className="bg-slate-800/50 px-2 sm:px-3 py-1 rounded-full">
                          Galeri Kenangan
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}  

          {/* Masonry Grid - Mobile 2 kolom, Tablet 3 kolom, Desktop 4 kolom */}
          <div className="columns-2 md:columns-3 xl:columns-4 gap-2 sm:gap-4 md:gap-6 space-y-2 sm:space-y-4 md:space-y-6">
            {shuffledPhotos.map((item, index) => (
              <div 
                key={index} 
                className={`break-inside-avoid group relative bg-slate-900/80 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border border-slate-700/50 cursor-pointer transform transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 sm:hover:-translate-y-2 hover:rotate-1 ${
                  isLoaded 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: `${index * 50}ms`,
                  animationDelay: `${index * 50}ms`
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleItemClick(item)}
              >
                {/* Image Container with enhanced effects */}
                <div className="relative overflow-hidden">
                  <img 
                    src={item.url} 
                    alt={item.title || `Gallery item ${index + 1}`}
                    className="w-full h-auto object-cover transform transition-all duration-1000 group-hover:scale-110 group-hover:rotate-2 group-hover:brightness-110" 
                  />
                  
                  {/* Multi-layer gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-indigo-400/10 to-blue-600/30 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200"></div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                  
                  {/* Touch/hover indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-300 p-2 sm:p-4">
                      <p className="text-xs sm:text-sm font-semibold bg-black/50 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full">
                        <span className="sm:hidden">Tap</span>
                        <span className="hidden sm:inline">Klik</span> untuk melihat
                      </p>
                    </div>
                  </div>
                  
                  {/* Title overlay */}
                  {item.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <p className="text-white text-xs sm:text-sm font-medium truncate">
                        {item.title}
                      </p>
                    </div>
                  )}
                  
                  {/* Animated corner decorations - smaller on mobile */}
                  <div className="absolute top-1 sm:top-2 left-1 sm:left-2 w-4 sm:w-6 h-4 sm:h-6 border-l-2 border-t-2 border-blue-400/60 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-1 sm:-translate-x-2 -translate-y-1 sm:-translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                  <div className="absolute top-1 sm:top-2 right-1 sm:right-2 w-4 sm:w-6 h-4 sm:h-6 border-r-2 border-t-2 border-blue-400/60 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-1 sm:translate-x-2 -translate-y-1 sm:-translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                  <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 w-4 sm:w-6 h-4 sm:h-6 border-l-2 border-b-2 border-blue-400/60 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-1 sm:-translate-x-2 translate-y-1 sm:translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                  <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 w-4 sm:w-6 h-4 sm:h-6 border-r-2 border-b-2 border-blue-400/60 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-1 sm:translate-x-2 translate-y-1 sm:translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                  
                  {/* Pulse ring effect */}
                  <div className="absolute inset-0 border-2 border-blue-400/50 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"></div>
                  <div className="absolute inset-0 border border-indigo-400/30 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 delay-200"></div>

                  {/* Video indicator */}
                  {item.type === 'video' && (
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-black/70 backdrop-blur-sm rounded-full p-1.5 sm:p-2">
                      <svg className="w-3 sm:w-4 h-3 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom decoration - responsive */}
          <div className="text-center mt-16 sm:mt-20">
            <div className="bg-slate-900/70 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-700/50 max-w-lg mx-auto">
              <p className="text-slate-200 italic text-lg sm:text-xl mb-4 hover:text-slate-100 transition-colors duration-300 opacity-90 leading-relaxed">
                "Setiap foto adalah kenangan yang tak ternilai. Cerita yang terabadikan dalam bingkai waktu."
              </p>
              <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoGallery;