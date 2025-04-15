import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import './CountdownTimer.css';

interface CountdownTimerProps {
  pickupTime: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ pickupTime }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const pickup = new Date(pickupTime).getTime();
      const now = new Date().getTime();
      const difference = pickup - now;

      if (difference <= 0) {
        return 'ASAP';
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      if (hours > 0) {
        return `${hours}h ${minutes}m ${seconds}s`;
      } else if (minutes > 0) {
        return `${minutes}m ${seconds}s`;
      } else {
        return `${seconds}s`;
      }
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [pickupTime]);

  return (
    <div className="order-countdown-timer-container">
      <Clock size={14} />
      <span
        className={`order-countdown-timer-time ${timeLeft === 'ASAP' ? 'order-countdown-timer-asap' : ''}`}
      >
        {timeLeft}
      </span>
    </div>
  );
};

export default CountdownTimer;
