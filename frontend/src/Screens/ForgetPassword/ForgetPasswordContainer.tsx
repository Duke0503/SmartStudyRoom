import { ForgetPassword } from "./ForgetPassword";
import React, { useState, useEffect } from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthTabParamList } from "@/Navigation/AuthNavigator";
import { RootScreens } from "..";

export type ForgetPasswordScreenNavigatorProps = NativeStackScreenProps<
  AuthTabParamList,
  RootScreens.FORGETPASSWORD
  >;

const ForgetPasswordContainer = ({navigation}: ForgetPasswordScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
 
  return <ForgetPassword onNavigate={onNavigate} />;
};

export default ForgetPasswordContainer;