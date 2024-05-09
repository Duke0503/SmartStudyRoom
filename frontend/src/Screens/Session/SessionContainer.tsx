import { Session } from "./Session";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

export type SessionScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.SESSION
  >;

const SessionContainer = ({navigation}:SessionScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
  
  return <Session onNavigate={onNavigate} />;
};

export default SessionContainer;