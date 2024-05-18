import { Account } from "./Account";
import React, { useState, useEffect } from "react";
// import { useLazyGetUserQuery } from "@/Services";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import { TabParamList } from "@/Navigation/BottomNav";

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