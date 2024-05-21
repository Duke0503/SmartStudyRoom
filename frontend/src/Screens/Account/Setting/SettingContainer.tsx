import { Setting } from "./Setting";
import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "@/Screens";

export type SettingScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.SETTING
  >;

const SettingContainer = ({navigation}:SettingScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
  
  return <Setting onNavigate={onNavigate} />;
};

export default SettingContainer;