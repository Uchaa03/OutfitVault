import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemCardMini from '../components/Card/ItemCardMini.jsx';
import ItemCard from '../components/Card/ItemCard.jsx';
import { useToken } from '../store/authStore.jsx';
import Button from '../components/button/button.jsx';

const VaultPage = () => {
  const token = useToken();
  const [cloths, setCloths] = useState([]);
  const [selectedCloth, setSelectedCloth] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
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
      }
    };

    fetchCloths();
  }, [token]);

  const truncateName = (name) => {
    return name.length > 12 ? name.substring(0, 14) + '...' : name;
  };

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
        setAnimationClass('float');
        setIsTransitioning(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching cloth details:', error);
      setIsTransitioning(false);
    }
  };

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

  const handleFilterClick = () => {
    setIsFilterOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleFilterClose = () => {
    setIsFilterOpen(false);
    document.body.style.overflow = 'auto';
  };

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
      <main className={`vault-page__content ${selectedCloth ? 'hidden' : ''}`}>
        {cloths.map(cloth => (
          <section key={cloth._id} className="vault-page__item" onClick={() => handleCardClick(cloth._id)}>
            <ItemCardMini name={truncateName(cloth.name)} itemImage={cloth.imageUrl} />
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
        <>
          <div className="vault-page__filter-backdrop" onClick={handleFilterClose}></div>
          <div className="vault-page__filter-panel">
            <button 
              className="vault-page__filter-close"
              onClick={handleFilterClose}
              aria-label="Cerrar filtros"
            >
              ×
            </button>
            {/* Filter content will go here */}
          </div>
        </>
      )}
    </section>
  );
};

export default VaultPage;