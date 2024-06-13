import { Welcome } from "./Welcome";
import React from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootScreens } from "..";
import { AuthTabParamList } from "@/Navigation/AuthNavigator";

export type WelcomScreenNavigatorProps = NativeStackScreenProps<
  AuthTabParamList,
  RootScreens.WELCOME
  >;

const WelcomeContainer = ({navigation}:WelcomScreenNavigatorProps) => {
  const onNavigate = (screen: 
    RootScreens.WELCOME |
    RootScreens.ONBOARD |
    RootScreens.LOGIN |
    RootScreens.REGISTER |
    RootScreens.FORGETPASSWORD |
    RootScreens.OTP |
    RootScreens.NEWPASSWORD
  ) => {
    navigation.navigate(screen);
  };
 
  return <Welcome onNavigate={onNavigate} />;
};

export default WelcomeContainer;