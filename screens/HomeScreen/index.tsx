import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { TextInput, Button, Card, Text } from 'react-native-paper';

function HomeScreen() {
  const [numberOfTeams, setNumberOfTeams] = useState<string>('');
  const [listInput, setListInput] = useState<string>('');
  const [teamsList, setTeamsList] = useState<{ [key: number]: string[] }>({});

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
    setTeamsList(teams);
    console.log(teams);
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <StatusBar />
        <View style={styles.container}>
          <View style={{ width: '100%', paddingHorizontal: 16, gap: 8 }}>
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
          <Card style={{ width: '100%' }}>
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
          <Button mode="contained">Compartilhar Times!</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
});

export default HomeScreen;
