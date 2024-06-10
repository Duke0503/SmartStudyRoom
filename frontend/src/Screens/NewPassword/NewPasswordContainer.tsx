import { NewPassword } from "./NewPassword";
import React, { useState, useEffect } from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TabParamList } from "@/Navigation";
import { RootScreens } from "..";

export type NewPasswordScreenNavigatorProps = NativeStackScreenProps<
  TabParamList,
  RootScreens.NEWPASSWORD
  >;

const NewPasswordContainer = ({navigation}: NewPasswordScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
 
  return <NewPassword onNavigate={onNavigate} />;
};

export default NewPasswordContainer;