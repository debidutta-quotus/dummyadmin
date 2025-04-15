import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './SuccessAnimationPage.css';
import Background from '../BackgroundPage/Index';

const SuccessAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create animated dots around the checkmark
    const container = containerRef.current;
    const colors = ['#4ADE80', '#FACC15', '#4ADE80'];

    for (let i = 0; i < 8; i++) {
      const dot = document.createElement('div');
      dot.classList.add('success-animation-page-dot');

      // Random size and color
      const size = Math.random() * 10 + 5;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

      // Position in a circle around the checkmark
      const angle = (i / 8) * Math.PI * 2;
      const radius = 40;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      dot.style.left = `calc(50% + ${x}px)`;
      dot.style.top = `calc(50% + ${y}px)`;

      // Random animation delay
      dot.style.animationDelay = `${Math.random() * 0.5}s`;

      container.appendChild(dot);
    }
  }, []);

  return (
    <div className="success-animation-page-container">
      <div className="success-animation-page-card">
        <div className="success-animation-page-checkmark-container" ref={containerRef}>
          <div className="success-animation-page-circle">
            <svg
              className="success-animation-page-checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#fff" />
            </svg>
          </div>
        </div>

        <h1 className="success-animation-page-title">Successful</h1>
        <p className="success-animation-page-subtitle">
          Your Account has been created successfully
        </p>

        <Link to="/login" className="success-animation-page-button-link">
          <button className="success-animation-page-button">Back to Login</button>
        </Link>
      </div>

      <Background />
    </div>
  );
};

export default SuccessAnimation;
