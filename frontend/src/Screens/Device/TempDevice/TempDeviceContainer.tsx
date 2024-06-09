import { TempDevice } from "./TempDevice";
import React, { useState, useEffect } from "react";
// import { useLazyGetUserQuery } from "@/Services";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "../..";
import { TabParamList } from "@/Navigation/UserNavigator";

export type DeviceScreenNavigatorProps = NativeStackScreenProps<
    TabParamList,
    RootScreens.TEMPDEVICE
>;

const TempDeviceContainer = ({ navigation }: DeviceScreenNavigatorProps) => {
    const onNavigate = (screen: RootScreens) => {
        navigation.navigate(screen);
    };

    return <TempDevice onNavigate={onNavigate} />;
};

export default TempDeviceContainer;