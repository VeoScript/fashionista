import { create } from "zustand";

interface Outfit {
  id: string;
  title: string;
  thumbnail: string;
  items: string[];
}

interface OutfitStore {
  savedOutfits: Outfit[];
  saveOutfit: (outfit: Outfit) => void;
}

export const useOutfitStore = create<OutfitStore>((set) => ({
  savedOutfits: [],
  saveOutfit: (outfit) =>
    set((state) => ({
      savedOutfits: [...state.savedOutfits, outfit],
    })),
}));
