import { Profile } from "./Profile";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

export type ProfileScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.PROFILE
  >;

const ProfileContainer = ({navigation}:ProfileScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
  
  return <Profile onNavigate={onNavigate} />;
};

export default ProfileContainer;