import { useState } from 'react';
import './Login.css';
import logoImage from '../../../assets/Restominder/logo.png';
import foodImage from '../../../assets/Restominder/food1.png';
import { useNavigate } from 'react-router-dom';
import Background from '../../Static/BackgroundPage/Index';
import { LoginFormValidator } from '../../../utils/Validator/LoginFormValidator';
import { loginUser } from './API/Index';
import { PulseLoader } from 'react-spinners';
import { showErrorToast, showSuccessToast } from '../../../utils/Toast/Toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginBtnLoading, setIsLoginBtnLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignupClicked = () => {
    navigate('/welcome');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = { email, password, rememberMe };
    const validation = LoginFormValidator(formData);

    if (!validation.isValid) {
      showErrorToast(validation.errors[0]);
      return;
    }

    setIsLoginBtnLoading(true);

    try {
      const data = await loginUser(email, password);
      if (data) {
        showSuccessToast('Login Successful');
        navigate('/admin/dashboard');
      }
    } catch (error: any) {
      showErrorToast(error.message);
    } finally {
      setIsLoginBtnLoading(false);
    }
  };

  return (
    <div className="auth-login-page-container">
      <div className="auth-login-page-form-container">
        <div className="auth-login-page-form-section">
          <div className="auth-login-page-logo-container">
            <img src={logoImage} alt="Restominder Logo" className="auth-login-page-logo" />
            <div className="auth-login-page-logo-text">
              <h2 className="auth-login-page-brand-name">Restominder</h2>
              <p className="auth-login-page-brand-tagline">CONNECT THE WORLD WITH FOOD</p>
            </div>
          </div>

          <h1 className="auth-login-page-title">Login</h1>
          <p className="auth-login-page-subtitle">Please login into your existing account</p>

          <form onSubmit={handleSubmit}>
            <div className="auth-login-page-form-group">
              <label htmlFor="email">Email</label>
              <div className="auth-login-page-input-container">
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
                  className="auth-login-page-clear-button"
                  onClick={() => setEmail('')}
                >
                  {email && <span>&times;</span>}
                </button>
              </div>
            </div>

            <div className="auth-login-page-form-group">
              <label htmlFor="password">Password</label>
              <div className="auth-login-page-input-container">
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
                  className="auth-login-page-toggle-password"
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

            <div className="auth-login-page-form-row">
              <div className="auth-login-page-checkbox-container">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember" className="auth-login-page-remember-label">
                  Remember me
                </label>
              </div>
              <a href="#" className="auth-login-page-forgot-password">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="auth-login-page-login-button">
              {!isLoginBtnLoading ? 'Login' : <PulseLoader color="#ffffff" margin={2} size={8} />}
            </button>
          </form>

          <div className="auth-login-page-divider">
            <span className="auth-login-page-divider-text">Sign in with Google or Facebook</span>
          </div>

          <div className="auth-login-page-social-buttons">
            <button className="auth-login-page-social-button google">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#EA4335"
              >
                <path d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"></path>
                <path
                  d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                  fill="#34A853"
                ></path>
                <path
                  d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                  fill="#FBBC05"
                ></path>
              </svg>
              <span>Google</span>
            </button>
            <button className="auth-login-page-social-button facebook">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#1877F2"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </button>
          </div>

          <div className="auth-login-page-signup-prompt" onClick={handleSignupClicked}>
            <p>
              Don't have an account?{' '}
              <a href="#" className="auth-login-page-signup-link">
                Sign Up
              </a>
            </p>
          </div>
        </div>

        <div className="auth-login-page-food-image-section">
          <img src={foodImage} alt="Pasta dish" className="auth-login-page-food-image" />
          <div className="auth-login-page-image-overlay">
            <h2 className="auth-login-page-overlay-title">Personalize your experience</h2>
            <p className="auth-login-page-overlay-text">
              Tell us your food preferences—whether you're vegan, gluten-free, or have any special
              dietary needs.
            </p>
          </div>
        </div>
      </div>

      <Background />
    </div>
  );
};

export default Login;
