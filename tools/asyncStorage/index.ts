import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value, key: string) => {
  try {
    if (typeof value === 'string') {
      await AsyncStorage.setItem(key, value);
      return;
    }
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('Error while trying to store data.', e);
  }
};

export async function getData<Type>(
  key: string,
  isObject: boolean = false,
): Promise<Type> {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      if (isObject) {
        return JSON.parse(value);
      }
      return value as Type;
    }
    return null;
  } catch (e) {
    console.log('Error while trying to retrieve data.', e);
  }
}
