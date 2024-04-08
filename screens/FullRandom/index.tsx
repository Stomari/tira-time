import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  TextInput as PaperTextInput,
  Button,
  RadioButton,
  Text,
} from 'react-native-paper';

import { TextInput } from '../../components/TextInput';
import { useNumberOfTeams } from '../../hooks/useNumberOfTeams';
import { TRootStackParamList } from '../../navigation';
import { useAppTheme } from '../../theme';
import { getData, storeData } from '../../tools/asyncStorage';
import { shuffle } from '../../tools/utils/shuffleArray';

export type TFullRandom = NativeStackScreenProps<
  TRootStackParamList,
  'FullRandom'
>;

const STORE_LIST_KEY = 'full-random-list';

export const FullRandom = (props: TFullRandom) => {
  const { numberOfTeams, onSetNumberOfTeams, error } = useNumberOfTeams();
  const [listInput, setListInput] = useState<string>('');
  const [checked, setChecked] = useState<'comma' | 'space'>('comma');

  const { colors } = useAppTheme();

  const { navigation } = props;

  const fetchStoredList = async () => {
    const list = await getData<string>(STORE_LIST_KEY);
    if (list) {
      setListInput(list);
    }
  };

  // Retrieve last list
  useEffect(() => {
    fetchStoredList();
  }, []);

  const onPressHandler = () => {
    if (!listInput || !numberOfTeams || error) return;

    // Select regex by comma or by space
    const regex = checked === 'comma' ? /\s*,\s*(?=\S)/ : /\s+/;
    // Create array of names
    const itemsList = listInput.trim().split(regex);
    // Shuffle array for randomness
    shuffle(itemsList);
    // Calculate number of players for each team
    const playerNumberByTeam = itemsList.length / parseInt(numberOfTeams, 10);

    // Create teams object with random teammates
    const teams = {};
    let starterIndex = 0;
    for (let i = 1; i <= parseInt(numberOfTeams, 10); i++) {
      teams[i] = itemsList.slice(
        starterIndex,
        starterIndex + playerNumberByTeam,
      );
      starterIndex = starterIndex + playerNumberByTeam;
    }

    // Cache list
    storeData(listInput, STORE_LIST_KEY);

    // Display teams on Teams screen
    navigation.navigate('Teams', { teamsList: teams });
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            {/* Teams Number */}
            <View>
              <PaperTextInput
                mode="outlined"
                label="Número de times"
                keyboardType="numeric"
                value={numberOfTeams}
                onChangeText={(text) => onSetNumberOfTeams(text)}
                error={error}
              />
              {error && (
                <Text style={[styles.inputError, { color: colors.error }]}>
                  Número de times deve ser entre 2 e 100
                </Text>
              )}
            </View>

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
            <View style={styles.listInput}>
              <TextInput
                mode="outlined"
                label={`Digite a lista separado por ${
                  checked === 'comma' ? 'vírgula' : 'espaço'
                }`}
                multiline
                style={{ flex: 1 }}
                value={listInput}
                onChangeText={(text) => setListInput(text)}
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
    gap: 24,
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
    height: 300,
  },
  btnContainer: {
    padding: 24,
  },
  inputError: {
    position: 'absolute',
    bottom: -20,
  },
});
