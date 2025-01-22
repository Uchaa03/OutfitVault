// ItemCard.jsx

import React from 'react';
import PropTypes from 'prop-types';

const ItemCard = ({ name, color, category, style, itemImage }) => {
  return (
    <article className="item-card">
        <svg
          width="485"
          height="409"
          className='item-card__image'
          viewBox="0 0 485 409"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <path
            d="M14.0455 34.6512H8.04545V40.6512V54.3707V54.3798L7.00003 393.997L6.98165 399.968L12.9529 400.015L393.498 403L393.522 403H393.545H425.955H431.955V397V394.016V389.868H450H456V383.868V380.318H473H479V374.318V356.411V12V6H473H134.273H67.3636H55.8636H49.8636V12V14.3876V16.7752V22.7132H27.6364H21.6364V28.7132V34.6512H14.0455Z"
            fill="url(#pattern0_406_648)"
            stroke="#141414"
            strokeWidth="12"
          />
          <defs>
            <pattern id="pattern0_406_648" patternContentUnits="objectBoundingBox" width="1" height="1">
              <use xlinkHref="#image0_406_648" transform="matrix(0.00166667 0 0 0.00245098 0 -0.412341)" />
            </pattern>
            <image id="image0_406_648" width="600" height="800" xlinkHref={itemImage} />
          </defs>
        </svg>
      <section className="item-card__details">
        <h2 className="item-card__name">{name}</h2>
        <p className="item-card__color">Color: {color}</p>
        <p className="item-card__category">Categoría: {category}</p>
        <p className="item-card__style">Estilo: {style}</p>
        <footer className="item-card__buttons">
          <button className="item-card__button">Button 1</button>
          <button className="item-card__button">Button 2</button>
        </footer>
      </section>
    </article>
  );
};

ItemCard.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  itemImage: PropTypes.string.isRequired,
};

export default ItemCard;
