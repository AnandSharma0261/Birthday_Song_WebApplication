import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const OTPPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    
    if (otpValue.length !== 4) {
      alert('Please enter complete OTP');
      return;
    }

    setIsLoading(true);
    
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
            const response = await axios.post(`${API_BASE_URL}/api/verify-otp`, {
        otp: otpValue
      });

      if (response.data.success) {
        navigate('/personal-details');
      } else {
        alert('Invalid OTP. Please use 1234 for demo.');
      }
    } catch (error) {
      alert('Error verifying OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = () => {
    alert('OTP resent successfully! Use 1234 for demo.');
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
        />
      </div>

      {/* Progress Dots */}
      <div className="progress-dots">
        <div className="progress-dot active"></div>
        <div className="progress-dot active"></div>
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
      </div>

      {/* Main Content */}
      <div className="content">
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px 30px',
          margin: '20px auto',
          maxWidth: '350px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
        }}>
          <h2 style={{
            color: '#5B2C87',
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Enter OTP
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '15px',
              marginBottom: '20px'
            }}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  style={{
                    width: '50px',
                    height: '50px',
                    border: '2px solid #5B2C87',
                    borderRadius: '10px',
                    textAlign: 'center',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#5B2C87',
                    outline: 'none'
                  }}
                  maxLength={1}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleResendOTP}
              style={{
                background: 'none',
                border: 'none',
                color: '#5B2C87',
                fontSize: '16px',
                textDecoration: 'underline',
                cursor: 'pointer',
                marginBottom: '20px',
                display: 'block',
                margin: '0 auto 20px'
              }}
            >
              Resend OTP
            </button>

            <button 
              type="submit" 
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '15px',
                background: 'linear-gradient(90deg, #FFB347 0%, #FF8C00 100%)',
                border: 'none',
                borderRadius: '25px',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                opacity: isLoading ? 0.6 : 1
              }}
            >
              {isLoading ? 'Verifying...' : 'Submit'}
            </button>
          </form>

          <p style={{
            textAlign: 'center',
            marginTop: '20px',
            color: '#666',
            fontSize: '14px'
          }}>
            Demo OTP: 1234
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;
