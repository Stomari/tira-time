import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import { TRootStackParamList } from '../../navigation';

export type THome = NativeStackScreenProps<TRootStackParamList, 'Home'>;

export const Home = (props: THome) => {
  const [numberOfTeams, setNumberOfTeams] = useState<string>('');
  const [listInput, setListInput] = useState<string>('');

  const { navigation } = props;

  /**
   * Shuffles a list of items.
   * Explanation can be found here: https://bost.ocks.org/mike/shuffle/
   * @param array List of strings to shuffle
   * @returns Shuffled list
   */
  const shuffle = (array: string[]): string[] => {
    let currentIndex: number = array.length;
    let randomIndex: number;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const onPressHandler = () => {
    if (!listInput || !numberOfTeams) return;

    const itemsList = listInput.split(/\s*,\s*/);
    shuffle(itemsList);
    const playerNumberByTeam = itemsList.length / parseInt(numberOfTeams, 10);
    const teams = {};
    let starterIndex = 0;
    for (let i = 1; i <= parseInt(numberOfTeams, 10); i++) {
      teams[i] = itemsList.slice(
        starterIndex,
        starterIndex + playerNumberByTeam,
      );
      starterIndex = starterIndex + playerNumberByTeam;
    }
    navigation.navigate('Teams', { teamsList: teams });
  };

  return (
    <View style={styles.container}>
      <View style={{ gap: 8, flex: 1 }}>
        <TextInput
          mode="outlined"
          label="N.º de times"
          keyboardType="numeric"
          value={numberOfTeams}
          onChangeText={(text) => setNumberOfTeams(text)}
        />
        <View style={{ height: 300 }}>
          <TextInput
            mode="outlined"
            label="Digite a lista separado por vírgula"
            multiline
            style={{ flex: 1 }}
            value={listInput}
            onChangeText={(text) => setListInput(text)}
          />
        </View>
      </View>
      <Button mode="contained" onPress={onPressHandler}>
        Tirar Time!
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
