import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (key: any, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log("Error storing value: ",  error);
  }
}

export const getItem = async (key: any) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log("Error retrieving value", error);
  }
}

export const removeItem = async (key: any) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Error removing value", error);
  }
}