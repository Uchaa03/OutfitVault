import React, { useState } from "react";
import { useDarkMode } from "../../../store/authStore.jsx";

/**
 * WhyUseDropdown component renders a collapsible dropdown item with a title and description.
 * The dropdown opens and closes when the title is clicked.
 * It also supports dark mode styling based on the user's preference.
 *
 * @param {Object} props - The props passed to the component.
 * @param {string} props.title - The title of the dropdown item.
 * @param {string} props.description - The description to be displayed inside the dropdown when open.
 * @returns {JSX.Element} A collapsible dropdown item with a title and description.
 */
const WhyUseDropdown = ({ title, description }) => {
  // State to track whether the dropdown is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Get the current dark mode state from the store
  const darkMode = useDarkMode();

  return (
    <article className="whyuse__dropdown-item">
      <div
        className="whyuse__dropdown-header"
        onClick={() => setIsOpen(!isOpen)}  // Toggle the dropdown state on click
        role="button"  // Specifies that this element is a button for accessibility
        aria-expanded={isOpen}  // Indicates whether the dropdown is open or closed for screen readers
        tabIndex={0}  // Makes the element focusable for keyboard navigation
      >
        {/* Dropdown title with dark mode support */}
        <h3 className={darkMode ? "whyuse__dropdown-title whyuse__dropdown-title--dark" : "whyuse__dropdown-title"}>
          {title}
        </h3>

        {/* Dropdown arrow icon */}
        <svg
          className={`whyuse__dropdown-image ${isOpen ? 'open' : ''}`} 
          width="29" 
          height="17" 
          viewBox="0 0 29 17" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {darkMode ?
            // Dark mode arrow icon path
            <path
              d="M4.13328 0H0V4.13328H4.13328V8.26656H8.26656V12.3998H12.3998V16.5331H16.5331V12.3998H20.6664V8.26656H24.7997V4.13328H28.933V0H24.7997V4.13328H20.6664V8.26656H16.5331V12.3998H12.3998V8.26656H8.26656V4.13328H4.13328V0Z"
              fill="#d9d9d9"/> :
            // Light mode arrow icon path
            <path
              d="M4.13328 0H0V4.13328H4.13328V8.26656H8.26656V12.3998H12.3998V16.5331H16.5331V12.3998H20.6664V8.26656H24.7997V4.13328H28.933V0H24.7997V4.13328H20.6664V8.26656H16.5331V12.3998H12.3998V8.26656H8.26656V4.13328H4.13328V0Z"
              fill="#141414"/>
          }
        </svg>
      </div>

      {/* Divider with dark mode styling */}
      <hr className={darkMode ? "whyuse__dropdown-divider whyuse__dropdown-divider--dark" : "whyuse__dropdown-divider"}/>

      {/* Dropdown content (description) that is displayed when the dropdown is open */}
      <div className={`whyuse__dropdown-content ${isOpen ? 'open' : ''}`}>
        <p className={darkMode ? "whyuse__dropdown-description whyuse__dropdown-description--dark" : "whyuse__dropdown-description"}>
          {description}
        </p>
      </div>
    </article>
  );
};

export default WhyUseDropdown;
