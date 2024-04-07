import { MD3LightTheme as DefaultTheme, useTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    add: '#5cdb5c',
    remove: '#ff0021',
  },
};

export const useAppTheme = () => useTheme<typeof theme>();
