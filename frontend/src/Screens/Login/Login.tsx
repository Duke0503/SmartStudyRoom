import { i18n, LocalizationKey } from "@/Localization";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from "react-native";
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

export interface ILoginProps {
  onNavigate: (string: RootScreens) => void;
}

export const Login = (props: ILoginProps) => {
  const { onNavigate } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.profile);

  const [login, loginResult] = useLoginUserMutation();

  const handleLogin = async () => {
    try {
      const response = await login({ email, password }).unwrap();

      console.log(response);
      if (response.success) {
        await AsyncStorage.setItem('token', response.data.token);
        dispatch(addUser({token: response.data.token, name: response.data.name, email: response.data.email, id: response.data.id}));
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
      <StatusBar style="auto"></StatusBar>
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