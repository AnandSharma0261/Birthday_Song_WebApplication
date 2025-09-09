import { useNavigate } from 'react-router-dom';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const HamburgerMenu = ({ isOpen, onClose }: HamburgerMenuProps) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Register', path: '/register' },
    { name: 'Personal Details', path: '/personal-details' },
    { name: 'Preferences', path: '/preferences' },
    { name: 'Lyrics', path: '/lyrics' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 998
        }}
        onClick={onClose}
      />
      
      {/* Menu */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          right: isOpen ? 0 : '-300px',
          width: '280px',
          height: '100vh',
          background: 'linear-gradient(180deg, #8B4DB8 0%, #5B2C87 100%)',
          boxShadow: '-5px 0 15px rgba(0, 0, 0, 0.3)',
          transition: 'right 0.3s ease',
          zIndex: 999,
          padding: '20px 0'
        }}
      >
        {/* Menu Header */}
        <div style={{ 
          padding: '20px', 
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ 
            color: 'white', 
            margin: 0, 
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            Navigation
          </h3>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '5px'
            }}
          >
            ×
          </button>
        </div>

        {/* Menu Items */}
        <div style={{ marginTop: '20px' }}>
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.path)}
              style={{
                display: 'block',
                width: '100%',
                padding: '15px 20px',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '16px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'none'}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div style={{ 
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          right: '20px',
          textAlign: 'center'
        }}>
          <img 
            src="/images/Cadbury Logo.png" 
            alt="Cadbury Logo" 
            style={{ width: '120px', opacity: 0.7 }}
          />
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
