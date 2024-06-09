import { Device } from "./Device";
import React, { useState, useEffect } from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TabParamList } from "@/Navigation";
import { RootScreens } from "..";

export type DeviceScreenNavigatorProps = NativeStackScreenProps<
  TabParamList,
  RootScreens.DEVICE
  >;

const DeviceContainer = ({navigation}:DeviceScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
 
  return <Device onNavigate={onNavigate} />;
};

export default DeviceContainer;