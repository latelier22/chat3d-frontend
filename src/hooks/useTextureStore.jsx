import { create } from 'zustand';

const useTextureStore = create((set) => ({
  textures: [], // Stocke la liste des textures disponibles
  selectedTexture: null, // Stocke la texture sélectionnée
  modelTextures: {}, // Stocke les URLs des textures pour chaque matériau

  setTextures: (textures) => set({ textures }), // Met à jour la liste des textures
  setSelectedTexture: (texture) => set({ selectedTexture: texture }), // Met à jour la texture sélectionnée
  setModelTexture: (textureName, url) => set((state) => ({
    modelTextures: {
      ...state.modelTextures,
      [textureName]: url,
    },
  })),

  images: [],
  setImages: (images) => set({ images }),

  setIsSearching: (searching) => set({ isSearching: searching }),
}));

export default useTextureStore;
