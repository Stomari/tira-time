import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface CommonState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useCommonStore = create<CommonState>()(
  persist(
    (set, get) => ({
      isDarkMode: false,
      toggleDarkMode: () => set({ isDarkMode: !get().isDarkMode }),
    }),
    {
      name: 'common',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
