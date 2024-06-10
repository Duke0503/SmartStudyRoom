import { Schedule } from "./Schedule";
import React, { useState, useEffect } from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootScreens } from "..";
import { TabParamList } from "@/Navigation/UserNavigator";

export type ScheduleScreenNavigatorProps = NativeStackScreenProps<
  TabParamList,
  RootScreens.SCHEDULE
  >;

const ScheduleContainer = ({navigation}:ScheduleScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
  
  return <Schedule onNavigate={onNavigate} />;
};

export default ScheduleContainer;