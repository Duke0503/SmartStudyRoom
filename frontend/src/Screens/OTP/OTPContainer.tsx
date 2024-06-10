import { OTP } from "./OTP";
import React from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TabParamList } from "@/Navigation";
import { RootScreens } from "..";

export type OTPScreenNavigatorProps = NativeStackScreenProps<
  TabParamList,
  RootScreens.OTP
  >;

const OTPContainer = ({navigation}: OTPScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
 
  return <OTP onNavigate={onNavigate} />;
};

export default OTPContainer;