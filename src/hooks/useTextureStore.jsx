import { create } from 'zustand';

const useTextureStore = create((set) => ({
  textures: [], // Stocke la liste des textures disponibles
  selectedTexture: null, // Stocke la texture sélectionnée
  hoveredTexture: null, // Stocke la texture survolée
  modelTextures: {}, // Stocke les URLs des textures pour chaque matériau
  selectMode: false, // Ajoute un état pour le mode de sélection

  setTextures: (textures) => set({ textures }), // Met à jour la liste des textures
  setSelectedTexture: (texture) => set({ selectedTexture: texture }), // Met à jour la texture sélectionnée
  setHoveredTexture: (texture) => set({ hoveredTexture: texture }), // Met à jour la texture survolée
  setModelTexture: (textureName, url) => set((state) => ({
    modelTextures: {
      ...state.modelTextures,
      [textureName]: url,
    },
  })),
  setSelectMode: (mode) => set({ selectMode: mode }), // Met à jour le mode de sélection

  images: [],
  setImages: (images) => set({ images }),

  setIsSearching: (searching) => set({ isSearching: searching }),
}));

export default useTextureStore;
