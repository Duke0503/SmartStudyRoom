import { Login } from "./Login";
import React, { useState, useEffect } from "react";
// import { useLazyGetUserQuery } from "@/Services";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootScreens } from "..";
import { AuthTabParamList } from "@/Navigation/AuthNavigator";

export type LoginScreenNavigatorProps = NativeStackScreenProps<
  AuthTabParamList,
  RootScreens.LOGIN
  >;

const LoginContainer = ({navigation}:LoginScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
 
  return <Login onNavigate={onNavigate} />;
};

export default LoginContainer;