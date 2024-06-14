import { UserDetail } from "./UserDetail";
import React from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootScreens } from "..";
import { AdminTabParamList } from "@/Navigation/AdminNavigator";


export type UserDetailScreenNavigatorProps = NativeStackScreenProps<
  AdminTabParamList,
  RootScreens.USERDETAIL
  >;

const UserDetailContainer = ({navigation}:UserDetailScreenNavigatorProps) => {
  const onNavigate = (screen: 
    RootScreens.HOMEADMIN | 
    RootScreens.ACCOUNT |
    RootScreens.PROFILE |
    RootScreens.SETTING |
    RootScreens.UPDATE |
    RootScreens.ABOUTUS |
    RootScreens.USERDETAIL |
    RootScreens.SESSION |
    RootScreens.NOTIFICATION
  ) => {
    navigation.navigate(screen);
  };
 
  return <UserDetail onNavigate={onNavigate} />;
};

export default UserDetailContainer;