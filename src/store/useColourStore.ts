import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ColorData, convertAll, getRandomRgb } from '@/lib/colour/convert';
import { findNearestTailwindColor } from '@/lib/colour/nearest';

interface ColourStore {
  pickedColour: ColorData | null;
  history: string[];
  alpha: number;
  setColour: (r: number, g: number, b: number, a?: number) => void;
  setAlpha: (value: number) => void;
  clearHistory: () => void;
}

export const useColourStore = create<ColourStore>()(
  persist(
    (set, get) => ({
      // Start with null on server, generate random color on client mount
      pickedColour: null,
      history: [],
      alpha: 1,

      setColour: (r: number, g: number, b: number, a?: number) => {
        const alpha = a ?? get().alpha;
        const colorData = convertAll(r, g, b, alpha);
        colorData.tailwind = findNearestTailwindColor(colorData.hex);

        set((state) => {
          const newHistory = [colorData.hex, ...state.history.filter(h => h !== colorData.hex)].slice(0, 20);
          
          return {
            pickedColour: colorData,
            history: newHistory,
          };
        });
      },

      setAlpha: (value: number) => {
        set({ alpha: Math.max(0, Math.min(1, value)) });
        
        // Update current color with new alpha if exists
        const currentColor = get().pickedColour;
        if (currentColor) {
          const updatedColor = convertAll(currentColor.r, currentColor.g, currentColor.b, value);
          updatedColor.tailwind = currentColor.tailwind;
          set({ pickedColour: updatedColor });
        }
      },

      clearHistory: () => {
        set({ history: [] });
      },
    }),
    {
      name: 'chromagrab_history',
      partialize: (state) => ({ history: state.history }),
    }
  )
);
