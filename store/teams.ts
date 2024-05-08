import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type TSeparatorMode = 'comma' | 'space';

export type TTeamsHistory = {
  separatorMode: TSeparatorMode;
  numberOfTeams: string;
  list: string;
};

export type TTeamsByTierHistory = Pick<
  TTeamsHistory,
  'numberOfTeams' | 'separatorMode'
> & {
  list: {
    [key: number]: string;
  };
};

interface TeamsState {
  fullRandomHistory: TTeamsHistory;
  setFullRandomHistory: (value: TTeamsHistory) => void;
  randomByTierHistory: TTeamsByTierHistory;
  setRandomByTierHistory: (value: TTeamsByTierHistory) => void;
}

export const useTeamsStore = create<TeamsState>()(
  persist(
    (set, get) => ({
      fullRandomHistory: {
        separatorMode: 'comma',
        numberOfTeams: '',
        list: '',
      },
      randomByTierHistory: {
        separatorMode: 'comma',
        numberOfTeams: '',
        list: {
          1: '',
          2: '',
        },
      },
      setFullRandomHistory: (value: TTeamsHistory) =>
        set({ fullRandomHistory: value }),
      setRandomByTierHistory: (value: TTeamsByTierHistory) =>
        set({
          randomByTierHistory: value,
        }),
    }),
    {
      name: 'teams',
      version: 1,
      migrate: (persistedState) => persistedState,
      merge: (persistedState: TeamsState, currentState) => ({
        ...currentState,
        ...persistedState,
      }),
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
