import { Register } from "./Register";
import React, { useState, useEffect } from "react";
// import { useLazyGetUserQuery } from "@/Services";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootScreens } from "..";
import { AuthTabParamList } from "@/Navigation/AuthNavigator";

export type RegisterScreenNavigatorProps = NativeStackScreenProps<
  AuthTabParamList,
  RootScreens.REGISTER
  >;

const RegisterContainer = ({navigation}:RegisterScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
 
  return <Register onNavigate={onNavigate} />;
};

export default RegisterContainer;