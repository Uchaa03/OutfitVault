import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/button.jsx';
import {useDarkMode} from "../../store/authStore.jsx";

/**
 * A reusable ItemCard component that displays item details, including an image, name, color, category, style, and action buttons.

 *
 * @param {Object} props - The props for the ItemCard component.
 * @param {string} props.name - The name of the item.
 * @param {string} props.color - The color of the item.
 * @param {string} props.category - The category of the item.
 * @param {string} props.style - The style of the item.
 * @param {string} props.itemImage - The image URL for the item.
 * @param {string} [props.className=''] - Additional custom class names for styling (optional).
 * @param {function} props.onClickButton - The callback function for the action button.
 * @param {function} props.onCloseClick - The callback function for the close button.
 *
 * @returns {JSX.Element} The rendered ItemCard component.
 */
const ItemCard = ({ className, name, color, category, style, itemImage, buttonActionName, onClickButton, onCloseClick, error }) => {
  const darkMode = useDarkMode();

  if (error) {
    return (
      <article className={darkMode ? `item-card ${className} item-card--dark`: `item-card ${className}`}>
        <section className="item-card__details item-card__details--error">
          <h2>La prenda subida no es válida</h2>
          <footer className="item-card__buttons">
            <Button className="item-card__button-error" onClick={onCloseClick}>X</Button>
          </footer>
        </section>
      </article>
    );
  }

    return (
        <article className={darkMode ? `item-card ${className} item-card--dark`: `item-card ${className}`}>
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
                stroke={darkMode ? "#FFF" : "#141414"}
                strokeWidth="12"
            />
            <defs>
              <pattern id="pattern0_406_648"
                       patternContentUnits="objectBoundingBox" width="1"
                       height="1">
                <use xlinkHref="#image0_406_648"
                     transform="matrix(0.00166667 0 0 0.00245098 0 -0.412341)"/>
              </pattern>
              <image id="image0_406_648" width="600" height="800"
                     xlinkHref={itemImage}/>
            </defs>
          </svg>
          <section className={darkMode ? 'item-card__details item-card__details--dark': 'item-card__details'}>
            <h2 className="item-card__name">{name}</h2>
            <h3 className="item-card__color">
              Color: <span className={darkMode ? 'item-card__span--dark' : 'item-card__span'}>{color}</span>
            </h3>
            <h3 className="item-card__category">
              Categoría: <span className={darkMode ? 'item-card__span--dark' : 'item-card__span'}>{category}</span>
            </h3>
            <h3 className="item-card__style">
              Estilo: <span className={darkMode ? 'item-card__span--dark' : 'item-card__span'}>{style}</span>
            </h3>
            <footer className="item-card__buttons">
              <Button className={darkMode ? "item-card__button item-card__button--dark" : "item-card__button"}
                      onClick={onClickButton}>{buttonActionName}</Button>
              <Button className={darkMode ? "item-card__button-error item-card__button-error--dark" : "item-card__button-error"}
                      onClick={onCloseClick}>X</Button>
            </footer>
          </section>
        </article>
    );
  };

  ItemCard.propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
    category: PropTypes.string,
    style: PropTypes.string,
    itemImage: PropTypes.string,
    className: PropTypes.string,
    buttonActionName: PropTypes.string,
    onClickButton: PropTypes.func,
    onCloseClick: PropTypes.func.isRequired,
    error: PropTypes.bool
  };


export default ItemCard;
