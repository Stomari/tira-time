import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';

import { Navigation } from './navigation';
import { theme } from './theme';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar style="auto" />
      <Navigation />
    </PaperProvider>
  );
}
