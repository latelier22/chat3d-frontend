import { create } from 'zustand';

const useImageStore = create((set) => ({
  imageUrl: null,
  isSearching: false,
  searchTerm: '',
  images: [],
  currentPage: 1,
  totalPages: 1,
  setImageUrl: (url) => set({ imageUrl: url, isSearching: false }),
  setIsSearching: (searching) => set({ isSearching: searching }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setImages: (images) => set({ images }),
  setCurrentPage: (page) => set((state) => ({ currentPage: page })),
  setTotalPages: (pages) => set({ totalPages: pages }),
}));

export default useImageStore;
