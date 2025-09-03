import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizQuestions } from '../data/quizQuestions';

function QuizPage() {
  const navigate = useNavigate(); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [showChatPage, setShowChatPage] = useState(false);
  const [showMemoirPage, setShowMemoirPage] = useState(false);
  const [completedChats, setCompletedChats] = useState([]);
  const [currentChatIndex, setCurrentChatIndex] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showQuizContent, setShowQuizContent] = useState(false);
  
  // Ref untuk auto-scroll
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Initial animation untuk quiz content
  useEffect(() => {
    const timer = setTimeout(() => setShowQuizContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Function to render formatted text with basic HTML support
  const renderFormattedText = (text) => {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic text
      .replace(/\n/g, '<br>') // Line breaks
      .replace(/_(.*?)_/g, '<u>$1</u>'); // Underlined text
  };

  // Auto-scroll ke bawah
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll ke bawah setiap kali ada perubahan pada chat
  useEffect(() => {
    scrollToBottom();
  }, [completedChats, isTyping, showTypingIndicator, typingText]);

  // Get chat date from current question data
  const getChatDate = () => {
    return quizQuestions[currentQuestionIndex].chatDate;
  };

  // Function to render message content with media support
  const renderMessageContent = (chat) => {
    if (chat.type === 'image') {
      return (
        <div className="space-y-2">
          <div className="relative group">
            <img 
              src={chat.media} 
              alt={chat.alt || "Chat image"} 
              className="max-w-full max-h-48 rounded-lg object-cover cursor-pointer hover:opacity-95 transition-opacity duration-200"
              onClick={() => window.open(chat.media, '_blank')}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-200 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>
          {chat.message && (
            <p className="text-sm leading-relaxed font-medium">{chat.message}</p>
          )}
        </div>
      );
    } else if (chat.type === 'video') {
      return (
        <div className="space-y-2">
          <div className="relative">
            <video 
              controls 
              className="max-w-full max-h-48 rounded-lg object-cover"
              poster={chat.thumbnail}
            >
              <source src={chat.media} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          {chat.message && (
            <p className="text-sm leading-relaxed font-medium">{chat.message}</p>
          )}
        </div>
      );
    } else if (chat.type === 'sticker') {
      return (
        <div className="space-y-2">
          <div className="flex justify-center">
            <img 
              src={chat.media} 
              alt="Sticker" 
              className="w-24 h-24 object-contain"
            />
          </div>
          {chat.message && (
            <p className="text-sm leading-relaxed font-medium">{chat.message}</p>
          )}
        </div>
      );
    } else {
      // Regular text message
      return (
        <p className="text-sm leading-relaxed font-medium">{chat.message}</p>
      );
    }
  };

  // Enhanced chat animation logic - smoother transitions
  useEffect(() => {
    if (showChatPage && currentChatIndex < quizQuestions[currentQuestionIndex].chatMemory.length) {
      const currentChat = quizQuestions[currentQuestionIndex].chatMemory[currentChatIndex];
      
      if (currentChat.sender === 'you') {
        // For "you" messages (pink), show typing animation immediately
        setIsTyping(true);
        setTypingText('');
        
        if (currentChat.type === 'image' || currentChat.type === 'video' || currentChat.type === 'sticker') {
          // For media messages, show instantly without typing animation
          setIsTyping(false);
          setCompletedChats(prev => [...prev, currentChat]);
          setCurrentChatIndex(prev => prev + 1);
          setTypingText('');
        } else {
          // For text messages, show typing animation
          const cleanMessage = currentChat.message;
          let index = 0;
          const typeInterval = setInterval(() => {
            if (index < cleanMessage.length) {
              setTypingText(cleanMessage.substring(0, index + 1));
              index++;
            } else {
              clearInterval(typeInterval);
              setIsTyping(false);
              
              // Immediately add to completed chats without delay
              setCompletedChats(prev => [...prev, currentChat]);
              setCurrentChatIndex(prev => prev + 1);
              setTypingText('');
            }
          }, 60);
          
          return () => clearInterval(typeInterval);
        }
      } else {
        setShowTypingIndicator(true);
        
        setTimeout(() => {
          setShowTypingIndicator(false);
          setIsTyping(true);
          setTypingText('');
          
          if (currentChat.type === 'image' || currentChat.type === 'video' || currentChat.type === 'sticker') {
            // For media messages, show instantly without typing animation
            setIsTyping(false);
            setCompletedChats(prev => [...prev, currentChat]);
            setCurrentChatIndex(prev => prev + 1);
            setTypingText('');
          } else {
            // For text messages, show typing animation
            const cleanMessage = currentChat.message;
            let index = 0;
            const typeInterval = setInterval(() => {
              if (index < cleanMessage.length) {
                setTypingText(cleanMessage.substring(0, index + 1));
                index++;
              } else {
                clearInterval(typeInterval);
                setIsTyping(false);
                
                // Immediately add to completed chats without delay
                setCompletedChats(prev => [...prev, currentChat]);
                setCurrentChatIndex(prev => prev + 1);
                setTypingText('');
              }
            }, 60);
            
            return () => clearInterval(typeInterval);
          }
        }, 1200);
      }
    }
  }, [showChatPage, currentChatIndex, currentQuestionIndex]);

  const handleAnswerOptionClick = (selectedOption) => {
    if (answerStatus) return;
    
    setIsTransitioning(true);
    setSelectedAnswer(selectedOption);
    const isCorrect = selectedOption === quizQuestions[currentQuestionIndex].correctAnswer;
    setAnswerStatus(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) setScore(score + 1);
    
    // Check if current question has chat or memoir content
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    setTimeout(() => {
      if (currentQuestion.hasChat) {
        // Show chat page
        setShowChatPage(true);
        setCompletedChats([]);
        setCurrentChatIndex(0);
        setTypingText('');
        setShowTypingIndicator(false);
        setIsTyping(false);
      } else {
        // Show memoir page
        setShowMemoirPage(true);
      }
      setIsTransitioning(false);
    }, 1500);
  };

  const handleNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    
    setIsTransitioning(true);
    setShowQuizContent(false);
    
    setTimeout(() => {
      if (nextQuestionIndex < quizQuestions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
        setSelectedAnswer(null);
        setAnswerStatus(null);
        setShowChatPage(false);
        setShowMemoirPage(false);
        setCompletedChats([]);
        setCurrentChatIndex(0);
        setTypingText('');
        setShowTypingIndicator(false);
        setIsTyping(false);
        
        // Re-trigger enter animation
        setTimeout(() => {
          setShowQuizContent(true);
          setIsTransitioning(false);
        }, 100);
      } else {
        setShowScore(true);
        setShowChatPage(false);
        setShowMemoirPage(false);
        setTimeout(() => {
          setShowQuizContent(true);
          setIsTransitioning(false);
        }, 100);
      }
    }, 300);
  };

  const getButtonClassName = (option) => {
    const baseClass = "w-full text-left p-4 md:p-5 rounded-xl md:rounded-2xl transition-all duration-300 font-medium border-2 backdrop-blur-sm text-sm md:text-base";
    if (!answerStatus) {
      return `${baseClass} border-slate-300/50 bg-white/80 text-slate-700 hover:bg-blue-50/80 hover:border-blue-400/60 hover:shadow-lg transform hover:scale-[1.02] hover:-translate-y-1`;
    }
    const isThisButtonTheSelectedOne = option === selectedAnswer;
    if (isThisButtonTheSelectedOne) {
      return answerStatus === 'correct' 
        ? `${baseClass} bg-gradient-to-r from-emerald-500 to-green-600 border-emerald-400 text-white shadow-xl transform scale-[1.02] -translate-y-1` 
        : `${baseClass} bg-gradient-to-r from-red-500 to-rose-600 border-red-400 text-white shadow-xl transform scale-[1.02] -translate-y-1`;
    }
    return `${baseClass} border-slate-200/30 bg-slate-50/50 text-slate-400 cursor-not-allowed opacity-50`;
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Aurora effects */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-slate-400/15 to-blue-300/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-indigo-300/10 to-blue-200/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Floating particles */}
        <div className="absolute top-10 left-10 w-3 h-3 bg-blue-400/60 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-20 right-20 w-2 h-2 bg-indigo-300/60 rounded-full animate-pulse delay-3000"></div>
        <div className="absolute bottom-20 left-32 w-2 h-2 bg-slate-400/60 rounded-full animate-pulse delay-1500"></div>
        <div className="absolute bottom-40 right-12 w-1 h-1 bg-blue-300/60 rounded-full animate-pulse delay-2500"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Memoir Page */}
      {showMemoirPage && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 flex flex-col animate-fade-in-scale">
          {/* Header */}
          <div className="bg-slate-800/95 backdrop-blur-xl shadow-2xl p-4 md:p-6 border-b border-blue-400/20 animate-slide-down">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-xl">
                    <span className="text-xl md:text-2xl">📖</span>
                  </div>
                  <div>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-100">Memoir</h1>
                    <p className="text-sm md:text-base text-slate-300 font-medium">Kenangan tentang Salwa</p>
                  </div>
                </div>
                <div className="text-center bg-gradient-to-r from-blue-500/20 to-indigo-500/20 px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl border border-blue-400/30 backdrop-blur-sm">
                  <p className="text-sm font-bold text-slate-100">
                    {answerStatus === 'correct' ? '✅ Bener banget, Hesa!' : '❌ Kurang tepat!'}
                  </p>
                  {answerStatus === 'incorrect' && (
                    <p className="text-xs text-slate-300 mt-1">
                      Jawabannya: {currentQuestion.correctAnswer}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Memoir Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 border border-slate-600/50 animate-fade-in-up">
                {/* Title */}
                <div className="text-center mb-6 md:mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-3 md:mb-4" style={{
                    fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif'
                  }}>
                    {currentQuestion.memoirTitle}
                  </h2>
                  <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mx-auto"></div>
                </div>

                {/* Content */}
                <div className="space-y-4 md:space-y-6">
                  {currentQuestion.memoirContent.map((paragraph, index) => (
                    <div 
                      key={index}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.5}s` }}
                    >
                      <p 
                        className="text-base md:text-lg leading-relaxed text-slate-200 font-medium"
                        dangerouslySetInnerHTML={{ __html: renderFormattedText(paragraph) }}
                      />
                    </div>
                  ))}
                </div>

                {/* Decorative Elements */}
                <div className="mt-6 md:mt-8 flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Memory Context & Continue Button */}
          <div className="p-4 md:p-6 bg-slate-800/95 backdrop-blur-xl border-t border-blue-400/20 animate-slide-up">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl md:rounded-2xl p-4 md:p-6 border border-blue-400/30 mb-4 md:mb-6 shadow-xl backdrop-blur-sm">
                <p 
                  className="text-center text-slate-100 font-bold leading-relaxed text-sm md:text-base"
                  dangerouslySetInnerHTML={{ __html: renderFormattedText(currentQuestion.memoryContext) }}
                />
              </div>
              
              <button
                onClick={handleNextQuestion}
                className="group relative w-full py-4 px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-600 rounded-2xl font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 active:scale-95 text-lg overflow-hidden"
                style={{
                  boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(147, 197, 253, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(147, 197, 253, 0.2)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <span className="relative z-10 tracking-wide">
                  {currentQuestionIndex + 1 < quizQuestions.length ? 'Lanjut ke Pertanyaan Berikutnya' : 'Lihat Hasil'}
                </span>
                <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/30 to-transparent w-6 h-full transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[300%] transition-transform duration-700"></div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Page */}
      {showChatPage && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 flex flex-col animate-fade-in-scale">
          {/* Enhanced Header dengan Profile Image */}
          <div className="bg-slate-800/90 backdrop-blur-xl shadow-2xl p-3 md:p-4 flex items-center justify-between border-b border-slate-600/50 animate-slide-down">
            <div className="flex items-center space-x-3">
              <div className="relative">
                {/* Profile Image Container */}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shadow-xl border-2 border-blue-400/50">
                  {/* Placeholder untuk image - ganti src dengan path foto Salwa */}
                  <img 
                    src="/public/assets/salwa.jpg" 
                    alt="Salwa Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback jika gambar tidak ditemukan
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback div jika gambar tidak ditemukan */}
                  <div 
                    className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-base md:text-lg"
                    style={{ display: 'none' }}
                  >
                    S
                  </div>
                </div>
                {/* Online Status Indicator */}
                <div className="absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-emerald-500 rounded-full border-2 border-slate-800"></div>
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-base md:text-lg">Salwey</h3>
                <p className="text-xs md:text-sm text-emerald-400 font-medium">● online</p>
              </div>
            </div>
            <div className="text-center bg-gradient-to-r from-blue-500/20 to-indigo-500/20 px-3 md:px-4 py-2 rounded-full border border-blue-400/30 backdrop-blur-sm">
              <p className="text-xs md:text-sm font-bold text-slate-100">
                {answerStatus === 'correct' ? '✅ Bener banget!' : '❌ Kurang tepat!'}
              </p>
              {answerStatus === 'incorrect' && (
                <p className="text-xs text-slate-300 mt-1">
                  Jawabannya: {quizQuestions[currentQuestionIndex].correctAnswer}
                </p>
              )}
            </div>
          </div>

          {/* Date Header */}
          <div className="py-2 md:py-3 animate-fade-in-up">
            <div className="text-center">
              <p className="text-xs md:text-sm font-bold text-slate-200 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 px-3 md:px-4 py-1.5 md:py-2 rounded-full mx-auto inline-block border border-blue-400/30 backdrop-blur-sm">
                {getChatDate()}
              </p>
            </div>
          </div>

          {/* Enhanced Chat Area with Auto-scroll */}
          <div 
            ref={chatContainerRef}
            className="flex-1 p-6 space-y-4 overflow-y-auto chat-container"
          >
            {/* Show all completed chats - these stay visible permanently */}
            {completedChats.map((chat, index) => (
              <div 
                key={`completed-${index}`}
                className={`flex ${chat.sender === 'me' ? 'justify-start' : 'justify-end'} animate-chat-appear-completed`}
              >
                <div className={`max-w-xs px-5 py-3 rounded-2xl shadow-xl backdrop-blur-sm ${
                  chat.sender === 'me' 
                    ? 'bg-slate-700/80 text-slate-100 rounded-bl-md border border-slate-600/50' 
                    : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-md border border-blue-400/30'
                }`}>
                  {renderMessageContent(chat)}
                  <p className="text-xs opacity-70 mt-2 text-right font-medium">{chat.time}</p>
                </div>
              </div>
            ))}
            
            {showTypingIndicator && (
              <div className="flex justify-start animate-chat-appear">
                <div className="bg-slate-700/80 text-slate-100 rounded-2xl rounded-bl-md border border-slate-600/50 px-5 py-3 shadow-xl backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
                    </div>
                    <span className="text-xs text-slate-300">Salwey sedang mengetik...</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Currently typing chat */}
            {isTyping && currentChatIndex < quizQuestions[currentQuestionIndex].chatMemory.length && (
              <div className={`flex ${quizQuestions[currentQuestionIndex].chatMemory[currentChatIndex].sender === 'me' ? 'justify-start' : 'justify-end'} animate-chat-appear-typing`}>
                <div className={`max-w-xs px-5 py-3 rounded-2xl shadow-xl backdrop-blur-sm ${
                  quizQuestions[currentQuestionIndex].chatMemory[currentChatIndex].sender === 'me' 
                    ? 'bg-slate-700/80 text-slate-100 rounded-bl-md border border-slate-600/50' 
                    : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-md border border-blue-400/30'
                }`}>
                  <p className="text-sm leading-relaxed font-medium">
                    {typingText}
                    <span className="animate-pulse text-blue-300 font-bold">|</span>
                  </p>
                  <p className="text-xs opacity-70 mt-2 text-right font-medium">
                    {quizQuestions[currentQuestionIndex].chatMemory[currentChatIndex].time}
                  </p>
                </div>
              </div>
            )}
            
            {/* Invisible div for auto-scroll */}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Memory Context */}
          <div className="p-6 bg-slate-800/90 backdrop-blur-xl border-t border-slate-600/50">
            <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl p-5 border border-blue-400/30 mb-4 shadow-xl backdrop-blur-sm">
              <p className="text-sm text-slate-100 font-bold text-center leading-relaxed">
                {quizQuestions[currentQuestionIndex].memoryContext}
              </p>
            </div>
            
            {/* Enhanced Continue Button */}
            {currentChatIndex >= quizQuestions[currentQuestionIndex].chatMemory.length && (
              <button
                onClick={handleNextQuestion}
                className="group relative w-full py-4 px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-600 rounded-2xl font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 active:scale-95 text-lg overflow-hidden"
                style={{
                  boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(147, 197, 253, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(147, 197, 253, 0.2)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <span className="relative z-10 tracking-wide">
                  {currentQuestionIndex + 1 < quizQuestions.length ? 'Lanjut ke Pertanyaan Berikutnya' : 'Lihat Hasil'}
                </span>
                <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/30 to-transparent w-6 h-full transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[300%] transition-transform duration-700"></div>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Enhanced Main Quiz Content */}
      <div className={`min-h-screen flex items-center justify-center p-6 transition-all duration-700 ${(showChatPage || showMemoirPage) ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'}`}>
        <div className="bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-3xl border border-slate-600/50">
          {showScore ? (
            <div className="text-center animate-fade-in-up">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-4xl font-bold text-slate-100 mb-4" style={{
                fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif'
              }}>
                Kuis Selesai!
              </h2>
              <div className="text-xl text-slate-300 mb-8">
                Skor Akhir: <span className="font-bold text-blue-400 text-3xl">{score}</span> dari {quizQuestions.length}
              </div>
              <button
                onClick={() => navigate('/gallery')}
                className="group relative py-4 px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-600 rounded-2xl font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 active:scale-95 text-lg overflow-hidden"
                style={{
                  boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(147, 197, 253, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(147, 197, 253, 0.2)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <span className="relative z-10 tracking-wide">✨ Lanjutkan Petualangan ✨</span>
                <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/30 to-transparent w-6 h-full transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[300%] transition-transform duration-700"></div>
              </button>
            </div>
          ) : (
            <div className={`animate-fade-in-up ${showQuizContent ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
              <div className="flex items-center justify-between mb-8">
                <p className="font-bold text-blue-400 text-lg">
                  Pertanyaan {currentQuestionIndex + 1}/{quizQuestions.length}
                </p>
                <div className="flex space-x-2">
                  {Array.from({ length: quizQuestions.length }, (_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        i === currentQuestionIndex
                          ? 'bg-blue-400 scale-125 shadow-lg shadow-blue-400/50'
                          : i < currentQuestionIndex
                          ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50'
                          : 'bg-slate-500/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-10 leading-tight" style={{
                fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif'
              }}>
                {quizQuestions[currentQuestionIndex].question}
              </h2>
              
              <div className="flex flex-col space-y-4">
                {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerOptionClick(option)}
                    className={getButtonClassName(option)}
                    disabled={!!answerStatus}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-lg font-medium">{option}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizPage;