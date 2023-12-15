import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { Card, Button, Text } from 'react-native-paper';

import { TRootStackParamList } from '../../navigation';

type TTeams = NativeStackScreenProps<TRootStackParamList, 'Teams'>;

export const Teams = (props: TTeams) => {
  const {
    route: {
      params: { teamsList },
    },
  } = props;

  return (
    <>
      <View style={{ flex: 1, padding: 24 }}>
        <View style={{ flex: 1 }}>
          <Card>
            <Card.Content>
              {Object.keys(teamsList).map((key) => {
                return (
                  <View key={key}>
                    <Text variant="titleLarge">{`Team ${key}`}</Text>
                    <Text variant="bodyMedium">{`${teamsList[key].join(
                      '\n',
                    )}`}</Text>
                  </View>
                );
              })}
            </Card.Content>
          </Card>
        </View>
        <Button mode="contained">Compartilhar Times!</Button>
      </View>
    </>
  );
};
