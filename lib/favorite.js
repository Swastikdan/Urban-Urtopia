// favorite.js
import { create } from 'zustand';

export const useFavorite = create((set) => ({
  isFavoritePlace: false,
  toggleFavorite: () =>
    set((state) => ({ isFavoritePlace: !state.isFavoritePlace })),
}));