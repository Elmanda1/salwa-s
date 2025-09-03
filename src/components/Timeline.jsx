import React, { useState, useEffect, useRef } from 'react';
import { Heart, Star, MessageCircle, Camera, Clock, CheckCircle, X } from 'lucide-react';

// Sample timeline data
const timelineData = [
  {
    date: "14 Februari 2024",
    title: "First Date",
    description: "Hari pertama kita bertemu dan memulai cerita indah ini. Momen yang akan selalu terkenang di hati.",
    category: "Love",
    icon: "💕",
    image: "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=400&h=300&fit=crop"
  },
  {
    date: "March 2024",
    title: "Our Adventure",
    description: "Petualangan pertama kita berdua, exploring new places and creating beautiful memories together.",
    category: "Travel",
    icon: "✈️",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop"
  },
  {
    date: "April 2024",
    title: "Special Milestone",
    description: "Momen spesial yang membuat hubungan kita semakin kuat dan meaningful.",
    category: "Milestone",
    icon: "🌟",
    image: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&h=300&fit=crop"
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

// Notification Component - Enhanced for mobile
const Notification = ({ isVisible, message, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    }
  }, [isVisible]);
  
  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 300);
  };
  
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(handleClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);
  
  if (!isVisible && !isAnimating) return null;
  
  return (
    <div className={`fixed top-4 left-4 right-4 sm:top-6 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 z-50 
      transition-all duration-300 ease-out max-w-sm sm:max-w-md mx-auto
      ${isAnimating && isVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-8 opacity-0 scale-95'}`}>
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl 
        shadow-2xl backdrop-blur-sm border border-blue-400/30 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl sm:rounded-2xl"></div>
        
        {/* Animated background sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-2 left-4 text-blue-200 animate-pulse text-xs">✨</div>
          <div className="absolute bottom-2 right-6 text-blue-200 animate-pulse delay-500 text-xs">⭐</div>
          <div className="absolute top-3 right-4 text-blue-200 animate-pulse delay-1000 text-xs">💫</div>
        </div>
        
        <div className="flex items-center gap-3 relative z-10">
          <div className="relative">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-bounce" />
            <div className="absolute inset-0 bg-white/30 rounded-full animate-ping opacity-75"></div>
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm sm:text-base">Berhasil Terkirim!</p>
            <p className="text-blue-100 text-xs sm:text-sm truncate">{message}</p>
          </div>
          
          <button 
            onClick={handleClose}
            className="text-blue-200 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-white/10 flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-blue-400 rounded-full animate-pulse w-full">
          <div className="h-full bg-white/30 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Timeline Item - Fully responsive
const TimelineItem3D = ({ data, index, isVisible, onHover, isLiked, onLike, message, onMessageChange, onSubmit }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [likeAnimation, setLikeAnimation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
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
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit(`card${index}`);
    } finally {
      setIsSubmitting(false);
    }
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
                {data.category}
              </div>
              
              {/* Date */}
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-blue-400" />
                <time className="text-sm font-bold text-blue-300">{data.date}</time>
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-bold mb-3 text-slate-100 leading-tight">
                {data.title}
              </h3>
              
              {/* Image */}
              {data.image && !imageError && (
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <img 
                    src={data.image}
                    alt={data.title}
                    className="w-full h-48 object-cover"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                </div>
              )}
              
              {/* Description */}
              <p className="text-slate-300 leading-relaxed text-sm mb-4">
                {data.description}
              </p>
              
              {/* Message input */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-blue-300">Pesan khusus:</span>
                </div>
                <textarea
                  value={message || ""}
                  onChange={(e) => onMessageChange(index, e.target.value)}
                  placeholder="Tulis kenangan spesial..."
                  className="w-full px-3 py-2 border border-slate-600 rounded-lg focus:border-blue-500 
                    focus:outline-none transition-all duration-300 text-slate-200 placeholder-slate-400
                    bg-slate-800/50 backdrop-blur-sm text-sm resize-none h-16"
                  disabled={isSubmitting}
                />
              </div>
              
              {/* Action buttons */}
              <div className="flex gap-2">
                <button 
                  onClick={handleSubmit}
                  disabled={!message?.trim() || isSubmitting}
                  className={`flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 px-4 
                    rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 
                    font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5
                    disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed
                    relative overflow-hidden text-sm`}
                >
                  {isSubmitting && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  
                  <span className={`transition-opacity duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                    Simpan
                  </span>
                </button>
                
                <button 
                  onClick={handleLikeClick}
                  disabled={isSubmitting}
                  className={`bg-slate-800/70 hover:bg-slate-700/70 text-blue-400 py-2.5 px-3 
                    rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg
                    transform hover:-translate-y-0.5 relative overflow-hidden
                    ${isLiked ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                    disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed`}
                >
                  <Heart 
                    className={`w-4 h-4 transition-all duration-300 relative z-10
                      ${isLiked ? 'fill-current scale-110' : 'hover:scale-110'}`} 
                  />
                  
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
                    ✨ Moment ini disukai
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
              <span className="relative z-10">{data.category}</span>
            </div>
            
            {/* Date */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-blue-400" />
                <time className="text-lg font-bold text-blue-300">{data.date}</time>
              </div>
            </div>
            
            {/* Title */}
            <h3 className="text-3xl font-bold mb-6 text-slate-100 relative group leading-tight">
              {data.title}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 
                group-hover:w-full transition-all duration-500 rounded-full"></div>
            </h3>
            
            {/* Image */}
            {data.image && !imageError && (
              <div className="relative mb-6 group overflow-hidden rounded-2xl">
                <img 
                  src={data.image}
                  alt={data.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )}
            
            {/* Description */}
            <p className="text-slate-300 leading-relaxed text-lg mb-6">
              {data.description}
            </p>
            
            {/* Message input */}
            <div className="relative group mb-6">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">Pesan khusus:</span>
              </div>
              <textarea
                value={message || ""}
                onChange={(e) => onMessageChange(index, e.target.value)}
                placeholder="Tulis kenangan spesial yang kamu inget dari moment ini..."
                className="w-full px-4 py-3 border-2 border-slate-600 rounded-xl focus:border-blue-500 
                  focus:outline-none transition-all duration-300 text-slate-200 placeholder-slate-400
                  bg-slate-800/50 backdrop-blur-sm hover:bg-slate-800/70 
                  focus:bg-slate-800 resize-none h-20"
                disabled={isSubmitting}
              />
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-3">
              <button 
                onClick={handleSubmit}
                disabled={!message?.trim() || isSubmitting}
                className={`flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 
                  rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 
                  font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 
                  disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed
                  relative overflow-hidden group`}
              >
                {isSubmitting && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                
                <span className={`transition-opacity duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                  Simpan Kenangan
                </span>
                
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 
                  transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl"></div>
              </button>
              
              <button 
                onClick={handleLikeClick}
                disabled={isSubmitting}
                className={`relative bg-slate-800/70 hover:bg-slate-700/70 text-blue-400 py-3 px-4 
                  rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl
                  transform hover:-translate-y-1 overflow-hidden group
                  ${isLiked ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                  disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed`}
              >
                <Heart 
                  className={`w-5 h-5 transition-all duration-300 relative z-10
                    ${isLiked ? 'fill-current scale-110' : 'group-hover:scale-110'}`} 
                />
                
                {likeAnimation && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-blue-500 animate-ping opacity-75"></div>
                  </div>
                )}
              </button>
            </div>
            
            {/* Like status */}
            {isLiked && (
              <div className="mt-3 text-center">
                <span className="text-blue-300 text-sm font-medium bg-slate-800/50 px-3 py-1 rounded-full">
                  ✨ Mahesa menyukai moment ini
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
  const [messages, setMessages] = useState({});
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [hoveredItem, setHoveredItem] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [likedItems, setLikedItems] = useState(new Set());
  const [notification, setNotification] = useState({ show: false, message: "" });
  const timelineRef = useRef(null);

  const handleMessageSubmit = async (cardIdentifier) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setNotification({
        show: true,
        message: "Kenangan spesial berhasil disimpan! ✨"
      });
      
      const cardIndex = parseInt(cardIdentifier.replace('card', ''));
      setMessages(prev => ({
        ...prev,
        [cardIndex]: ""
      }));
    } catch (error) {
      setNotification({
        show: true,
        message: "Terjadi kesalahan saat menyimpan kenangan"
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ show: false, message: "" });
  };

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
  
  const handleMessageChange = (index, message) => {
    setMessages(prev => ({
      ...prev,
      [index]: message
    }));
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
  
  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const progress = scrollTop / (scrollHeight - clientHeight);
        setScrollProgress(progress);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Notification */}
      <Notification 
        isVisible={notification.show}
        message={notification.message}
        onClose={handleCloseNotification}
      />
      
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight sm:leading-normal lg:leading-relaxed 
            font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 
            bg-clip-text text-transparent mb-4 sm:mb-6 drop-shadow-sm">
            Jejak Langkah Kita
          </h1>
          <div className="w-16 h-1 sm:w-24 sm:h-1.5 lg:w-32 lg:h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 
            mx-auto rounded-full shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent animate-pulse"></div>
          </div>
        </div>
        
        <p className="text-base sm:text-lg lg:text-xl text-slate-300 mt-4 sm:mt-6 lg:mt-10 max-w-2xl lg:max-w-3xl mx-auto px-4 leading-relaxed">
          Setiap momen berharga yang sudah kita lalui bersama dan kenangan yang semoga saja terus kita ciptakan.
        </p>
        
        {/* Enhanced decorative dots */}
        <div className="flex justify-center mt-4 sm:mt-6 lg:mt-8 space-x-2 sm:space-x-3">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full animate-bounce shadow-lg" 
              style={{ animationDelay: `${i * 0.2}s` }} 
            />
          ))}
        </div>
      </div>
      
      {/* Mobile timeline progress indicator */}
      <div className="block md:hidden sticky top-0 z-20 bg-slate-900/90 backdrop-blur-sm border-b border-slate-700/50">
        <div className="h-1 bg-slate-700">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
        <div className="px-4 py-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Progress Timeline</span>
            <span>{Math.round(scrollProgress * 100)}%</span>
          </div>
        </div>
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
                message={messages[index]}
                onMessageChange={handleMessageChange}
                onSubmit={handleMessageSubmit}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Enhanced footer */}
      <div className="text-center py-12 sm:py-16 lg:py-20 relative px-4">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-800/30 via-slate-900/10 to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 
              rounded-full shadow-2xl mb-6 animate-pulse">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-current" />
            </div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-200 mb-3 sm:mb-4">
            I treasure every moments with you 
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-400 mb-6 sm:mb-8">
            I hope you do too! 
          </p>
          
          {/* Decorative elements */}
          <div className="flex justify-center items-center space-x-4 sm:space-x-6 opacity-60">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-blue-400"></div>
            <Star className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 animate-spin" style={{ animationDuration: '8s' }} />
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-indigo-400"></div>
          </div>
          
          {/* Final message */}
          <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/30 max-w-2xl mx-auto">
            <p className="text-sm sm:text-base text-slate-300 italic">
              "Setiap kenangan yang kita buat adalah harta yang tak ternilai. 
              Terima kasih sudah menjadi bagian dari cerita indah ini." ✨
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