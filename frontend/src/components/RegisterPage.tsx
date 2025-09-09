import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HamburgerMenu from './HamburgerMenu';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    email: '',
    termsAccepted: false,
    promoAccepted: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.termsAccepted) {
      alert('Please accept Terms & Conditions');
      return;
    }

    // Phone validation
    if (!/^\d{10}$/.test(formData.phone)) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
      const response = await axios.post(`${apiBaseUrl}/api/register`, formData);
      
      if (response.data.success) {
        // Store user data and ID for later use
        localStorage.setItem('userData', JSON.stringify({
          ...formData,
          userId: response.data.userId
        }));
        navigate('/otp');
      } else {
        alert(response.data.message || 'Registration failed');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
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
        <div className="progress-dot"></div>
        <div className="progress-dot"></div>
        <div className="progress-dot"></div>
        <div className="progress-dot"></div>
        <div className="progress-dot"></div>
      </div>

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
      </div>

      {/* Main Content */}
      <div className="content">
        <h1 className="title">Register to create</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="form-input"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="form-input"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              className="form-input"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="checkbox-group">
            <div className="checkbox-item">
              <input
                type="checkbox"
                name="termsAccepted"
                id="terms"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="terms">
                I accept Terms & Conditions and Privacy Policy of Mondelez (Cadbury)
              </label>
            </div>

            <div className="checkbox-item">
              <input
                type="checkbox"
                name="promoAccepted"
                id="promo"
                checked={formData.promoAccepted}
                onChange={handleInputChange}
              />
              <label htmlFor="promo">
                I would like to receive promotional communication from Mondelez (Cadbury) about its products and offers.
              </label>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
