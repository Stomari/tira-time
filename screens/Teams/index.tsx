import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { useRef } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import { captureRef } from 'react-native-view-shot';

import { TRootStackParamList } from '../../navigation';

type TTeams = NativeStackScreenProps<TRootStackParamList, 'Teams'>;

export const Teams = (props: TTeams) => {
  const {
    route: {
      params: { teamsList },
    },
  } = props;

  const [status, requestPermission] = MediaLibrary.usePermissions();

  const imageRef = useRef();

  const onShare = async () => {
    try {
      if (status === null) {
        await requestPermission();
      }

      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      const isSharingAvailable = await Sharing.isAvailableAsync();

      if (localUri && isSharingAvailable) {
        await Sharing.shareAsync(localUri);
      }
    } catch (e) {
      Alert.alert('Ocorreu um erro.', 'Falha ao compartilhar a imagem!');
    }
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, padding: 24 }}>
        <View
          ref={imageRef}
          style={{ flex: 1, marginBottom: 16 }}
          collapsable={false}
        >
          <Card>
            <Card.Content style={{ gap: 16 }}>
              {Object.keys(teamsList).map((key) => {
                return (
                  <View key={key}>
                    <Text variant="titleLarge">{`Time ${key}`}</Text>
                    <Text variant="bodyMedium">{`${teamsList[key].join(
                      '\n',
                    )}`}</Text>
                  </View>
                );
              })}
            </Card.Content>
          </Card>
        </View>
        <Button mode="contained" onPress={onShare}>
          Compartilhar Times!
        </Button>
      </View>
    </ScrollView>
  );
};
