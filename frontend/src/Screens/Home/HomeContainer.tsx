import { Home } from "./Home";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

export type HomeScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.HOME
  >;

const HomeContainer = ({navigation}:HomeScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
 
  return <Home onNavigate={onNavigate} />;
};

export default HomeContainer;