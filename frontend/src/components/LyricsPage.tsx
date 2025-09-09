import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import HamburgerMenu from './HamburgerMenu';

const LyricsPage = () => {
  const navigate = useNavigate();
  const [lyrics, setLyrics] = useState('');
  const [isGenerating, setIsGenerating] = useState(true);
  const [audioUrl, setAudioUrl] = useState('');
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [songId, setSongId] = useState('');

  useEffect(() => {
    generateLyrics();
    return () => {
      // Cleanup audio when component unmounts
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, []);

  const generateLyrics = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      
      if (!userData.receiverName || !userData.genre || !userData.gender) {
        alert('Missing required data. Please start from the beginning.');
        navigate('/');
        return;
      }

      setIsGenerating(true);

      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
      const response = await axios.post(`${API_BASE_URL}/api/generate-lyrics`, {
        userId: userData.userId,
        receiverName: userData.receiverName,
        age: userData.age,
        gender: userData.gender,
        mood: userData.mood,
        genre: userData.genre,
        voice: userData.voice
      });

      if (response.data.success) {
        setLyrics(response.data.lyrics);
        setSongId(response.data.songId);
      } else {
        alert('Failed to generate lyrics. Please try again.');
      }
    } catch (error) {
      console.error('Error generating lyrics:', error);
      alert('Error generating lyrics. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateAndPlayAudio = async () => {
    if (isGeneratingAudio) return;

    try {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      setIsGeneratingAudio(true);

      // Stop current audio if playing
      if (audio) {
        audio.pause();
        setIsPlaying(false);
      }

      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
      const response = await axios.post(`${apiBaseUrl}/api/text-to-speech`, {
        text: lyrics,
        voice: userData.voice,
        songId: songId
      });

      if (response.data.success) {
        const newAudio = new Audio(response.data.audioUrl);
        setAudio(newAudio);
        setAudioUrl(response.data.audioUrl);

        newAudio.addEventListener('loadstart', () => {
          console.log('Audio loading started');
        });

        newAudio.addEventListener('canplaythrough', () => {
          console.log('Audio can play through');
          setIsGeneratingAudio(false);
          newAudio.play().then(() => {
            setIsPlaying(true);
          }).catch((error) => {
            console.error('Error playing audio:', error);
            alert('Error playing audio. Please try again.');
            setIsGeneratingAudio(false);
          });
        });

        newAudio.addEventListener('ended', () => {
          setIsPlaying(false);
        });

        newAudio.addEventListener('error', (e) => {
          console.error('Audio error:', e);
          alert('Error loading audio. Please try again.');
          setIsGeneratingAudio(false);
        });

      } else {
        alert('Failed to generate audio. Please try again.');
        setIsGeneratingAudio(false);
      }
    } catch (error) {
      console.error('Error generating audio:', error);
      alert('Error generating audio. Please try again.');
      setIsGeneratingAudio(false);
    }
  };

  const togglePlayPause = () => {
    if (!audio || !audioUrl) {
      generateAndPlayAudio();
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error('Error playing audio:', error);
        alert('Error playing audio. Please try again.');
      });
    }
  };

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
        <div className="progress-dot active"></div>
        <div className="progress-dot active"></div>
      </div>

      {/* Decorative Background Elements */}
      <div className="decorative-elements">
        <img 
          src="/images/Guitar 12th screen.png" 
          alt="Guitar" 
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '10%',
            width: '100px',
            height: 'auto',
            opacity: 0.6
          }}
        />
        <img 
          src="/images/Purple Music Tone.png" 
          alt="Music Notes" 
          style={{
            position: 'absolute',
            top: '15%',
            right: '15%',
            width: '60px',
            height: 'auto',
            opacity: 0.7
          }}
        />
      </div>

      {/* Main Content */}
      <div className="content">
        <h1 className="title" style={{ marginBottom: '20px' }}>
          Your song's lyrics are ready!
        </h1>

        {/* Lyrics Display */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '30px 25px',
          margin: '20px auto',
          maxWidth: '400px',
          minHeight: '300px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          position: 'relative'
        }}>
          {isGenerating ? (
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '300px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #5B2C87',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginBottom: '20px'
              }}></div>
              <p style={{ color: '#5B2C87', fontSize: '16px' }}>
                Generating your personalized lyrics...
              </p>
            </div>
          ) : (
            <div style={{
              textAlign: 'left',
              lineHeight: '1.6'
            }}>
              {lyrics.split('\n').map((line, index) => (
                <p key={index} style={{
                  color: '#333',
                  fontSize: '14px',
                  margin: '8px 0',
                  fontWeight: '500'
                }}>
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Play Song Button */}
        {!isGenerating && (
          <button 
            onClick={togglePlayPause}
            disabled={isGeneratingAudio}
            style={{
              width: '100%',
              maxWidth: '400px',
              padding: '18px',
              background: 'linear-gradient(90deg, #FFB347 0%, #FF8C00 100%)',
              border: 'none',
              borderRadius: '25px',
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold',
              cursor: 'pointer',
              margin: '20px auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 8px 20px rgba(255, 140, 0, 0.3)',
              opacity: isGeneratingAudio ? 0.6 : 1,
              transition: 'all 0.3s ease'
            }}
          >
            {isGeneratingAudio ? (
              <>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid white',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Generating Audio...
              </>
            ) : (
              <>
                <img 
                  src="/images/Play button.png" 
                  alt="Play"
                  style={{ width: '24px', height: '24px' }}
                />
                {isPlaying ? 'Pause Song' : 'Play Song'}
              </>
            )}
          </button>
        )}

        {/* Additional Options */}
        {!isGenerating && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '30px'
          }}>
            <button 
              onClick={() => navigate('/')}
              style={{
                padding: '12px 24px',
                background: 'transparent',
                border: '2px solid white',
                borderRadius: '20px',
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Create New Song
            </button>
            
            <button 
              onClick={generateLyrics}
              style={{
                padding: '12px 24px',
                background: 'rgba(255, 255, 255, 0.2)',
                border: '2px solid white',
                borderRadius: '20px',
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Regenerate Lyrics
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LyricsPage;
