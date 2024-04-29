import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { adaptNavigationTheme, IconButton } from 'react-native-paper';

import { FullRandom } from '../screens/FullRandom';
import { Home } from '../screens/Home';
import { RandomByTier } from '../screens/RandomByTier';
import { Teams } from '../screens/Teams';
import { useCommonStore } from '../store/common';
import { darkTheme, theme } from '../theme';

export type TRootStackParamList = {
  Home: undefined;
  FullRandom: undefined;
  RandomByTier: undefined;
  Teams: {
    teamsList: { [key: string]: string[] };
  };
};

const Stack = createNativeStackNavigator<TRootStackParamList>();

const { DarkTheme, LightTheme } = adaptNavigationTheme({
  reactNavigationDark: DefaultTheme,
  reactNavigationLight: DefaultTheme,
  materialDark: darkTheme,
  materialLight: theme,
});

export const Navigation = () => {
  const { isDarkMode, toggleDarkMode } = useCommonStore();
  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : LightTheme}>
      <Stack.Navigator
        screenOptions={{
          headerRight: () => (
            <IconButton
              icon={isDarkMode ? 'brightness-2' : 'white-balance-sunny'}
              onPress={() => toggleDarkMode()}
            />
          ),
        }}
      >
        <Stack.Screen
          name="Home"
          options={{ title: 'Tira Time' }}
          component={Home}
        />
        <Stack.Screen
          name="FullRandom"
          options={{ title: '100% Aleatório' }}
          component={FullRandom}
        />
        <Stack.Screen
          name="RandomByTier"
          options={{ title: 'Por Potes' }}
          component={RandomByTier}
        />
        <Stack.Screen
          name="Teams"
          options={{ title: 'Times' }}
          component={Teams}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
