import { Home } from "./Home";
import React, { useState, useEffect } from "react";
// import { useLazyGetUserQuery } from "@/Services";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootScreens } from "..";
import { TabParamList } from "@/Navigation/UserNavigator";

export type HomeScreenNavigatorProps = NativeStackScreenProps<
  TabParamList,
  RootScreens.HOME
  >;

const HomeContainer = ({navigation}:HomeScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
 
  return <Home onNavigate={onNavigate} />;
};

export default HomeContainer;