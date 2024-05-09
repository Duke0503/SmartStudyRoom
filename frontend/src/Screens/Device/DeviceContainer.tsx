import { Device } from "./Device";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

export type DeviceScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.DEVICE
  >;

const DeviceContainer = ({navigation}:DeviceScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
 
  return <Device onNavigate={onNavigate} />;
};

export default DeviceContainer;