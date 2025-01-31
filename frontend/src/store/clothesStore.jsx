import create from 'zustand';


const useClothesStore = create((set) => ({
  cloths: [],
  setCloths: (cloths) => set({ cloths }),

  cloth: null,
  setCloth: (cloth) => set({ cloth }),
  addCloth: (cloth) => set((state) => ({ cloths: [...state.cloths, cloth] })),
  removeCloth: (clothId) =>
    set((state) => ({
      cloths: state.cloths.filter((cloth) => cloth.id !== clothId),
    })),

  filters: [],
  setFilters: (filters) => set({ filters }),
  filterCloths: () => {
    set((state) => {
      const filteredCloths = state.cloths.filter((cloth) =>
        state.filters.includes(cloth.category)
      );
      return { cloths: filteredCloths };
    });
  },
}));

export default useClothesStore;
