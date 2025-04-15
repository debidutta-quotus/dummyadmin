// src/pages/deliveryPartners/WelcomePage/Index.tsx
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';
import welcomeImage from '../../../assets/welcome_store.png';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleRegisterStore = () => {
    navigate('/register');
  };

  const handleSkipClicked = () => {
    navigate('/');
  };

  return (
    <div className="welcome-page-container">
      <div className="welcome-page-content">
        <div className="welcome-page-text-content">
          <h1 className="animated-title">The Central Hub for Orders. Restominder!</h1>
          <p className="animated-paragraph-1">
            1. Connect your store's POS system to multiple delivery partners and manage all your
            Orders in one place.
          </p>
          <p className="animated-paragraph-2">
            2. Simplify your operations, Reduce Management Cost, and enhance customer satisfaction.
          </p>

          <div className="welcome-page-button-container">
            <button
              onClick={handleRegisterStore}
              className="welcome-page-register-button animated-button-register"
            >
              Register Your Store With Us
            </button>
            <button
              className="welcome-page-skip-button animated-button-skip"
              onClick={handleSkipClicked}
            >
              Skip
            </button>
          </div>
        </div>
        <div className="welcome-page-image-content animated-image">
          <img src={welcomeImage} alt="Welcome" className="welcome-page-welcome-image" />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
