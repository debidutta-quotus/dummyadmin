import { useState } from 'react';
import './Signup.css';
import logoImage from '../../../assets/Restominder/logo.png';
import foodImage from '../../../assets/Restominder/food2.jpg';
import { useNavigate } from 'react-router-dom';
import Background from '../../Static/BackgroundPage/Index';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleLoginClicked = () => {
    navigate('/login');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, password, confirmPassword });

    navigate('/success');
  };

  return (
    <div className="auth-signup-page-container">
      <div className="auth-signup-page-form-container">
        <div className="auth-signup-page-form-section">
          <div className="auth-signup-page-logo-container">
            <img src={logoImage} alt="Restominder Logo" className="auth-signup-page-logo" />
            <div className="auth-signup-page-logo-text">
              <h2 className="auth-signup-page-brand-name">Restominder</h2>
              <p className="auth-signup-page-brand-tagline">CONNECT THE WORLD WITH FOOD</p>
            </div>
          </div>

          <h1 className="auth-signup-page-title">Sign Up</h1>
          <p className="auth-signup-page-subtitle">Please sign up to get started</p>

          <form onSubmit={handleSubmit}>
            <div className="auth-signup-page-form-group">
              <label htmlFor="name">Name</label>
              <div className="auth-signup-page-input-container">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
                <button
                  type="button"
                  className="auth-signup-page-clear-button"
                  onClick={() => setName('')}
                >
                  {name && <span>&times;</span>}
                </button>
              </div>
            </div>

            <div className="auth-signup-page-form-group">
              <label htmlFor="email">Email</label>
              <div className="auth-signup-page-input-container">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                />
                <button
                  type="button"
                  className="auth-signup-page-clear-button"
                  onClick={() => setEmail('')}
                >
                  {email && <span>&times;</span>}
                </button>
              </div>
            </div>

            <div className="auth-signup-page-form-group">
              <label htmlFor="password">Password</label>
              <div className="auth-signup-page-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  required
                />
                <button
                  type="button"
                  className="auth-signup-page-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                      <line x1="2" x2="22" y1="2" y2="22"></line>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="auth-signup-page-form-group">
              <label htmlFor="confirmPassword">Re-type Password</label>
              <div className="auth-signup-page-input-container">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••"
                  required
                />
                <button
                  type="button"
                  className="auth-signup-page-toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                      <line x1="2" x2="22" y1="2" y2="22"></line>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="auth-signup-page-signup-button">
              Sign Up
            </button>
          </form>

          {/* <div className="auth-signup-page-divider">
            <span className="auth-signup-page-divider-text">Sign up with Google or Facebook</span>
          </div>

          <div className="auth-signup-page-social-buttons">
            <button className="auth-signup-page-social-button google">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#EA4335"><path d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"></path><path d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" fill="#34A853"></path><path d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" fill="#4285F4"></path><path d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z" fill="#FBBC05"></path></svg>
              <span>Google</span>
            </button>
            <button className="auth-signup-page-social-button facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              <span>Facebook</span>
            </button>
          </div> */}

          <div className="auth-signup-page-login-prompt" onClick={handleLoginClicked}>
            <p>
              Have an account?{' '}
              <a href="#" className="auth-signup-page-login-link">
                Login
              </a>
            </p>
          </div>
        </div>

        <div className="auth-signup-page-food-image-section">
          <img src={foodImage} alt="Food dish" className="auth-signup-page-food-image" />
          <div className="auth-signup-page-image-overlay">
            <h2 className="auth-signup-page-overlay-title">
              Food is the ingredient that binds us together.
            </h2>
            {/* <p className="auth-signup-page-overlay-text">Join our community of food lovers and discover amazing recipes.</p> */}
          </div>
        </div>
      </div>

      <Background />
    </div>
  );
};

export default Signup;
