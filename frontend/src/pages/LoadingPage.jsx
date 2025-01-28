import React, { useEffect, useState } from 'react';

const LoadingPage = ({ isVisible, onFinish }) => {
  const [animation, setAnimation] = useState('');

  useEffect(() => {
    if (isVisible) {
      setAnimation('enter');
    } else {
      setAnimation('exit');
      const timer = setTimeout(() => {
        onFinish();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onFinish]);

  return (
    <div className={`loading-page ${animation}`}>
      <h1>
        Cargando
        <span className="dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </h1>
    </div>
  );
};

export default LoadingPage;