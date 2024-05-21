import { Password } from "./Password";
import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "@/Screens";

export type PasswordScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.UPDATE
  >;

const PasswordContainer = ({navigation}:PasswordScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
  
  return <Password onNavigate={onNavigate} />;
};

export default PasswordContainer;