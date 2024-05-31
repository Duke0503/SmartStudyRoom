import { Notification } from "./Notification";
import React, { useState, useEffect } from "react";
// import { useLazyGetUserQuery } from "@/Services";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

export type NotificationScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.NOTIFICATION
  >;

const NotificationContainer = ({navigation}:NotificationScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
 
  return <Notification onNavigate={onNavigate} />;
};

export default NotificationContainer;