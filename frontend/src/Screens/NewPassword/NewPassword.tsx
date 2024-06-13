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
import { useForgetPasswordUserMutation, useLoginUserMutation, useOTPUserMutation, useResetPasswordUserMutation } from "@/Services";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteEmail } from "@/Store/reducers/profile";
import { fetchSchedule } from "@/Store/reducers/schedules"
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { useCreateExpoPushTokenMutation } from "@/Services/notifications";
import Constants from "expo-constants";

export interface INewPasswordProps {
  onNavigate: (string: RootScreens) => void;
}

export const NewPassword = (props: INewPasswordProps) => {
  const { onNavigate } = props;
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.profile);

  const [resetPassword, resetPasswordResult] = useResetPasswordUserMutation();

  console.log(user)

  const handleNewPassword = async () => {
    if (password !== rePassword) {
      console.log("Failed");
      return;
    }

    try {
      const response = await resetPassword({email: user.email, newPassword: password, newPasswordToken: user.OTP}).unwrap();

      console.log(response);

      if (response.success) {
        dispatch(deleteEmail({}));
        onNavigate(RootScreens.LOGIN);
      }
    } catch (err) {
      console.error('An error occurred:', err);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar style="auto"></StatusBar>
      <View style={styles.container}>
        <View style={styles.title}>
            <Title3>Mật khẩu mới</Title3>
        </View>
        <View style={styles.body}>
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
            <View style={styles.inputGroup}>
                <SRegular>Nhập lại mật khẩu</SRegular>
                <TextInput 
                    style={styles.input}
                    onChangeText={setRePassword}
                    value={rePassword}
                    placeholder="Nhập lại mật khẩu của bạn"
                    secureTextEntry={true}
                ></TextInput>
            </View>
            <Pressable style={styles.registerButton} onPress={handleNewPassword}>
              <SSemiBold textStyles={{color: "white"}}>Xác nhận</SSemiBold>
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
    flexDirection: "row",
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
