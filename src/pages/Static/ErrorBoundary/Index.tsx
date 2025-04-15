import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ErrorBoundary.css';
import { RefreshCw } from 'lucide-react';

const WentWrong = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isTryingAgain, setIsTryingAgain] = useState(false);

  return (
    <div className="went-wrong-container">
      <div className={`went-wrong-content ${isTryingAgain ? 'trying-again' : ''}`}>
        <div className="went-wrong-icon-container">
          <RefreshCw
            className={`went-wrong-icon ${isTryingAgain ? 'rotating-icon' : ''}`}
            size={48}
          />
          {isTryingAgain && <div className="loading-text-below">Retrying...</div>}
        </div>
        <h1 className="went-wrong-title">Service Unavailable</h1>
        <h2 className="went-wrong-subtitle">
          We're experiencing a temporary issue. Please try again later.
        </h2>
        <div className="went-wrong-actions">
          <button
            className="went-wrong-button try-again-button"
            onClick={() => {
              setIsTryingAgain(true);
              setTimeout(() => {
                setIsTryingAgain(false);
                navigate(location.pathname);
              }, 1000);
            }}
            disabled={isTryingAgain}
          >
            Try Again
          </button>
          <button className="went-wrong-button go-home-button" onClick={() => navigate('/')}>
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default WentWrong;
