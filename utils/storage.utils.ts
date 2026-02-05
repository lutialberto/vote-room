import AsyncStorage from "@react-native-async-storage/async-storage";

export type StorageKey =
  | "hasCompletedOnboarding"
  | "hasCompletedUserCreation"
  | "userSession";
export type StorageEnv = "development" | "production";

interface StorageProps {
  key: StorageKey;
  env?: StorageEnv;
}

const getStorageKeyWithEnv = (props: StorageProps) => {
  if (props.env) {
    return `${props.key}_${props.env}`;
  }
  return props.key;
};

export const getFromStorage = async (props: StorageProps) => {
  const key = getStorageKeyWithEnv(props);
  return await AsyncStorage.getItem(key);
};

export const removeFromStorage = async (props: StorageProps) => {
  const key = getStorageKeyWithEnv(props);
  await AsyncStorage.removeItem(key);
};

export const saveToStorage = async (props: StorageProps, value: string) => {
  const key = getStorageKeyWithEnv(props);
  await AsyncStorage.setItem(key, value);
};

export const clearStorage = async (env?: StorageEnv) => {
  const allKeys = await AsyncStorage.getAllKeys();
  const keysToRemove = env
    ? allKeys.filter((key) => key.endsWith(`_${env}`))
    : allKeys;
  await AsyncStorage.multiRemove(keysToRemove);
};

export const consumeFromStorage = async (props: StorageProps) => {
  const value = await getFromStorage(props);
  await removeFromStorage(props);
  return value;
};
