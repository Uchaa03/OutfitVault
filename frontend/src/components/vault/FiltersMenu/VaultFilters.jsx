import FiltersContainer from './FiltersContainer.jsx'
import React from 'react'


const VaultFilters = () => {
  <div className={`vault-page__filter-backdrop`} onClick={handleFilterClose}>
    <div className={`vault-page__filter-panel${isFilterOpen
      ? '-open'
      : '-closed'}`}>
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
}