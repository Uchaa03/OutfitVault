import React from 'react';

/**
 * Layout component for wrapping form-related pages or sections.
 * Provides a consistent structure for forms.
 *
 * @param {Object} props - React component properties.
 * @param {React.ReactNode} props.children - The content to be rendered inside the layout.
 * @returns {JSX.Element} The layout structure for forms.
 */
const FormLayout = ({ children }) => {
    return (
        <main className="forms">
            <section className="forms__section">
                {children}
            </section>
        </main>
    );
};

export default FormLayout;
