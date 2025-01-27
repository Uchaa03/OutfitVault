import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemCardMini from '../components/Card/ItemCardMini.jsx';
import { useToken } from '../store/authStore.jsx';
import Button from '../components/button/button.jsx';

const VaultPage = () => {
  const token = useToken();
  const [cloths, setCloths] = useState([]);

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
    return name.length > 18 ? name.substring(0, 18) + '...' : name;
  };

  return (
    <section className="vault-page">
      <header className="vault-page__header">
        <h1>Selecciona la prenda para ver más</h1>
        <Button className="vault-page__button" aria-label="Filtrar">Filtrar</Button>
      </header>
      <main className="vault-page__content">
        {cloths.map(cloth => (
          <section key={cloth._id} className="vault-page__item">
            <ItemCardMini name={truncateName(cloth.name)} itemImage={cloth.imageUrl} />
          </section>
        ))}
      </main>
    </section>
  );
};

export default VaultPage;