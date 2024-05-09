import { Schedule } from "./Schedule";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

export type ScheduleScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.SCHEDULE
  >;

const ScheduleContainer = ({navigation}:ScheduleScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
  
  return <Schedule onNavigate={onNavigate} />;
};

export default ScheduleContainer;