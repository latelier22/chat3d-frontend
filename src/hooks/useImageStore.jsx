import { create } from 'zustand'

const useImageStore = create((set) => ({
  imageUrl: null,
  isSearching: false, // Ajout de l'état de recherche
  setImageUrl: (url) => set({ imageUrl: url, isSearching: false }),
  setIsSearching: (searching) => set({ isSearching: searching }),
}));

export default useImageStore;
