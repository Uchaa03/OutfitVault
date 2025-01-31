import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemCardMini from '../components/Card/ItemCardMini.jsx';
import ItemCard from '../components/Card/ItemCard.jsx';
import { useToken } from '../store/authStore.jsx';
import Button from '../components/button/button.jsx';
import LoadingPage from './LoadingPage.jsx';
import useClothesStore from '../store/clothesStore.jsx'
import VaultFilters from '../components/vault/VaultFilters.jsx'
import { Clothes } from '../apiServices/apiServices.jsx'
import VaultCard from '../components/vault/cards/VaultCard.jsx'

/**
 * VaultPage component that displays a collection of cloth items.
 * The user can view details of each cloth item, delete items, and apply filters.
 *
 * @component
 * @returns {JSX.Element} The VaultPage component.
 */
const VaultPage = () => {
  const token = useToken();
  const [selectedCloth, setSelectedCloth] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {cloths, setCloths} = useClothesStore();
  // const [cloths, setCloths] = useState([]);


  useEffect(() => {
    setCloths(Clothes.getAllClothes())
  }, [token]);

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
    setIsTransitioning(true);
    document.body.style.overflow = 'hidden';
    try {
      const response = await axios.get(`${process.env.VITE_API_BASE_URL}api/cloths/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setSelectedCloth(response.data.cloth);
      setAnimationClass('slide-in');
      setTimeout(() => {
        // Is called when the animation ends
      }, 1000);
    } catch (error) {
      console.error('Error fetching cloth details:', error);
      setIsTransitioning(false);
    }
  };

  /**
   * Handles the closing of the selected cloth details panel.
   * Triggers a transition animation to hide the details and restores the page overflow.
   */
  const handleCloseClick = () => {
    setAnimationClass('slide-out');
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedCloth(null);
      setAnimationClass('');
      setIsTransitioning(false);
      document.body.style.overflow = 'auto';
    }, 1000);
  };

  /**
   * Handles the deletion of a cloth item from the vault.
   * Triggers an API request to delete the cloth and updates the state to remove it from the UI.
   *
   * @async
   * @param {string} id - The unique identifier of the cloth to be deleted.
   * @returns {Promise<void>} Resolves when the cloth is deleted.
   */
  const handleDeleteCloth = async (id) => {
    try {
      await axios.delete(`${process.env.VITE_API_BASE_URL}api/cloths/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setSelectedCloth(null);
      setCloths(cloths.filter(cloth => cloth._id !== id));
      document.body.style.overflow = 'auto';
    } catch (error) {
      console.error('Error deleting cloth:', error);
    }
  };

  /**
   * Opens the filter panel to allow the user to filter cloth items.
   */
  const handleFilterClick = () => {
    setIsFilterOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleLoadingFinish = () => {
    // This function is called when the loading animation finishes
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <LoadingPage isVisible={isLoading} onFinish={handleLoadingFinish} />
    );
  }

  return (
    <section className={`vault-page${filtersIsOpen || cardIsOpen ? 'blur' : ''}`}>

      <header className="vault-page__header">
        <h1>Selecciona la prenda para ver más</h1>
        <Button
          className="vault-page__button"
          aria-label="Filtrar"
          onClick={handleFilterClick}
        >
          Filtrar
        </Button>
      </header>

      <main className="vault-page__content">
        {
          //key={`${cloth._id}-${index}`} is a temporary solution to duplicate id's
          cloths.map((cloth, index) => (
            <VaultCard
              cloth={cloth}
              key={`${cloth._id}-${index}`}
            />
          ))
        }
      </main>

      {selectedCloth && (
        <ItemCard
          className={animationClass === 'float' ? 'float' : ''}
          name={selectedCloth.name}
          color={selectedCloth.color}
          category={selectedCloth.category}
          style={selectedCloth.style}
          itemImage={selectedCloth.imageUrl}
          buttonActionName={"Borrar"}
          onClickButton={() => handleDeleteCloth(selectedCloth._id)}
          onCloseClick={handleCloseClick}
        />
      )}

      <VaultFilters
        isFilterOpen={isFilterOpen}
        handleFilterClose={handleFilterClose}
      />
    </section>
  );
};

export default VaultPage;
