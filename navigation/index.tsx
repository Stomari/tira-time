import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { Teams } from '../screens/Teams';

export type TRootStackParamList = {
  Home: undefined;
  Teams: {
    teamsList: { [key: string]: string[] };
  };
};

const Stack = createNativeStackNavigator<TRootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        {/* <Stack.Screen name="Tier List Screen" component={ScreenWithTierList} /> */}
        <Stack.Screen name="Teams" component={Teams} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
