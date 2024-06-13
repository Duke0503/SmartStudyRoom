import { Onboard } from "./Onboarding";
import React from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootScreens } from "../..";
import { AuthTabParamList } from "@/Navigation/AuthNavigator";

export type OnBoardScreenNavigatorProps = NativeStackScreenProps<
  AuthTabParamList,
  RootScreens.ONBOARD
  >;

const OnBoardContainer = ({navigation}:OnBoardScreenNavigatorProps) => {
  const onNavigate = (screen: 
    RootScreens.ONBOARD |
    RootScreens.LOGIN |
    RootScreens.REGISTER |
    RootScreens.FORGETPASSWORD |
    RootScreens.OTP |
    RootScreens.NEWPASSWORD
  ) => {
    navigation.navigate(screen);
  };
 
  return <Onboard onNavigate={onNavigate} />;
};

export default OnBoardContainer;