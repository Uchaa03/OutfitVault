import React from 'react';
import PropTypes from 'prop-types';

/**
 * A mini version of the item card that displays a smaller image and name of the item.
 * This component is ideal for a compact display of items, such as in a grid or carousel.
 *
 * @component
 * @example
 * // Usage example:
 * <ItemCardMini
 *    name="Mini Cool Jacket"
 *    itemImage="path/to/image.jpg"
 * />
 *
 * @param {Object} props - The props for the ItemCardMini component.
 * @param {string} props.name - The name of the item.
 * @param {string} props.itemImage - The image URL for the item.
 *
 * @returns {JSX.Element} The rendered ItemCardMini component.
 */
const ItemCardMini = ({ name, itemImage }) => {
  // Generate a unique ID for the pattern and image
  const uniqueId = `pattern-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="item-card-mini-container" tabIndex="0" role="button" aria-label={`Item card for ${name}`}>
      {/* Background SVG representing the item card */}
      <svg className="item-card-mini-background" width="559" height="445" viewBox="0 0 559 445" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.09865 33.2015V49.0664L0.830078 441.551L462.589 445H501.914V441.551V429.825H531.091V418.788H559V398.095V0.092041H147.984H66.7956H52.8414V2.85116V5.61028V19.4059H18.59V33.2015H2.09865Z" fill="#6D6D6D"/>
      </svg>
      
      {/* SVG container for the image and border */}
      <svg className="item-card-mini" width="612" height="490" viewBox="0 0 612 490" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background for the image container */}
        <path className="item-card-mini__background" d="M19.3094 42.427H10.8094V50.927V67.1697V67.1836L9.50004 469.332L9.47249 477.797L17.937 477.859L494.564 481.393L494.596 481.394H494.627H535.219H543.719V472.894V469.36V465.844H565.336H573.836V457.344V454.535H594.143H602.643V446.035V424.83V17V8.5H594.143H169.892H86.0896H71.686H63.186V17V19.8272V22.6545V28.2907H36.3318H27.8318V36.7907V42.427H19.3094Z" fill="#D9D9D9" stroke="#141414" strokeWidth="17"/>
        
        {/* Container for the image */}
        <svg className="item-card-mini__image-container" x="50%" y="50%" width="525" height="364" viewBox="0 0 525 364" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" transform="translate(-262.5, -182)">
          {/* Border around the image */}
          <path className="item-card-mini__image-border" d="M14.1364 31.3023H8.13636V37.3023V49.4151V49.4264L7.00004 349.342L6.97737 355.326L12.9618 355.364L426.598 358L426.617 358H426.636H461.864H467.864V352V349.364V346.403H488H494V340.403V337.969H513H519V331.969V316.155V12V6H513H144.818H72.0909H59.5909H53.5909V12V14.1085V16.2171V20.7597H28.9091H22.9091V26.7597V31.3023H14.1364Z" fill={`url(#${uniqueId})`} stroke="#141414" strokeWidth="12"/>
          
          {/* Pattern definition for the image */}
          <defs>
            <pattern id={uniqueId} patternContentUnits="objectBoundingBox" width="1" height="1">
              <use xlinkHref={`#image-${uniqueId}`} transform="matrix(0.00166667 0 0 0.00245098 0 -0.412341)"/>
            </pattern>
            <image id={`image-${uniqueId}`} width="600" height="800" xlinkHref={itemImage}></image>
          </defs>
        </svg>
        
        {/* Item name displayed at the bottom of the card */}
        <text className="item-card-mini__name" x="50%" y="95%" textAnchor="middle" fontSize="24" fill="#141414">{name}</text>
      </svg>
    </div>
  );
};

// Prop types validation
ItemCardMini.propTypes = {
  name: PropTypes.string.isRequired,   // The name of the item (e.g., "Mini Cool Jacket")
  itemImage: PropTypes.string.isRequired, // URL for the item's image
};

export default ItemCardMini;
