import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ItemCardMini from '../components/Card/ItemCardMini.jsx';
import ItemCard from '../components/Card/ItemCard.jsx';
import {useDarkMode, useToken} from '../store/authStore.jsx';
import Button from '../components/button/button.jsx';
import LoadingPage from './LoadingPage.jsx';
import { Cap } from '../components/icons/Cap.jsx';
import { Superior } from '../components/icons/Superior.jsx';
import { Shirt } from '../components/icons/Shirt.jsx';
import { Pants } from '../components/icons/Pants.jsx';
import { Shoes } from '../components/icons/Shoes.jsx';

/**
 * VaultPage Component - Displays a collection of clothing items and allows filtering and selection.
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
  const darkMode = useDarkMode();

  // Refs for focus management on filter panel
  const filterPanelRef = useRef(null);
  const previousFocusRef = useRef(null);

  /**
   * Fetches and filters clothing items by category.
   *
   * @param {string} category - The category to filter items by.
   */
  const handleCategorySelect = async (category) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.VITE_API_BASE_URL}api/cloths/filter`,
        {
          headers: { 'Authorization': `Bearer ${token}` },
          params: { category },
        }
      );
      setCloths(response.data.cloths);
      setIsFilterOpen(false);
      previousFocusRef.current?.focus(); // Restore focus after closing filter panel
    } catch (error) {
      console.error("Error filtering cloths:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    /**
     * Fetches all clothing items from the API.
     */
    const fetchCloths = async () => {
      try {
        const response = await axios.get(`${process.env.VITE_API_BASE_URL}api/cloths`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        setCloths(response.data.cloths);
      } catch (error) {
        console.error('Error fetching cloths:', error);
      } finally {
        setTimeout(() => setIsLoading(false), 1000);
      }
    };
    fetchCloths();
  }, [token]);

  /**
   * Truncates the cloth name to a maximum length of 12 characters, adding an ellipsis if necessary.
   *
   * @param {string} name - The name of the cloth to be truncated.
   * @returns {string} The truncated cloth name.
   */
  const truncateName = (name) => name.length > 12 ? name.substring(0, 14) + '...' : name;

  /**
   * Handles the click on a clothing item to fetch and display its details.
   *
   * @param {string} id - The ID of the selected clothing item.
   */
  const handleCardClick = async (id) => {
    setIsTransitioning(true);
    document.body.style.overflow = 'hidden';
    try {
      const response = await axios.get(`${process.env.VITE_API_BASE_URL}api/cloths/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setSelectedCloth(response.data.cloth);
      setAnimationClass('slide-in');
    } catch (error) {
      console.error('Error fetching cloth details:', error);
      setIsTransitioning(false);
    }
  };

  /**
   * Closes the cloth details panel.
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
   * Deletes a clothing item from the API and updates the UI.
   *
   * @param {string} id - The ID of the clothing item to be deleted.
   */
  const handleDeleteCloth = async (id) => {
    try {
      await axios.delete(`${process.env.VITE_API_BASE_URL}api/cloths/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setSelectedCloth(null);
      setCloths(cloths.filter(cloth => cloth._id !== id));
      document.body.style.overflow = 'auto';
    } catch (error) {
      console.error('Error deleting cloth:', error);
    }
  };

  /**
   * Opens the filter panel.
   */
  const handleFilterClick = () => {
    previousFocusRef.current = document.activeElement;
    setIsFilterOpen(true);
    document.body.style.overflow = 'hidden';
  };

  /**
   * Closes the filter panel and restores focus.
   */
  const handleFilterClose = () => {
    setIsFilterOpen(false);
    document.body.style.overflow = 'auto';
    previousFocusRef.current?.focus();
  };

  // Handles keyboard accessibility for closing filter panel
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isFilterOpen) {
        handleFilterClose();
      }
    };
    if (isFilterOpen) {
      filterPanelRef.current?.focus();
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFilterOpen]);

  if (isLoading) {
    return <LoadingPage isVisible={isLoading} />;
  }

  return (
    <section className="vault-page">
      <header className={darkMode ? "vault-page__header vault-page__header--dark" : "vault-page__header"}>
        <h1>Selecciona la prenda para ver más</h1>
        <Button 
          className={darkMode ? "vault-page__button vault-page__button--dark" : "vault-page__button"}
          aria-label="Abrir filtros"
          onClick={handleFilterClick}
          aria-expanded={isFilterOpen}
        >
          Filtrar
        </Button>
      </header>
      <main className="vault-page__content">
        {cloths.length === 0 ? (
          <p className="vault-page__no-cloths">
            No hay ropa que mostrar actualmente.
          </p>
        ) : (
          cloths.map(cloth => (
            <section 
              key={cloth._id} 
              className="vault-page__item" 
              onClick={() => handleCardClick(cloth._id)}
            >
              <ItemCardMini 
                name={truncateName(cloth.name)} 
                itemImage={cloth.imageUrl} 
              />
            </section>
          ))
        )}
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
            buttonActionName="Borrar"
            onClickButton={() => handleDeleteCloth(selectedCloth._id)}
            onCloseClick={handleCloseClick}
          />
        </div>
      )}
      {isFilterOpen && (
        <>
          <div 
            className="vault-page__filter-backdrop" 
            onClick={handleFilterClose}
            role="presentation"
          ></div>
          <div 
            className="vault-page__filter-panel"
            ref={filterPanelRef}
            role="dialog"
            aria-labelledby="filter-title"
            aria-modal="true"
            tabIndex="-1"
          >
            <h2 id="filter-title" className="vault-page__filter-title">
              Seleccione que parte quiere ver
            </h2>
            <figure className="vault-page__character" role="group" aria-label="Categorías de ropa">
              <Cap 
                onSelect={handleCategorySelect} 
                aria-label="Filtrar por gorras" 
                tabIndex="0" 
                onKeyPress={(e) => e.key === 'Enter' && handleCategorySelect('cap')}
              />
              <Superior 
                onSelect={handleCategorySelect} 
                aria-label="Filtrar por ropa superior" 
                tabIndex="0" 
                onKeyPress={(e) => e.key === 'Enter' && handleCategorySelect('superior')}
              />
              <Shirt 
                onSelect={handleCategorySelect} 
                aria-label="Filtrar por camisetas" 
                tabIndex="0" 
                onKeyPress={(e) => e.key === 'Enter' && handleCategorySelect('shirt')}
              />
              <Pants 
                onSelect={handleCategorySelect} 
                aria-label="Filtrar por pantalones" 
                tabIndex="0" 
                onKeyPress={(e) => e.key === 'Enter' && handleCategorySelect('pants')}
              />
              <Shoes 
                onSelect={handleCategorySelect} 
                aria-label="Filtrar por zapatos" 
                tabIndex="0" 
                onKeyPress={(e) => e.key === 'Enter' && handleCategorySelect('shoes')}
              />
            </figure>
            <button 
              className="vault-page__filter-close"
              onClick={handleFilterClose}
              aria-label="Cerrar filtros"
            >
              X
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default VaultPage;