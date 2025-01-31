import FiltersContainer from './filtersMenu/FiltersContainer.jsx'
import React, { useState } from 'react'


const VaultFilters = () => {
  const [filtersIsOpen, setFiltersIsOpen] = useState(false);


  /**
   * Closes the filter panel.
   */
  const handleFilterClose = () => {
    setFiltersIsOpen(false);
    document.body.style.overflow = 'auto';
  };

return (
    <div className={`vault-page__filter-backdrop`}>
      <div className={`vault-page__filter-panel${filtersIsOpen? '-open': '-closed'}`}>
        <button
          className="vault-page__filter-close"
          onClick={handleFilterClose}
          aria-label="Cerrar filtros"
        >
          X
        </button>
        <FiltersContainer />
      </div>
    </div>
  );
}

export default VaultFilters