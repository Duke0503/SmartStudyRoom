import { i18n, LocalizationKey } from "@/Localization";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, Platform } from "react-native";
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, Ionicons} from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { RootScreens } from "..";
import Title3 from "@/Components/texts/Title3";
import VSRegular from "@/Components/texts/VSRegular";
import { colors } from "@/Components/colors";
import VSSemiBold from "@/Components/texts/VSSemiBold";
import LSemiBold from "@/Components/texts/LSemiBold";
import SRegular from "@/Components/texts/SRegular";
import SSemiBold from "@/Components/texts/SSemiBold";
import { useLoginUserMutation } from "@/Services";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "@/Store/reducers/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { useCreateExpoPushTokenMutation } from "@/Services/notifications";
import Constants from "expo-constants";

// Set Up Notification
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// End Set Up Notification
export interface ILoginProps {
  onNavigate: (string: RootScreens) => void;
}

export const Login = (props: ILoginProps) => {
  const { onNavigate } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.profile);

  // Handle Update ExpoPushToken
  const [userID, setUserID] = useState<number>();
  const [createExpoPushToken, { data, isSuccess }] = useCreateExpoPushTokenMutation();

  // End Handle Update ExpoPushToken
  const [login, loginResult] = useLoginUserMutation();

  const handleRegistrationError = (errorMessage: string) => {
    alert(errorMessage);
    throw new Error(errorMessage);
  };
  
  const registerForPushNotificationsAsync = async () => {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        handleRegistrationError('Permission not granted to get push token for push notification!');
        return;
      }
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        handleRegistrationError('Project ID not found');
      }
      try {
      const pushTokenString = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log(userID);
        if (userID) {
          
          console.log(await createExpoPushToken({ body: { token: pushTokenString, userID: userID } }).unwrap());
        }

        return pushTokenString;
      } catch (e: unknown) {
        handleRegistrationError(`${e}`);
      }
    } else {
      handleRegistrationError('Must use physical device for push notifications');
    }
  }

  const handleLogin = async () => {
    try {
      const response = await login({ email, password }).unwrap();

      if (response.success) {
        await AsyncStorage.setItem('token', response.data.token);
        dispatch(addUser({
          token: response.data.token, 
          name: response.data.name, 
          email: response.data.email, 
          id: response.data.id,
          birthday: response.data.birthday,
          phone_number: response.data.phone_number,
          gender: response.data.gender,
          roles: response.data.roles,
          supervisor: response.data.supervisor,
        }));

        setUserID(response.data.id);
        registerForPushNotificationsAsync()        
        
        onNavigate(RootScreens.HOME);
      } else {
        console.error('Login failed');
      }
    } catch (err) {
      console.error('An error occurred:', err);
    }
  };

  useEffect(() => {
    if (user.token !== undefined && user.token !== "") {
      onNavigate(RootScreens.HOMENAVIGATOR);
    }
    }, []
  );

  return (
    <SafeAreaView>
      <StatusBar style="auto" backgroundColor="#000000"></StatusBar>
      <View style={styles.container}>
        <View style={styles.title}>
            <Title3>Đăng nhập</Title3>
        </View>
        <View style={styles.body}>
            <View style={styles.inputGroup}>
                <SRegular>Email</SRegular>
                <TextInput 
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email của bạn"
                ></TextInput>
            </View>
            <View style={styles.inputGroup}>
                <SRegular>Mật khẩu</SRegular>
                <TextInput 
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Mật khẩu của bạn"
                    secureTextEntry={true}
                ></TextInput>
            </View>
            <Pressable onPress={() => onNavigate(RootScreens.REGISTER)}>
              <SRegular>Chưa có tài khoản? Đăng ký</SRegular>
            </Pressable>
            <Pressable style={styles.registerButton} onPress={handleLogin}>
              <SSemiBold textStyles={{color: "white"}}>Đăng nhập</SSemiBold>
            </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "90%",
    paddingHorizontal: "5%",
    paddingTop: "3%",
    flexDirection: "column",
    alignContent: "flex-start",
  },

  title: {
    width: "100%",
    height: "7%",
    justifyContent: "center",
    alignItems: "center"
  },

  body: {
    width: "100%",
    height: "93%",
    paddingTop: "3%"
  },

  inputGroup: {
    width: "100%",
    height: "10%",
    marginVertical: "3%"
  },

  input: {
    marginTop: "2%",
    borderWidth: 1,
    borderColor: colors.neutral_300,
    borderRadius: 15,
    padding: "3%",
    height: "75%"
  },

  registerButton: {
    width: "50%",
    height: "10%",
    borderRadius: 15,
    backgroundColor: colors.secondary_500,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginVertical: "5%",
  }
  
});