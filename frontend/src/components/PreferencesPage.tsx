import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';

const PreferencesPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1); // 1: mood, 2: genre&voice
  const [preferences, setPreferences] = useState({
    mood: '',
    genre: '',
    voice: ''
  });

  const moods = [
    { name: 'Happy', icon: '/images/Happy.png' },
    { name: 'Funny', icon: '/images/Funny.png' },
    { name: 'Motivational', icon: '/images/Motivational.png' },
    { name: 'Calm', icon: '/images/Calm.png' },
    { name: 'Romantic', icon: '/images/Happy.png' } // Using Happy icon as placeholder
  ];

  const genres = [
    { name: 'Pop', icon: '/images/Pop.png' },
    { name: 'Rock', icon: '/images/Rock.png' },
    { name: 'Rap', icon: '/images/Rap.png' },
    { name: 'EDM', icon: '/images/EDM.png' },
    { name: 'Desi', icon: '/images/Desi.png' }
  ];

  const voices = [
    { name: 'Male', icon: '/images/MAle.png' },
    { name: 'Female', icon: '/images/Female.png' }
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSelection = (type: string, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleProceed = () => {
    if (currentStep === 1) {
      if (!preferences.mood) {
        alert('Please select a mood');
        return;
      }
      setCurrentStep(2);
    } else {
      if (!preferences.genre || !preferences.voice) {
        alert('Please select both genre and voice');
        return;
      }
      
      // Store preferences
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const updatedUserData = { ...userData, ...preferences };
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      
      navigate('/lyrics');
    }
  };

  const renderStep1 = () => (
    <>
      <h1 className="title">What would you like their song's vibe to be?</h1>
      
      {/* Mood Selection */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{
          background: 'linear-gradient(90deg, #FFB347 0%, #FF8C00 100%)',
          borderRadius: '15px',
          padding: '10px 0',
          marginBottom: '20px'
        }}>
          <h3 style={{ 
            color: 'white', 
            margin: '0', 
            fontSize: '18px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            Mood
          </h3>
        </div>
        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '15px'
        }}>
          {moods.map((mood) => (
            <div
              key={mood.name}
              onClick={() => handleSelection('mood', mood.name)}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: preferences.mood === mood.name 
                  ? 'linear-gradient(90deg, #FFB347 0%, #FF8C00 100%)' 
                  : 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: '10px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease'
              }}
            >
              <img 
                src={mood.icon} 
                alt={mood.name}
                style={{ width: '40px', height: '40px', marginBottom: '5px' }}
              />
              <span style={{ 
                fontSize: '12px', 
                fontWeight: 'bold',
                color: preferences.mood === mood.name ? 'white' : '#333'
              }}>
                {mood.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Genre Selection */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{
          background: 'linear-gradient(90deg, #FFB347 0%, #FF8C00 100%)',
          borderRadius: '15px',
          padding: '10px 0',
          marginBottom: '20px'
        }}>
          <h3 style={{ 
            color: 'white', 
            margin: '0', 
            fontSize: '18px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            Genre
          </h3>
        </div>
        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '15px'
        }}>
          {genres.map((genre) => (
            <div
              key={genre.name}
              onClick={() => handleSelection('genre', genre.name)}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: preferences.genre === genre.name 
                  ? 'linear-gradient(90deg, #FFB347 0%, #FF8C00 100%)' 
                  : 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: '10px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease'
              }}
            >
              <img 
                src={genre.icon} 
                alt={genre.name}
                style={{ width: '40px', height: '40px', marginBottom: '5px' }}
              />
              <span style={{ 
                fontSize: '12px', 
                fontWeight: 'bold',
                color: preferences.genre === genre.name ? 'white' : '#333'
              }}>
                {genre.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <h1 className="title">What would you like their song's vibe to be?</h1>
      
      {/* Genre Selection (carried over) */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{
          background: 'linear-gradient(90deg, #FFB347 0%, #FF8C00 100%)',
          borderRadius: '15px',
          padding: '10px 0',
          marginBottom: '20px'
        }}>
          <h3 style={{ 
            color: 'white', 
            margin: '0', 
            fontSize: '18px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            Genre
          </h3>
        </div>
        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '15px'
        }}>
          {genres.map((genre) => (
            <div
              key={genre.name}
              onClick={() => handleSelection('genre', genre.name)}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: preferences.genre === genre.name 
                  ? 'linear-gradient(90deg, #FFB347 0%, #FF8C00 100%)' 
                  : 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: '10px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease'
              }}
            >
              <img 
                src={genre.icon} 
                alt={genre.name}
                style={{ width: '40px', height: '40px', marginBottom: '5px' }}
              />
              <span style={{ 
                fontSize: '12px', 
                fontWeight: 'bold',
                color: preferences.genre === genre.name ? 'white' : '#333'
              }}>
                {genre.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Voice Selection */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{
          background: 'linear-gradient(90deg, #FFB347 0%, #FF8C00 100%)',
          borderRadius: '15px',
          padding: '10px 0',
          marginBottom: '20px'
        }}>
          <h3 style={{ 
            color: 'white', 
            margin: '0', 
            fontSize: '18px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            Singer's voice
          </h3>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px'
        }}>
          {voices.map((voice) => (
            <div
              key={voice.name}
              onClick={() => handleSelection('voice', voice.name)}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '20px',
                background: preferences.voice === voice.name 
                  ? 'linear-gradient(90deg, #FFB347 0%, #FF8C00 100%)' 
                  : 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: '15px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease'
              }}
            >
              <img 
                src={voice.icon} 
                alt={voice.name}
                style={{ width: '50px', height: '50px', marginBottom: '10px' }}
              />
              <span style={{ 
                fontSize: '14px', 
                fontWeight: 'bold',
                color: preferences.voice === voice.name ? 'white' : '#333'
              }}>
                {voice.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="page-container">
      {/* Header */}
      <div className="header">
        <img 
          src="/images/Cadbury Logo.png" 
          alt="Cadbury Celebrations" 
          className="logo"
        />
        <h2 style={{ 
          color: 'white', 
          fontSize: '24px', 
          fontWeight: 'bold',
          margin: '0'
        }}>
          #my birthday song
        </h2>
        <img 
          src="/images/Hamburger.png" 
          alt="Menu" 
          className="hamburger"
          onClick={() => setIsMenuOpen(true)}
          style={{ cursor: 'pointer' }}
        />
      </div>

      {/* Hamburger Menu */}
      <HamburgerMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />

      {/* Progress Dots */}
      <div className="progress-dots">
        <div className="progress-dot active"></div>
        <div className="progress-dot active"></div>
        <div className="progress-dot active"></div>
        <div className="progress-dot active"></div>
        <div className="progress-dot"></div>
        <div className="progress-dot"></div>
      </div>

      {/* Decorative Background Elements */}
      <div className="decorative-elements">
        {/* Headphones with Golden Ball - Main center elements */}
        <img 
          src="/images/Headphone.png" 
          alt="Headphones" 
          style={{
            position: 'absolute',
            top: '18%',
            left: '35%',
            width: '120px',
            height: 'auto',
            opacity: 0.8,
            zIndex: 3
          }}
        />
        
        {/* Golden Ball */}
        <div 
          style={{
            position: 'absolute',
            top: '15%',
            right: '25%',
            width: '60px',
            height: '60px',
            background: 'radial-gradient(circle, #FFD700 0%, #FFA500 100%)',
            borderRadius: '50%',
            opacity: 0.8,
            boxShadow: '0 4px 20px rgba(255, 215, 0, 0.4)',
            zIndex: 2
          }}
        />
        
        {/* Music Notes */}
        <img 
          src="/images/Purple Music Tone.png" 
          alt="Music Notes" 
          style={{
            position: 'absolute',
            top: '22%',
            left: '15%',
            width: '50px',
            height: 'auto',
            opacity: 0.7,
            zIndex: 2
          }}
        />
        
        {/* Additional Music Note on Right */}
        <img 
          src="/images/Purple Music Tone.png" 
          alt="Music Notes" 
          style={{
            position: 'absolute',
            top: '35%',
            right: '10%',
            width: '35px',
            height: 'auto',
            opacity: 0.6,
            transform: 'rotate(-15deg)',
            zIndex: 2
          }}
        />
        
        {/* Balloons */}
        <img 
          src="/images/Balloon.png" 
          alt="Balloon" 
          className="balloon-left"
        />
        <img 
          src="/images/Balloon2.png" 
          alt="Balloon" 
          className="balloon-right"
        />
      </div>

      {/* Main Content */}
      <div className="content">
        {currentStep === 1 ? renderStep1() : renderStep2()}

        <button 
          onClick={handleProceed}
          className="submit-btn"
          style={{ marginTop: '40px' }}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default PreferencesPage;
