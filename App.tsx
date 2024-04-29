import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';

import { Navigation } from './navigation';
import { useCommonStore } from './store/common';
import { darkTheme, theme } from './theme';

export default function App() {
  const { isDarkMode } = useCommonStore();

  return (
    <PaperProvider theme={isDarkMode ? darkTheme : theme}>
      <StatusBar style="auto" />
      <Navigation />
    </PaperProvider>
  );
}
