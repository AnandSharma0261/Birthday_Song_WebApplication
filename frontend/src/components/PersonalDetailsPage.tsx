import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';

const PersonalDetailsPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    receiverName: '',
    age: '23',
    gender: 'Male'
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.receiverName.trim()) {
      alert('Please enter the receiver name');
      return;
    }
    
    // Store personal details
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const updatedUserData = { ...userData, ...formData };
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
    
    navigate('/preferences');
  };

  const ageOptions = Array.from({ length: 83 }, (_, i) => i + 18);

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
        <div className="progress-dot"></div>
        <div className="progress-dot"></div>
        <div className="progress-dot"></div>
      </div>

      {/* Decorative Background Elements */}
      <div className="decorative-elements">
        <img 
          src="/images/Cap&Gift.png" 
          alt="Gift and Cap" 
          style={{
            position: 'absolute',
            top: '25%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '180px', /* Increased from 120px to 180px */
            height: 'auto',
            opacity: 0.8
          }}
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
      </div>

      {/* Main Content */}
      <div className="content">
        <h1 className="title" style={{ marginBottom: '10px' }}>
          Tell us about your loved one...
        </h1>

        <form onSubmit={handleSubmit} style={{ marginTop: '50px' }}>
          <div className="form-group">
            <label style={{
              color: 'white',
              fontSize: '18px',
              fontWeight: '500',
              display: 'block',
              marginBottom: '10px',
              textAlign: 'left'
            }}>
              Their name
            </label>
            <input
              type="text"
              name="receiverName"
              placeholder="XXXXX XXXXXXXXXXX"
              className="form-input"
              value={formData.receiverName}
              onChange={handleInputChange}
              required
              style={{
                fontSize: '16px',
                color: '#333'
              }}
            />
          </div>

          <div className="form-group">
            <label style={{
              color: 'white',
              fontSize: '18px',
              fontWeight: '500',
              display: 'block',
              marginBottom: '10px',
              textAlign: 'left'
            }}>
              How old they'll be this birthday
            </label>
            <select
              name="age"
              className="dropdown"
              value={formData.age}
              onChange={handleInputChange}
              style={{
                fontSize: '16px',
                color: '#333',
                fontWeight: '500'
              }}
            >
              {ageOptions.map(age => (
                <option key={age} value={age}>
                  {age} Years
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label style={{
              color: 'white',
              fontSize: '18px',
              fontWeight: '500',
              display: 'block',
              marginBottom: '10px',
              textAlign: 'left'
            }}>
              Gender
            </label>
            <select
              name="gender"
              className="dropdown"
              value={formData.gender}
              onChange={handleInputChange}
              style={{
                fontSize: '16px',
                color: '#333',
                fontWeight: '500'
              }}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <button type="submit" className="submit-btn" style={{ marginTop: '40px' }}>
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetailsPage;
