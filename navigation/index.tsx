import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { FullRandom } from '../screens/FullRandom';
import { Home } from '../screens/Home';
import { Teams } from '../screens/Teams';

export type TRootStackParamList = {
  Home: undefined;
  FullRandom: undefined;
  Teams: {
    teamsList: { [key: string]: string[] };
  };
};

const Stack = createNativeStackNavigator<TRootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
        {/* <Stack.Screen name="Tier List Screen" component={ScreenWithTierList} /> */}
        <Stack.Screen
          name="Teams"
          options={{ title: 'Times' }}
          component={Teams}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
