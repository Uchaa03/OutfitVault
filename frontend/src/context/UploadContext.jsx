import React, { createContext, useState, useContext } from 'react';

// Create a context
const UploadContext = createContext();

// Define the provider component
export const UploadProvider = ({ children }) => {
  // State for photo URL, item info, and active state
  const [photoUrl, setPhotoUrl] = useState('/assets/img/stock_item_image.png');
  const [item, setItem] = useState({
    id: 1,
    name: 'Blusa',
    color: 'Azul',
    category: 'Blusa',
    style: 'Casual'
  });
  const [active, setActive] = useState(true); // Boolean state for active

  // Return context provider with the values
  return (
    <UploadContext.Provider value={{ photoUrl, setPhotoUrl, item, setItem, active, setActive }}>
      {children}
    </UploadContext.Provider>
  );
};

// Custom hook to use the context
export const useUploadContext = () => {
  return useContext(UploadContext);
};
