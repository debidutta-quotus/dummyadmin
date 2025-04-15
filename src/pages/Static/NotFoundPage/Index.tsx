// NotFound.jsx
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-message">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <p className="not-found-message">Please check the URL or return to the homepage.</p>
        <a href="/" className="not-found-go-home-button">
          Go Home
        </a>
      </div>
      <div className="not-found-illustration">
        <div className="not-found-illustration-container">
          <div className="not-found-illustration-face">
            <div className="not-found-illustration-eyes">
              <div className="not-found-illustration-eye"></div>
              <div className="not-found-illustration-eye"></div>
            </div>
            <div className="not-found-illustration-mouth"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
