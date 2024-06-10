import { NoiseDevice } from "./NoiseDevice";
import React, { useState, useEffect } from "react";
// import { useLazyGetUserQuery } from "@/Services";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "../..";
import { TabParamList } from "@/Navigation/UserNavigator";

export type DeviceScreenNavigatorProps = NativeStackScreenProps<
    TabParamList,
    RootScreens.NOISEDEVICE
>;

const NoiseDeviceContainer = ({ navigation }: DeviceScreenNavigatorProps) => {
    const onNavigate = (screen: RootScreens) => {
        navigation.navigate(screen);
    };

    return <NoiseDevice onNavigate={onNavigate} />;
};

export default NoiseDeviceContainer;