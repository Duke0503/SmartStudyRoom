import { Account } from "./Account";
import React, { useState, useEffect } from "react";
// import { useLazyGetUserQuery } from "@/Services";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootScreens } from "..";
import { AdminTabParamList } from "@/Navigation/AdminNavigator";
import { TabParamList } from "@/Navigation/UserNavigator";

export type AccountScreenNavigatorProps = NativeStackScreenProps<
  TabParamList,
  RootScreens.ACCOUNT
  >;

const AccountContainer = ({navigation}:AccountScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
 
  return <Account onNavigate={onNavigate} />;
};

export default AccountContainer;