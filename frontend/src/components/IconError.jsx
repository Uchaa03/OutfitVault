import React from 'react';

/**
 * IconError component displays a message crediting the creator of the icon used.
 * The message includes a link to the icon author's page on Flaticon.
 *
 * @returns {JSX.Element} A React component that renders the credit message.
 */
const IconError = () => {
    return (
        <div>
            Icons made by <a href="https://www.flaticon.com/authors/menon" title="menon">menon</a> from
            <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
        </div>
    );
}

export default IconError;
