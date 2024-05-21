import { AboutUs } from "./AboutUs";
import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "@/Screens";

export type AboutUsScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.ABOUTUS
  >;

const AboutUsContainer = ({navigation}:AboutUsScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
  
  return <AboutUs onNavigate={onNavigate} />;
};

export default AboutUsContainer;