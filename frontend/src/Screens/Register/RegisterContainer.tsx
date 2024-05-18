import { Register } from "./Register";
import React, { useState, useEffect } from "react";
// import { useLazyGetUserQuery } from "@/Services";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

export type RegisterScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.REGISTER
  >;

const RegisterContainer = ({navigation}:RegisterScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
 
  return <Register onNavigate={onNavigate} />;
};

export default RegisterContainer;