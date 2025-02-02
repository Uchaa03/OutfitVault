import React from 'react';

/**
 * FormLayout Component
 *
 * A layout wrapper for form-related pages. It provides a consistent structure
 * by wrapping content inside a `<main>` and `<section>` element.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child components to be rendered inside the form layout.
 * @returns {JSX.Element} The rendered FormLayout component.
 */
const FormLayout = ({ children }) => {
  return (
    <main className="forms">
      <section className="forms__section">
        {children}
      </section>
    </main>
  );
}

export default FormLayout;
