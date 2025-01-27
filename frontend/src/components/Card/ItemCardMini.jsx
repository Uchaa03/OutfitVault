import React from 'react';
import PropTypes from 'prop-types';

const ItemCardMini = ({ name, itemImage }) => {
  return (
    <svg className="item-card-mini" width="612" height="490" viewBox="0 0 612 490" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className="item-card-mini__background" d="M19.3094 42.427H10.8094V50.927V67.1697V67.1836L9.50004 469.332L9.47249 477.797L17.937 477.859L494.564 481.393L494.596 481.394H494.627H535.219H543.719V472.894V469.36V465.844H565.336H573.836V457.344V454.535H594.143H602.643V446.035V424.83V17V8.5H594.143H169.892H86.0896H71.686H63.186V17V19.8272V22.6545V28.2907H36.3318H27.8318V36.7907V42.427H19.3094Z" fill="#D9D9D9" stroke="#141414" strokeWidth="17"/>
      <svg className="item-card-mini__image-container" x="50%" y="50%" width="525" height="364" viewBox="0 0 525 364" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" transform="translate(-262.5, -182)">
        <path className="item-card-mini__image-border" d="M14.1364 31.3023H8.13636V37.3023V49.4151V49.4264L7.00004 349.342L6.97737 355.326L12.9618 355.364L426.598 358L426.617 358H426.636H461.864H467.864V352V349.364V346.403H488H494V340.403V337.969H513H519V331.969V316.155V12V6H513H144.818H72.0909H59.5909H53.5909V12V14.1085V16.2171V20.7597H28.9091H22.9091V26.7597V31.3023H14.1364Z" fill="url(#pattern0_467_459)" stroke="#141414" strokeWidth="12"/>
        <defs>
          <pattern id="pattern0_467_459" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlinkHref="#image0_467_459" transform="matrix(0.00166667 0 0 0.00245098 0 -0.412341)"/>
          </pattern>
          <image id="image0_467_459" width="600" height="800" xlinkHref={itemImage}></image>
        </defs>
      </svg>
      <text className="item-card-mini__name" x="50%" y="95%" textAnchor="middle" fontSize="24" fill="#141414">{name}</text>
    </svg>
  );
};

ItemCardMini.propTypes = {
  name: PropTypes.string.isRequired,
  itemImage: PropTypes.string.isRequired,
};

export default ItemCardMini;