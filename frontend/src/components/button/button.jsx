import React from 'react';
import PropTypes from 'prop-types';

/**
 * A reusable Button component that renders a button element.
 *
 * @component
 * @example
 * // Usage example:
 * <Button onClick={handleClick}>Click Me</Button>
 *
 * @param {Object} props - The props for the Button component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button (e.g., text or elements).
 * @param {string} [props.className='button'] - The class name for the button element (optional).
 * @param {function} [props.onClick=() => {}] - The callback function to handle the button click event (optional).
 *
 * @returns {JSX.Element} The rendered Button component.
 */
const Button = ({ children, className = 'button', onClick = () => {} }) => {
  return (
    <button type={"submit"} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
