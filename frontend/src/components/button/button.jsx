import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, className, onClick }) => {
  return (
    <button className={`${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  className: 'button',
  onClick: () => {},
};

export default Button;