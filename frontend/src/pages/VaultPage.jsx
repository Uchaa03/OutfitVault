import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemCardMini from '../components/Card/ItemCardMini.jsx';
import ItemCard from '../components/Card/ItemCard.jsx';
import { useToken } from '../store/authStore.jsx';
import Button from '../components/button/button.jsx';
import LoadingPage from './LoadingPage.jsx';
import FiltersContainer from '../components/vault/FiltersMenu/FiltersContainer.jsx';

/**
 * VaultPage component that displays a collection of cloth items.
 * The user can view details of each cloth item, delete items, and apply filters.
 *
 * @component
 * @returns {JSX.Element} The VaultPage component.
 */
const VaultPage = () => {
  const token = useToken();
  const [cloths, setCloths] = useState([]);
  const [selectedCloth, setSelectedCloth] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetches the list of cloth items from the server when the component is mounted.
   * Updates the state with the fetched cloth items.
   *
   * @async
   * @returns {Promise<void>} Resolves when the data is fetched.
   */
  const fetchCloths = async () => {
    try {
      const response = await axios.get(`${process.env.VITE_API_BASE_URL}api/cloths`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setCloths(response.data.cloths);
    } catch (error) {
      console.error('Error fetching cloths:', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };
  useEffect(() => {
    fetchCloths();
  }, [token]);

  /**
   * Filters the cloth items based on an array of selected categories.
   *
   * @param {string[]} filterArray - Array of selected categories to filter by.
   * @returns {void} Filtered list of cloth items.
   */
  const filterCloths = async (filterArray) => {
    await fetchCloths();
    if (!filterArray || filterArray.length !== 0) {
      setCloths(cloths.filter(cloth => filterArray.includes(cloth.category)));
    } else {
      fetchCloths()
    }
    console.log('Filtered list of cloth items', cloths)
  };

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

  /**
   * Closes the filter panel.
   */
  const handleFilterClose = () => {
    setIsFilterOpen(false);
    document.body.style.overflow = 'auto';
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
    <section className="vault-page">
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
          //This is a temporary solution to duplicate id's
          cloths.map((cloth, index) => (
            <section
                key={`${cloth._id}-${index}`}  // Ensures uniqueness
                className="vault-page__item"
                onClick={() => handleCardClick(cloth._id)}
            >
              <ItemCardMini
                  name={truncateName(cloth.name)}
                  itemImage={cloth.imageUrl}
              />
            </section>
        ))}
      </main>
      {selectedCloth && (
        <div className={`vault-page__overlay ${isTransitioning ? 'transitioning' : ''}`}>
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
        </div>
      )}
      {isFilterOpen && (
          <div className={`vault-page__filter-backdrop`}>
            <div className={`vault-page__filter-panel${isFilterOpen? '-open': '-closed'}`}>
              <button
                className="vault-page__filter-close"
                onClick={handleFilterClose}
                aria-label="Cerrar filtros"
              >
                X
              </button>
              <FiltersContainer filterCloths={filterCloths}/>
            </div>
          </div>
      )}
    </section>
  );
};

export default VaultPage;
