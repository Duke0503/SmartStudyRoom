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
import { useForgetPasswordUserMutation, useLoginUserMutation } from "@/Services";
import { useDispatch, useSelector } from "react-redux";
import { addUser, addEmail, deleteEmail } from "@/Store/reducers/profile";
import { fetchSchedule } from "@/Store/reducers/schedules"
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { useCreateExpoPushTokenMutation } from "@/Services/notifications";
import Constants from "expo-constants";

// End Set Up Notification
export interface IForgetPasswordProps {
  onNavigate: (string: RootScreens) => void;
}

export const ForgetPassword = (props: IForgetPasswordProps) => {
  const { onNavigate } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.profile);

  const [forgetPassword, forgetPasswordResult] = useForgetPasswordUserMutation();

  const handleForgetPassword = async () => {
    try {
      const response = await forgetPassword({email: email}).unwrap();

      if (response.success) {
        dispatch(addEmail(email));
        onNavigate(RootScreens.OTP);
      } else {
        console.log("Failed")
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
            <Pressable style={{paddingRight: 15}} onPress={() => {onNavigate(RootScreens.LOGIN); dispatch(deleteEmail({}))}}>
                <Ionicons name="arrow-back-outline" size={24} color={colors.neutral_900}></Ionicons>
            </Pressable>
            <Title3 textStyles={{paddingLeft: "20%"}}>Quên mật khẩu</Title3>
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
            <Pressable style={styles.registerButton} onPress={handleForgetPassword}>
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
    justifyContent: "flex-start",
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
