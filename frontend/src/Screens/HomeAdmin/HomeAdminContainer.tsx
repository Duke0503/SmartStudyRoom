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
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
 
  return <HomeAdmin onNavigate={onNavigate} />;
};

export default HomeAdminContainer;