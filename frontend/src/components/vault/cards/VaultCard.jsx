import ItemCardMini from '../../Card/ItemCardMini.jsx'
import React from 'react'
import useClothesStore from '../../../store/clothesStore.jsx'


const VaultCard = ({cloth, index}) => {
  const {setCloth} = useClothesStore();

  /**
   * Truncates the cloth name to a maximum length of 12 characters, adding an ellipsis if necessary.
   *
   * @param {string} name - The name of the cloth to be truncated.
   * @returns {string} The truncated cloth name.
   */
  const truncateName = (name) => {
    return name.length > 12 ? name.substring(0, 14) + '...' : name;
  };

  /**
   * Handles the click on a cloth item to fetch and display its details.
   * Triggers a transition animation while loading the details.
   *
   * @async
   * @param {string} id - The unique identifier of the selected cloth.
   * @returns {Promise<void>} Resolves when the selected cloth's details are fetched.
   */
  const handleCardClick = async (id) => {
    document.body.style.overflow = 'hidden';
    try {
      setCloth(getClothById(id));
      setAnimationClass('slide-in');
    } catch (e) {
      setIsTransitioning(false);
    }
  };

  return (
  <button
    key={`${cloth._id}-${index}`}  // Ensures uniqueness
    className="vault-page__item"
    onClick={() => handleCardClick(cloth._id)}
    aria-label={`View details for ${cloth.name}`} // Add a label for screen readers
  >
    <ItemCardMini
      name={truncateName(cloth.name)}
      itemImage={cloth.imageUrl}
    />
  </button>
  )
}

export default VaultCard