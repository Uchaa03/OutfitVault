import React, { useState } from "react";

const WhyUseDropdown = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="whyuse__dropdown-item">
      <div
        className="whyuse__dropdown-header"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        aria-expanded={isOpen}
        tabIndex={0}
      >
        <h3 className="whyuse__dropdown-title">{title}</h3>
        <svg 
          className={`whyuse__dropdown-image ${isOpen ? 'open' : ''}`} 
          width="29" 
          height="17" 
          viewBox="0 0 29 17" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4.13328 0H0V4.13328H4.13328V8.26656H8.26656V12.3998H12.3998V16.5331H16.5331V12.3998H20.6664V8.26656H24.7997V4.13328H28.933V0H24.7997V4.13328H20.6664V8.26656H16.5331V12.3998H12.3998V8.26656H8.26656V4.13328H4.13328V0Z" fill="black"/>
        </svg>  
      </div>
      <hr className="whyuse__dropdown-divider" />
      <div className={`whyuse__dropdown-content ${isOpen ? 'open' : ''}`}>
        <p className="whyuse__dropdown-description">{description}</p>
      </div>
    </article>
  );
};

export default WhyUseDropdown;