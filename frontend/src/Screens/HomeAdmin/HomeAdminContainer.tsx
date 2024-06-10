import { HomeAdmin } from "./HomeAdmin";
import React from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootScreens } from "..";
import { AdminTabParamList } from "@/Navigation/AdminNavigator";

export type HomeAdminScreenNavigatorProps = NativeStackScreenProps<
  AdminTabParamList,
  RootScreens.HOMEADMIN
  >;

const HomeAdminContainer = ({navigation}:HomeAdminScreenNavigatorProps) => {
  const onNavigate = (screen: 
    RootScreens.HOMEADMIN | 
    RootScreens.ACCOUNT |
    RootScreens.PROFILE |
    RootScreens.SETTING |
    RootScreens.UPDATE |
    RootScreens.ABOUTUS |
    RootScreens.USERDETAIL
  ) => {
    navigation.navigate(screen);
  };
 
  return <HomeAdmin onNavigate={onNavigate} />;
};

export default HomeAdminContainer;