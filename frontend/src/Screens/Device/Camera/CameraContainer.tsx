import { Camera } from "./Camera";
import React, { useState, useEffect } from "react";
// import { useLazyGetUserQuery } from "@/Services";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { DeviceScreenNavigatorProps, RootScreens } from "..";
import { TabParamList } from "@/Navigation/BottomNav";

export type DeviceScreenNavigatorProps = NativeStackScreenProps<
    TabParamList,
    RootScreens.DEVICE
>;

const CameraContainer = ({ navigation }: DeviceScreenNavigatorProps) => {
    const onNavigate = (screen: RootScreens) => {
        navigation.navigate(screen);
    };

    return <Camera onNavigate={onNavigate} />;
};

export default CameraContainer;