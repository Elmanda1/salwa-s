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
    url: "/assets/gallery/salwa33.jpg",
    type: "image",
    description: "FOTO YG JADI BACKGROUND CHAT WA AKU. KAMU DISINI CANTIK PRETTY GORGEOUS MASYA ALLAH BGT COK, BIBIRNYA BAGUSS, MATANYA JUGAKK."
  },
  {
    url: "/assets/gallery/salwa34.jpg",
    type: "image",
    description: "cantikk sekalii, posenya lucu gemass, bibirnya juga baguss liptintnyaa."
  },
  {
    url: "/assets/video/salwa.mp4",
    type: "video",
    description: "Ini adalah contoh deskripsi untuk video. Anda bisa menjelaskan apa yang terjadi dalam video atau momen apa yang diabadikan."
  },
  { url: "/assets/gallery/salwa10.jpg", type: "image", description: "walau upside down. TPI TTP AJA CANTIK WOII" },
  { url: "/assets/gallery/salwa11.jpg", type: "image", description: "tem item gini kyk mau demo. TAPI LUCUU MUKANYAHH" },
  { url: "/assets/gallery/salwa12.PNG", type: "image", description: "kyk pose andalan km, okelah, ak suka, cantik, gorgeous, pretty, fabulous, engaging" },
  { url: "/assets/gallery/salwa13.JPG", type: "image", description: "filter filteran gini ttp aja lucuk, kocak woii" },
  { url: "/assets/gallery/salwa14.jpg", type: "image", description: "rambut jamet KLO kata kamu. TAPI MAKEUP NYA CLEANN, SUKAK WOII" },
  { url: "/assets/gallery/salwa15.jpg", type: "image", description: "panas yh kakk, LUCUKK PAKE KACAMAT" },
  { url: "/assets/gallery/salwa16.PNG", type: "image", description: "HAHAHAHA BIBIRNYA LUCU BANGET WOIII" },
  { url: "/assets/gallery/salwa17.PNG", type: "image", description: "OKAY GIRL, YOU LOOK PREETYY" },
  { url: "/assets/gallery/salwa18.PNG", type: "image", description: "MASYA ALLAH TABARAKALLAH, BIDADARI NYASAR COKKK" },
  { url: "/assets/gallery/salwa19.jpg", type: "image", description: "LUCUUU, camat mamm yahhh" },
  { url: "/assets/gallery/salwa1.jpg", type: "image", description: "LUCU SEKALII, TP JGN FOTO GELAP GELAPAN WOII" },
  { url: "/assets/gallery/salwa20.jpg", type: "image", description: "upside down lagiehhhh, TP LUCUUU kayak ekspresinya beda dari biasa kamu foto" },
  { url: "/assets/gallery/salwa21.jpg", type: "image", description: "NI UPSIDE DOWN JUGA SAMAA, TETEP AJA LUCU. 10000+ aura" },
  { url: "/assets/gallery/salwa22.PNG", type: "image", description: "hiu siapa ini lepas" },
  { url: "/assets/gallery/salwa23.PNG", type: "image", description: "ini hiu siapa cok lepasss" },
  { url: "/assets/gallery/salwa24.PNG", type: "image", description: "mihu mihu mihu, CUANTIKKK tp km 02 voter kh" },
  { url: "/assets/gallery/salwa25.jpg", type: "image", description: "WOWOWOWO, foto dibelakang sampe ngeliatin. CANTIKK ITEM ITEMM" },
  { url: "/assets/gallery/salwa26.JPG", type: "image", description: "KOK RAMBUTNYA KAYAK UNGU GITUU, BIBIRNYA BAGUSSS" },
  { url: "/assets/gallery/salwa27.jpg", type: "image", description: "HAHAHAH LUCUU, kayak. hujan badai angin ributt. rambutnya lucuu" },
  { url: "/assets/gallery/salwa28.jpg", type: "image", description: "WOWOWOWOWOWOO, CANTIK BGT LAGI WISUDAAN" },
  { url: "/assets/gallery/salwa29.jpg", type: "image", description: "mksdnya aph ya menatap sy begitu, sy meleleh tlong ditanggung yh" },
  { url: "/assets/gallery/salwa2.jpg", type: "image", description: "Kok lusyuuu BLUSHNYA BAGUSSS, AKU SUKAKK" },
  { url: "/assets/gallery/salwa30.jpg", type: "image", description: "yaaa haloo, udh kangen aja padahal tadi abis call an" },
  { url: "/assets/gallery/salwa31.PNG", type: "image", description: "HAHAHAHA INI LUCU BANGETT, VERY VERY EKSPRESIF" },
  { url: "/assets/gallery/salwa32.jpeg", type: "image", description: "JGN GELAP GELAPANNN, GABAIK BUAT MATAA. tp cantik" },
  { url: "/assets/gallery/salwa35.jpg", type: "image", description: "fresh cut km nihhh, first pap, cantikkk" },
  { url: "/assets/gallery/salwa36.jpg", type: "image", description: "ditatap begitu jadi maloe" },
  { url: "/assets/gallery/salwa37.jpg", type: "image", description: "LUCUUU, kayak ekspresi teges gitu" },
  { url: "/assets/gallery/salwa38.jpg", type: "image", description: "cuantik sekali rekkkkk" },
  { url: "/assets/gallery/salwa39.jpg", type: "image", description: "suster, tolong sus. cantiknya kelewatan sus" },
  { url: "/assets/gallery/salwa3.jpg", type: "image", description: "YANG INI BIBIRNYA BAGUSS SEKALII, MERAH MERONAA 🌹" },
  { url: "/assets/gallery/salwa40.jpg", type: "image", description: "CUANTIK SEKALI WOIII, CANTIK CANTIK CANTIKK" },
  { url: "/assets/gallery/salwa41.jpg", type: "image", description: "SALAH SATU FOTO YG AK SUKAK, ANGGUN SEKALI. CANTIK FRESHH" },
  { url: "/assets/gallery/salwa42.jpg", type: "image", description: "INIII CANTIKK SEKALIII. BINTANG 5" },
  { url: "/assets/gallery/salwa43.jpg", type: "image", description: "adekkkk, halo adekkk" },
  { url: "/assets/gallery/salwa44.jpg", type: "image", description: "trisakti bgt yah kakkk" },
  { url: "/assets/gallery/salwa45.jpg", type: "image", description: "ini yg ada di highlight ig kamu cokk" },
  { url: "/assets/gallery/salwa46.jpg", type: "image", description: "PAP YANG ABIS KM CRASH ITU GASII, tihati yahh lulu" },
  { url: "/assets/gallery/salwa47.jpg", type: "image", description: "yg kanan cantik, yg kiri bodoamat" },
  { url: "/assets/gallery/salwa48.jpg", type: "image", description: "pap sm syp itu kak" },
  { url: "/assets/gallery/salwa49.jpg", type: "image", description: "pap sm syp itu kak(2)" },
  { url: "/assets/gallery/salwa4.jpg", type: "image", description: "ANOTHER WEBCAM FOTOO, TPI AKU SUKA JUGAA" },
  { url: "/assets/gallery/salwa50.jpg", type: "image", description: "HAHAHAHAH INI BELI MOCHII NIHH, LUCU LUCU" },
  { url: "/assets/gallery/salwa51.jpg", type: "image", description: "damn right, tengill cokk. imuppp tapi" },
  { url: "/assets/gallery/salwa52.jpg", type: "image", description: "kyk ngeledek tp cantik, tp ngeledek, tp cantik" },
  { url: "/assets/gallery/salwa53.jpg", type: "image", description: "ap maksudnya nunjuk nunjuk bibir, bibir ku juga pink woi" },
  { url: "/assets/gallery/salwa54.jpg", type: "image", description: "MANIS BANGET, walau pake muka tengil andalan km itulah" },
  { url: "/assets/gallery/salwa55.jpg", type: "image", description: "ooooowwwwwwww" },
  { url: "/assets/gallery/salwa56.jpg", type: "image", description: "CANTIKKK, EKSPRESINYA SANGAT AMAT MANISSSS" },
  { url: "/assets/gallery/salwa57.jpg", type: "image", description: "ooooowwwwwwww" }, 
  { url: "/assets/gallery/salwa58.jpg", type: "image", description: " CANTIKKK, EKSPRESINYA SANGAT AMAT MANISSSS" },
  { url: "/assets/gallery/salwa59.jpg", type: "image", description: "CANRIK SEKALII, LEBARAN VIBES GITU LUCUUU" }, 
  { url: "/assets/gallery/salwa5.jpg", type: "image", description: "aman bang aman HAHAHAHA LUCUU" }, 
  { url: "/assets/gallery/salwa60.jpg", type: "image", description: "trisakti bgt ini yh kak (2)" }, 
  { url: "/assets/gallery/salwa61.jpg", type: "image", description: "ini msih fresh cok, bandung pap" }, 
  { url: "/assets/gallery/salwa62.jpg", type: "image", description: "bandung pap lgih" }, 
  { url: "/assets/gallery/salwa63.jpeg", type: "image", description: " BANDUNG PAP TENGILLL" },
  { url: "/assets/gallery/salwa64.jpeg", type: "image", description: " BANDUNG PAP TENGILLLLLL (2)" },
  { url: "/assets/gallery/salwa65.jpeg", type: "image", description: "knp semua bandung papnya tengil yak" }, 
  { url: "/assets/gallery/salwa66.jpeg", type: "image", description: "CANTIK" },
  { url: "/assets/gallery/salwa67.jpeg", type: "image", description: "INI KNP MUKANYA TENGIL SEMUA WOIII" },
  { url: "/assets/gallery/salwa68.jpeg", type: "image", description: "CUANTIKKK, BERKACAMATA LUCUK" },
  { url: "/assets/gallery/salwa6.jpg", type: "image", description: "HELLOO PRETTY EYESSS, FOTONYA BAGUSS" },
  { url: "/assets/gallery/salwa7.jpg", type: "image", description: "LUCUU POSENYAA, TP BS STOP GELAP GELAPAN NDA" },
  { url: "/assets/gallery/salwa8.PNG", type: "image", description: "pose tengil she said, IMUPP IYAHH" },
  { url: "/assets/gallery/salwa9.jpg", type: "image", description: "holy... CUANTIKK POLLL" }
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
            <h1 className="text-4xl pb-2 sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 
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
                        <video 
                          className="w-full h-full max-h-[50vh] sm:max-h-[60vh] object-contain"
                          controls
                          autoPlay={false}
                          preload="metadata"
                          onError={(e) => {
                            console.error('Video failed to load:', e);
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'flex';
                          }}
                        >
                          <source src={selectedItem.url} type="video/mp4" />
                          <source src={selectedItem.url} type="video/webm" />
                          <source src={selectedItem.url} type="video/ogg" />
                          Your browser does not support the video tag.
                        </video>
                        
                        {/* Fallback for video error */}
                        <div className="hidden items-center justify-center h-[40vh] sm:h-[60vh] bg-gradient-to-r from-blue-600 to-indigo-600">
                          <div className="text-white text-center p-4">
                            <svg className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                            <p className="text-lg sm:text-xl font-semibold">Video tidak dapat dimuat</p>
                            <p className="text-xs sm:text-sm opacity-80">Periksa lokasi file video</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={selectedItem.url}
                        alt="Gallery image"
                        className="max-h-[50vh] sm:max-h-[60vh] max-w-full object-contain rounded-lg shadow-2xl"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzNDI1NSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk0YTNiOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                        }}
                      />
                    )}
                  </div>

                  {/* Description Section */}
                  <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 mx-2 sm:mx-4 border border-slate-700/50 shadow-xl">
                    <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 mb-3 sm:mb-4 rounded-full"></div>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-200 leading-relaxed opacity-90">
                      {selectedItem.description || "Belum ada deskripsi untuk item ini."}
                    </p>
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
                {/* Image/Video Container with enhanced effects */}
                <div className="relative overflow-hidden">
                  {item.type === 'video' ? (
                    // Video thumbnail with proper poster
                    <div className="relative">
                      <video 
                        className="w-full h-auto object-cover transform transition-all duration-1000 group-hover:scale-110 group-hover:rotate-2 group-hover:brightness-110"
                        muted
                        preload="metadata"
                        onError={(e) => {
                          // Fallback to placeholder if video fails to load
                          const placeholder = document.createElement('div');
                          placeholder.className = 'w-full h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center';
                          placeholder.innerHTML = `
                            <div class="text-center text-slate-400">
                              <svg class="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                              <p class="text-sm">Video Preview</p>
                            </div>
                          `;
                          e.target.parentNode.appendChild(placeholder);
                          e.target.style.display = 'none';
                        }}
                      >
                        <source src={item.url} type="video/mp4" />
                        <source src={item.url} type="video/webm" />
                        <source src={item.url} type="video/ogg" />
                      </video>
                    </div>
                  ) : (
                    <img 
                      src={item.url} 
                      alt={`Gallery item ${index + 1}`}
                      className="w-full h-auto object-cover transform transition-all duration-1000 group-hover:scale-110 group-hover:rotate-2 group-hover:brightness-110"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzNDI1NSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk0YTNiOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                      }}
                    />
                  )}
                  
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
                        <span className="hidden sm:inline">Klik</span> untuk {item.type === 'video' ? 'putar' : 'melihat'}
                      </p>
                    </div>
                  </div>
                  
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