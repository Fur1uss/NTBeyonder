import React, { useState, useEffect } from 'react';
import './BlurText.css';

const BlurText = ({ 
  children, 
  className = '', 
  blurAmount = 10, 
  duration = 2000,
  delay = 0,
  ...props 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span 
      className={`blur-text ${isVisible ? 'blur-text--visible' : ''} ${className}`}
      style={{
        '--blur-amount': `${blurAmount}px`,
        '--animation-duration': `${duration}ms`
      }}
      {...props}
    >
      {children}
    </span>
  );
};

export default BlurText;
