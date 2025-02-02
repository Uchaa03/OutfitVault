import React, { useEffect, useState } from 'react';

/**
 * LoadingPage component displays a loading animation.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.isVisible - Flag indicating if the loading screen should be visible.
 * @param {Function} props.onFinish - Callback invoked after the exit animation completes.
 * @returns {JSX.Element} The rendered loading screen.
 */
const LoadingPage = ({ isVisible, onFinish }) => {
  const [animation, setAnimation] = useState('');

  // Update the animation state based on visibility and trigger the onFinish callback on exit
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