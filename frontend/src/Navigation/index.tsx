import React from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { RootScreens } from "@/Screens";

import HomeContainer from "@/Screens/Home/HomeContainer";
import ScheduleContainer from "@/Screens/Schedule/ScheduleContainer";
import SessionContainer from "@/Screens/Session/SessionContainer";
import DeviceContainer from "@/Screens/Device/DeviceContainer";
import RegisterContainer from "@/Screens/Register/RegisterContainer";

export type RootStackParamList = {
  [RootScreens.HOME]: undefined;
  [RootScreens.SCHEDULE]: undefined;
  [RootScreens.SESSION]: undefined;
  [RootScreens.DEVICE]: undefined;
  [RootScreens.REGISTER]: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const ApplicationNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={RootScreens.REGISTER} screenOptions={{ headerShown: false }}>
        <RootStack.Screen
          name={RootScreens.REGISTER}
          component={RegisterContainer}
        />
        <RootStack.Screen
          name={RootScreens.HOME}
          component={HomeContainer}
        />
        <RootStack.Screen
          name={RootScreens.SCHEDULE}
          component={ScheduleContainer}
        />
        <RootStack.Screen
          name={RootScreens.SESSION}
          component={SessionContainer}
        />
        <RootStack.Screen
          name={RootScreens.DEVICE}
          component={DeviceContainer}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export { ApplicationNavigator };