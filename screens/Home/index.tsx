import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { TRootStackParamList } from '../../navigation';

export type THome = NativeStackScreenProps<TRootStackParamList, 'Home'>;

export const Home = (props: THome) => {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Selecione o modo:
      </Text>
      <Card onPress={() => navigation.navigate('FullRandom')}>
        <Card.Title title="100% Aleatório" titleVariant="titleLarge" />
        <Card.Content>
          <Text variant="bodyMedium">
            Digite uma lista com os nomes e tire o time de forma aleatória.
          </Text>
        </Card.Content>
      </Card>
      <Card>
        <Card.Title title="Por Potes" titleVariant="titleLarge" />
        <Card.Content>
          <Text variant="bodyMedium">
            Separe os nomes por "potes" de forma que cada pote seja distribuido
            de forma aleatória entre os times. Por exemplo, caso tenham
            jogadores de nível avançado, intermediário e iniciante, a
            distribuição será feita de uma forma que cada time tenha uma
            quantidade igual de cada nível.
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  title: {
    fontWeight: 'bold',
  },
});
