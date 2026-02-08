import React, { useState, useEffect } from 'react';
import './App.css';

// Valentine's Week Schedule (2026)
const valentineWeek = [
  { 
    date: new Date('2026-02-06'), 
    day: 'Rose Day', 
    color: '#ff6b9d', 
    emoji: '🌹', 
    description: 'A day to express love with roses',
    romanticMessage: "Like a rose that blooms in the garden of my heart, you bring color and fragrance to my life. Each petal represents a reason why I cherish you. You are the most beautiful rose in the garden of my life. 🌹💕",
    quote: '"A rose speaks of love silently, in a language known only to the heart."'
  },
  { 
    date: new Date('2026-02-06'), 
    day: 'Propose Day', 
    color: '#ff1493', 
    emoji: '💍', 
    description: 'Perfect day to propose your feelings',
    romanticMessage: "Today, I want to tell you that you are the reason behind my smile, my happiness, and my strength. Will you be mine forever? You make every moment magical, and I want to create a lifetime of memories with you. 💍✨",
    quote: '"In you, I\'ve found the love of my life and my closest, truest friend."'
  },
  { 
    date: new Date('2026-02-06'), 
    day: 'Chocolate Day', 
    color: '#8b4513', 
    emoji: '🍫', 
    description: 'Sweeten your love with chocolates',
    romanticMessage: "You are sweeter than the sweetest chocolate! Just like chocolate melts in your mouth, I melt in your presence. Life with you is like a box of chocolates - every moment is a delightful surprise! 🍫💝",
    quote: '"Life is like a box of chocolates, but with you, every piece is my favorite."'
  },
  { 
    date: new Date('2026-02-06'), 
    day: 'Teddy Day', 
    color: '#daa520', 
    emoji: '🧸', 
    description: 'Gift a cuddly teddy to your love',
    romanticMessage: "This teddy is as cuddly as the hugs you give me, as soft as your touch, and as warm as your love. May it remind you that I'm always here to hold you close, just like you hold my heart. 🧸💗",
    quote: '"A teddy bear is a reminder that someone cares and is always there to hug."'
  },
  { 
    date: new Date('2026-02-06'), 
    day: 'Promise Day', 
    color: '#9370db', 
    emoji: '🤝', 
    description: 'Make promises to keep forever',
    romanticMessage: "I promise to love you in sunshine and in rain, in good times and in bad. I promise to stand by your side, to hold your hand through every journey. My love for you is a promise I'll keep for eternity. 🤝💫",
    quote: '"Promises are the uniquely human way of ordering the future, making it predictable and reliable."'
  },
  { 
    date: new Date('2026-02-06'), 
    day: 'Hug Day', 
    color: '#ff69b4', 
    emoji: '🤗', 
    description: 'Embrace your loved ones warmly',
    romanticMessage: "In your arms, I find my home, my peace, and my happiness. A hug from you is worth a thousand words. It says 'I'm here, I care, and I love you.' Let me wrap you in my arms and never let go. 🤗💖",
    quote: '"A hug is a silent way of saying you matter to me."'
  },
  { 
    date: new Date('2026-02-06'), 
    day: 'Kiss Day', 
    color: '#ff1744', 
    emoji: '💋', 
    description: 'Seal your love with a kiss',
    romanticMessage: "Your kiss is the melody my heart dances to. Every kiss from you feels like the first kiss, magical and electrifying. With each kiss, I fall deeper in love with you. You are my forever kiss. 💋💕",
    quote: '"A kiss is a secret told to the mouth instead of the ear."'
  },
  { 
    date: new Date('2026-02-06'), 
    day: "Valentine's Day", 
    color: '#e91e63', 
    emoji: '❤️', 
    description: 'The ultimate day of love',
    romanticMessage: "Happy Valentine's Day, my love! You are my today and all of my tomorrows. You make my heart skip a beat and my life complete. Thank you for being my Valentine, not just today, but every single day. I love you more than words can express. ❤️💕✨",
    quote: '"Love is not just looking at each other, it\'s looking in the same direction together."'
  }
];

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [countdown, setCountdown] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [show3DAnimation, setShow3DAnimation] = useState(false);
  const [showValentineModal, setShowValentineModal] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: '60%', left: '65%' });
  const [showAcceptedMessage, setShowAcceptedMessage] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const firstDay = valentineWeek[0].date;
    const now = new Date();
    
    if (now < firstDay) {
      const diff = firstDay - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s until Rose Day!`);
    } else {
      setCountdown('');
    }
  }, [currentTime]);

  useEffect(() => {
    if (playVideo) {
      const videoElement = document.querySelector('.rose-day-video');
      if (videoElement) {
        videoElement.play().catch(err => console.log('Video play error:', err));
      }
    }
  }, [playVideo]);

  const isCardUnlocked = (cardDate) => {
    const now = new Date();
    const cardDay = new Date(cardDate);
    cardDay.setHours(0, 0, 0, 0);
    const nowDay = new Date(now);
    nowDay.setHours(0, 0, 0, 0);
    
    return nowDay >= cardDay;
  };

  const getCountdownUntil = (cardDate) => {
    const now = new Date();
    const target = new Date(cardDate);
    target.setHours(0, 0, 0, 0);
    
    const diff = target - now;
    
    if (diff <= 0) {
      return null;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds };
  };

  const handleCardClick = (item, unlocked) => {
    if (unlocked) {
      if (item.day === "Valentine's Day") {
        setShowValentineModal(true);
        setSelectedCard(item);
      } else if (item.day === 'Rose Day' || item.day === 'Propose Day' || item.day === 'Promise Day' || item.day === 'Kiss Day' || item.day === 'Teddy Day' || item.day === 'Hug Day') {
        setShow3DAnimation(true);
        setSelectedCard(item);
        // Start video after box animation (2 seconds for box opening)
        setTimeout(() => {
          setPlayVideo(true);
        }, 2000);
      } else if (item.day === 'Chocolate Day') {
        setSelectedCard(item);
      } else {
        setSelectedCard(item);
      }
    }
  };

  const closeModal = () => {
    setSelectedCard(null);
    setShow3DAnimation(false);
    setShowValentineModal(false);
    setShowAcceptedMessage(false);
    setPlayVideo(false);
  };

  const handleVideoEnd = () => {
    setShow3DAnimation(false);
    setSelectedCard(null);
    setPlayVideo(false);
  };

  const getVideoSource = (dayName) => {
    const videoMap = {
      'Rose Day': 'rose_day',
      'Propose Day': 'propose',
      'Promise Day': 'promise',
      'Kiss Day': 'kiss',
      'Hug Day': 'hug',
      'Teddy Day': 'teddy',
      "Valentine's Day": 'valentine'
    };
    return videoMap[dayName] || '';
  };

  const handleNoButtonHover = () => {
    const newTop = Math.random() * 70 + 10; // 10% to 80%
    const newLeft = Math.random() * 70 + 10; // 10% to 80%
    setNoButtonPosition({ top: `${newTop}%`, left: `${newLeft}%` });
  };

  const handleYesClick = () => {
    setShowAcceptedMessage(true);
    // Show animation and video after 10 seconds
    setTimeout(() => {
      setShow3DAnimation(true);
      // Start video after box animation (2 seconds for box opening)
      setTimeout(() => {
        setPlayVideo(true);
      }, 2000);
    }, 10000);
  };

  return (
    <div className="App">
      {/* Animated Hearts Background */}
      <div className="hearts-background">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="heart" style={{ 
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            fontSize: `${Math.random() * 20 + 20}px`
          }}>
            ❤️
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="app-header">
        <h1 className="main-title">
          <span className="heart-icon">💕</span>
          Valentine's Week 2026
          <span className="heart-icon">💕</span>
        </h1>
        <p className="subtitle">Seven Days of Love</p>
      </header>

      {/* Cards Container */}
      <div className="cards-container">
        {valentineWeek.map((item, index) => {
          const unlocked = isCardUnlocked(item.date);
          const countdown = getCountdownUntil(item.date);
          
          return (
            <div 
              key={index} 
              className={`valentine-card ${unlocked ? 'unlocked' : 'locked'}`}
              style={{ 
                '--card-color': item.color,
                animationDelay: `${index * 0.1}s`
              }}
              onClick={() => handleCardClick(item, unlocked)}
            >
              <div className="card-inner">
                {!unlocked && <div className="lock-overlay">
                  <div className="lock-icon">🔒</div>
                  <div className="unlock-text">
                    {countdown ? (
                      <div className="countdown-timer">
                        <div className="countdown-label">Unlocks in:</div>
                        <div className="countdown-values">
                          <span className="time-unit">
                            <span className="time-value">{countdown.days}</span>
                            <span className="time-label">days</span>
                          </span>
                          <span className="time-separator">:</span>
                          <span className="time-unit">
                            <span className="time-value">{String(countdown.hours).padStart(2, '0')}</span>
                            <span className="time-label">hours</span>
                          </span>
                          <span className="time-separator">:</span>
                          <span className="time-unit">
                            <span className="time-value">{String(countdown.minutes).padStart(2, '0')}</span>
                            <span className="time-label">mins</span>
                          </span>
                          <span className="time-separator">:</span>
                          <span className="time-unit">
                            <span className="time-value">{String(countdown.seconds).padStart(2, '0')}</span>
                            <span className="time-label">secs</span>
                          </span>
                        </div>
                      </div>
                    ) : 'Locked'}
                  </div>
                </div>}
                
                <div className="card-content">
                  <div className="card-emoji">{item.emoji}</div>
                  <h2 className="card-title">{item.day}</h2>
                  <p className="card-date">
                    {item.date.toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  {unlocked && (
                    <>
                      <p className="card-description">{item.description}</p>
                      <div className="card-badge">✨ Click to Open ✨</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3D Animation for Rose Day */}
      {show3DAnimation && selectedCard && (
        <div className="animation-overlay">
          <video 
            key={selectedCard.day}
            className="rose-day-video"
            autoPlay={playVideo}
            playsInline
            onEnded={handleVideoEnd}
            style={{ opacity: playVideo ? 1 : 0 }}
          >
            <source src={`/${getVideoSource(selectedCard.day)}.mp4`} type="video/mp4" />
            <source src={`/${getVideoSource(selectedCard.day)}.webm`} type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay-gradient"></div>
          <div className="box-container">
            <div className="gift-box">
              <div className="box-lid"></div>
              <div className="box-body"></div>
              <div className="box-ribbon-horizontal"></div>
              <div className="box-ribbon-vertical"></div>
            </div>
            <div className="sparkles">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="sparkle" style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}>✨</div>
              ))}
            </div>
            <div className="rose-petals">
              {[...Array(15)].map((_, i) => (
                <div key={i} className="petal" style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}>🌹</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Romantic Message Modal */}
      {selectedCard && !show3DAnimation && !showValentineModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>✕</button>
            
            {selectedCard.day === 'Chocolate Day' ? (
              <>
                <img 
                  src="/chocolate.png" 
                  alt="Chocolate Day" 
                  className="modal-image"
                />
                <div className="modal-emoji">{selectedCard.emoji}</div>
              </>
            ) : (
              <div className="modal-emoji">{selectedCard.emoji}</div>
            )}
            
            <h2 className="modal-title">{selectedCard.day}</h2>
            <div className="modal-divider"></div>
            <p className="romantic-message">{selectedCard.romanticMessage}</p>
            <div className="quote-container">
              <div className="quote-mark">"</div>
              <p className="romantic-quote">{selectedCard.quote}</p>
            </div>
            <div className="floating-hearts">
              {[...Array(8)].map((_, i) => (
                <span key={i} className="floating-heart" style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  fontSize: `${Math.random() * 10 + 15}px`
                }}>
                  ❤️
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Valentine's Day Special Modal */}
      {showValentineModal && !showAcceptedMessage && (
        <div className="valentine-modal-overlay">
          <div className="valentine-modal-content">
            <div className="valentine-hearts-animation">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="floating-valentine-heart" style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  fontSize: `${Math.random() * 15 + 20}px`
                }}>❤️</div>
              ))}
            </div>
            <div className="valentine-emoji-large">💕</div>
            <h1 className="valentine-question">Will You Be My Valentine?</h1>
            <p className="valentine-subtitle">This is the most important question...</p>
            <div className="valentine-buttons">
              <button className="yes-button" onClick={handleYesClick}>
                Yes! 💖
              </button>
              <button 
                className="no-button" 
                style={{ 
                  position: 'absolute',
                  top: noButtonPosition.top,
                  left: noButtonPosition.left
                }}
                onMouseEnter={handleNoButtonHover}
                onTouchStart={handleNoButtonHover}
                onClick={handleNoButtonHover}
              >
                No 😢
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Accepted Message */}
      {showAcceptedMessage && !show3DAnimation && (
        <div className="valentine-modal-overlay">
          <div className="valentine-modal-content accepted">
            <div className="celebration-confetti">
              {[...Array(50)].map((_, i) => (
                <div key={i} className="confetti" style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  background: ['#ff1744', '#ff69b4', '#ffd700', '#ff6b9d', '#e91e63'][Math.floor(Math.random() * 5)]
                }}></div>
              ))}
            </div>
            <img 
              src="/valentine.jpg" 
              alt="Valentine's Day" 
              className="valentine-image"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="celebration-emoji">🎉💕🎊</div>
            <h1 className="celebration-title">Yay! You Said Yes!</h1>
            <p className="celebration-message">
              You've made me the happiest person in the world! ❤️<br/>
              Thank you for being my Valentine! 💖
            </p>
            <p className="romantic-message">{selectedCard?.romanticMessage}</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="app-footer">
        <p>Made with ❤️ for someone special</p>
      </footer>
    </div>
  );
}

export default App;
