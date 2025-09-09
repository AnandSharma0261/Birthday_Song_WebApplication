import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/register');
  };

  return (
    <div className="page-container">
      {/* Decorative Background Elements */}
      <div className="decorative-elements">
        <img 
          src="/images/Celebrations(Bg).png" 
          alt="Celebrations Background" 
          className="celebration-bg"
        />
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
        <img 
          src="/images/Purple Music Tone.png" 
          alt="Music Notes" 
          className="music-notes"
        />
        <img 
          src="/images/Cap&Gift.png" 
          alt="Gift and Cap" 
          className="gift-cap"
        />
      </div>

      {/* Main Content */}
      <div className="content">
        <div style={{ textAlign: 'center' }}>
          <img 
            src="/images/2d logo.png" 
            alt="Cadbury Celebrations Logo" 
            style={{ 
              maxWidth: '180px', 
              height: 'auto',
              marginBottom: '25px',
              position: 'relative',
              zIndex: 15
            }}
          />
          
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.95)', 
            fontSize: '18px',
            marginBottom: '8px',
            fontWeight: '600',
            position: 'relative',
            zIndex: 15
          }}>
            A unique birthday song for everyone!
          </p>
          
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.85)', 
            fontSize: '15px',
            marginBottom: '40px',
            fontStyle: 'italic',
            position: 'relative',
            zIndex: 15
          }}>
            इस birthday कुछ अच्छा हो जाये कुछ मीठा हो जाये
          </p>
          
          <button 
            onClick={handleGetStarted}
            style={{
              background: 'linear-gradient(90deg, #FFB347 0%, #FF8C00 100%)',
              border: 'none',
              borderRadius: '25px',
              color: 'white',
              fontSize: '18px',
              fontWeight: 'bold',
              padding: '15px 45px',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(255, 140, 0, 0.3)',
              transition: 'transform 0.2s ease',
              position: 'relative',
              zIndex: 15
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
