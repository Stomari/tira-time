import Icons from '@expo/vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TextInput, Button, RadioButton, Text } from 'react-native-paper';

import { TRootStackParamList } from '../../navigation';
import { useAppTheme } from '../../theme';
import { getData, storeData } from '../../tools/asyncStorage';
import { shuffle } from '../../tools/utils/shuffleArray';

export type TRandomByTier = NativeStackScreenProps<
  TRootStackParamList,
  'RandomByTier'
>;

type TInputList = {
  [key: number]: string;
};

const STORE_LIST_KEY = 'random-by-tier-list';

export const RandomByTier = (props: TRandomByTier) => {
  const [numberOfTeams, setNumberOfTeams] = useState<string>('');
  const [inputList, setInputList] = useState<TInputList>({
    1: '',
    2: '',
  });
  const [checked, setChecked] = useState<'comma' | 'space'>('comma');

  const { colors } = useAppTheme();

  const { navigation } = props;

  const fetchStoredList = async () => {
    const list = await getData<TInputList>(STORE_LIST_KEY, true);
    if (list) {
      setInputList(list);
    }
  };

  useEffect(() => {
    fetchStoredList();
  }, []);

  const onPressHandler = () => {
    if (!inputList[1] || !inputList[2] || !numberOfTeams) return;

    const teams = {};

    // Build teams object
    for (let i = 1; i <= parseInt(numberOfTeams, 10); i++) {
      teams[i] = [];
    }

    // Select regex by comma or by space
    const regex = checked === 'comma' ? /\s*,\s*(?=\S)/ : /\s+/;

    // Save last team updated
    let lastTeamUpdated = 1;

    // Loop for every tier
    Object.keys(inputList).forEach((key) => {
      if (!inputList[key].length) return;

      // Create array of names
      const itemsList: string[] = inputList[key].trim().split(regex);
      // Shuffle array for randomness
      shuffle(itemsList);
      // Calculate number of players for each team
      const playerNumberByTeam = Math.floor(
        itemsList.length / parseInt(numberOfTeams, 10),
      );

      let starterIndex = 0;

      while (starterIndex < itemsList.length) {
        teams[lastTeamUpdated].push(
          ...itemsList.slice(starterIndex, starterIndex + playerNumberByTeam),
        );
        starterIndex = starterIndex + playerNumberByTeam;
        // Update last team updated for other iterations
        if (lastTeamUpdated === parseInt(numberOfTeams, 10)) {
          lastTeamUpdated = 1;
        } else {
          lastTeamUpdated += 1;
        }
      }
    });

    storeData(inputList, STORE_LIST_KEY);

    // Display teams on Teams screen
    navigation.navigate('Teams', { teamsList: teams });
  };

  /**
   * Add a new tier on the UI
   */
  const onAddTier = () => {
    const lastKey = Object.keys(inputList).pop();
    setInputList({ ...inputList, [parseInt(lastKey, 10) + 1]: '' });
  };

  /**
   * Remove the last tier added
   */
  const onRemoveTier = () => {
    const lastKey = Object.keys(inputList).pop();
    if (lastKey === '2') {
      return;
    }
    const newObj = { ...inputList };
    delete newObj[lastKey];
    setInputList(newObj);
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            {/* Teams Number */}
            <TextInput
              mode="outlined"
              label="Número de times"
              keyboardType="numeric"
              value={numberOfTeams}
              onChangeText={(text) => setNumberOfTeams(text)}
            />

            {/* Radio Buttons */}
            <View style={styles.radioBtnContainer}>
              <Text style={styles.bold}>A lista será separada por:</Text>
              <RadioButton.Group
                onValueChange={(newValue: 'comma' | 'space') =>
                  setChecked(newValue)
                }
                value={checked}
              >
                <View style={styles.radioButton}>
                  <RadioButton
                    value="comma"
                    status={checked === 'comma' ? 'checked' : 'unchecked'}
                  />
                  <Text>Vírgula</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton
                    value="space"
                    status={checked === 'space' ? 'checked' : 'unchecked'}
                  />
                  <Text>Espaço</Text>
                </View>
              </RadioButton.Group>
            </View>

            {/* Names List */}
            {Object.keys(inputList).map((key) => (
              <View style={styles.listInput} key={key}>
                <TextInput
                  mode="outlined"
                  label={`Pote ${key}`}
                  placeholder={`Digite a lista separado por ${
                    checked === 'comma' ? 'vírgula' : 'espaço'
                  }`}
                  multiline
                  style={{ flex: 1 }}
                  value={inputList[key]}
                  onChangeText={(text) =>
                    setInputList({ ...inputList, [key]: text })
                  }
                />
              </View>
            ))}
            <View style={styles.addAndRemoveContainer}>
              <Icons
                name="add-circle"
                size={32}
                color={colors.add}
                onPress={onAddTier}
              />
              <Icons
                name="remove-circle"
                size={32}
                color={colors.remove}
                onPress={onRemoveTier}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={[styles.btnContainer, { backgroundColor: colors.background }]}
      >
        <Button mode="contained" onPress={onPressHandler}>
          Tirar Times!
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  formContainer: {
    gap: 8,
    flex: 1,
  },
  radioBtnContainer: {
    marginBottom: -4,
  },
  bold: {
    fontWeight: 'bold',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listInput: {
    height: 150,
  },
  btnContainer: {
    padding: 24,
  },
  addAndRemoveContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 8,
  },
});
