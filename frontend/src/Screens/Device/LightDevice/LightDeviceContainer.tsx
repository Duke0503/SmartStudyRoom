import { LightDevice } from "./LightDevice";
import React, { useState, useEffect } from "react";
// import { useLazyGetUserQuery } from "@/Services";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "../..";
import { TabParamList } from "@/Navigation/UserNavigator";

export type DeviceScreenNavigatorProps = NativeStackScreenProps<
    TabParamList,
    RootScreens.LIGHTDEVICE
>;

const LightDeviceContainer = ({ navigation }: DeviceScreenNavigatorProps) => {
    const onNavigate = (screen: RootScreens) => {
        navigation.navigate(screen);
    };

    return <LightDevice onNavigate={onNavigate} />;
};

export default LightDeviceContainer;