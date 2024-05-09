import { i18n, LocalizationKey } from "@/Localization";
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from "react-native";
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, Ionicons} from "@expo/vector-icons";
// import { MainNavigator } from "@/Navigation/Main";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
// import { HomeScreenNavigatorProps } from "./HomeContainer";
import { RootScreens } from "..";
import Title3 from "@/Components/texts/Title3";
import VSRegular from "@/Components/texts/VSRegular";
import { colors } from "@/Components/colors";
import VSSemiBold from "@/Components/texts/VSSemiBold";
import LSemiBold from "@/Components/texts/LSemiBold";
import SRegular from "@/Components/texts/SRegular";
import SSemiBold from "@/Components/texts/SSemiBold";
import { useRegisterUserMutation } from "@/Services";

export interface IRegisterProps {
  onNavigate: (string: RootScreens) => void;
}

export const Register = (props: IRegisterProps) => {
  const { onNavigate } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [signup, signUpResult] = useRegisterUserMutation();

  const handleSignUp = async () => {
    try {
      // Tiếp tục xử lý đăng ký nếu các trường hợp lệ
      const response = await signup({ name, email, password }).unwrap();

      console.log(response);
      if (response) {
        // Navigate to the home page
        onNavigate(RootScreens.HOME);
      } else {
        // Handle login error
        console.error('Signup failed');
      }
    } catch (err) {
      // Handle any other errors
      console.error('An error occurred:', err);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar style="auto"></StatusBar>
      <View style={styles.container}>
        <View style={styles.title}>
            <Title3>Đăng ký</Title3>
        </View>
        <View style={styles.body}>
            <View style={styles.inputGroup}>
                <SRegular>Họ tên*</SRegular>
                <TextInput 
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder="Họ tên của bạn"
                ></TextInput>
            </View>
            <View style={styles.inputGroup}>
                <SRegular>Email*</SRegular>
                <TextInput 
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email của bạn"
                ></TextInput>
            </View>
            <View style={styles.inputGroup}>
                <SRegular>Mật khẩu*</SRegular>
                <TextInput 
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Mật khẩu của bạn"
                    secureTextEntry={true}
                ></TextInput>
            </View>
            <View style={styles.inputGroup}>
                <SRegular>Nhập lại mật khẩu*</SRegular>
                <TextInput 
                    style={styles.input}
                    onChangeText={setRePassword}
                    value={rePassword}
                    placeholder="Nhập lại mật khẩu của bạn"
                    secureTextEntry={true}
                ></TextInput>
            </View>
            <Pressable style={styles.registerButton} onPress={handleSignUp}>
              <SSemiBold textStyles={{color: "white"}}>Đăng ký</SSemiBold>
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