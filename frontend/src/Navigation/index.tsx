import React from "react";
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, Ionicons} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { RootScreens } from "@/Screens";
import { colors } from "@/Components/colors";
import HomeContainer from "@/Screens/Home/HomeContainer";
import ScheduleContainer from "@/Screens/Schedule/ScheduleContainer";
import SessionContainer from "@/Screens/Session/SessionContainer";
import DeviceContainer from "@/Screens/Device/DeviceContainer";
import RegisterContainer from "@/Screens/Register/RegisterContainer";
import LoginContainer from "@/Screens/Login/LoginContainer";
import AccountContainer from "@/Screens/Account/AccountContainer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type TabParamList = {
  [RootScreens.REGISTER]: undefined;
  [RootScreens.LOGIN]: undefined;
  [RootScreens.HOME]: undefined;
  [RootScreens.SCHEDULE]: undefined;
  [RootScreens.SESSION]: undefined;
  [RootScreens.DEVICE]: undefined;
  [RootScreens.ACCOUNT]: undefined;
}

export type ScheduleList = {
  [RootScreens.SCHEDULE]: undefined;
  [RootScreens.SESSION]: undefined;
}

export type HomeList = {
  [RootScreens.HOME]: undefined;
  [RootScreens.SESSION]: undefined;
}

const Tab = createBottomTabNavigator<TabParamList>();
const Schedule = createNativeStackNavigator<ScheduleList>();
const Home = createNativeStackNavigator<HomeList>();

const HomeNavigator = () => {
  return (
    <Home.Navigator screenOptions={{ 
      headerShown: false,
      }}>
      <Home.Screen
        name={RootScreens.HOME}
        component={HomeContainer}
      ></Home.Screen>
      <Home.Screen
        name={RootScreens.SESSION}
        component={SessionContainer}
      ></Home.Screen>
    </Home.Navigator>
  )
}

const BottomNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: colors.secondary_700,
        tabBarInactiveTintColor: colors.neutral_300,
        }}>
        <Tab.Screen
          name={RootScreens.REGISTER}
          component={RegisterContainer}
          options={{
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          }}
        />
        <Tab.Screen
          name={RootScreens.LOGIN}
          component={LoginContainer}
          options={{
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          }}
        />
        <Tab.Screen
            name={RootScreens.HOME}
            component={HomeContainer}
            options={{
              tabBarIcon: ({color}) => (<Entypo name="home" size={24} color={color} />),
              tabBarLabel: "Trang chủ"
            }}
        />
        <Tab.Screen
            name={RootScreens.SCHEDULE}
            component={ScheduleContainer}
            options={{
              tabBarIcon: ({color}) => (<Entypo name="calendar" size={24} color={color} />),
              tabBarLabel: "Lịch học"
            }}
        />
        <Tab.Screen
            name={RootScreens.DEVICE}
            component={DeviceContainer}
            options={{
              tabBarIcon: ({color}) => (<Entypo name="light-bulb" size={24} color={color} />),
              tabBarLabel: "Thiết bị"
            }}
        />
        <Tab.Screen
            name={RootScreens.SESSION}
            component={SessionContainer}
            options={{
              tabBarStyle: {
                display: "none",
              },
              tabBarButton: () => null,
            }}
        />
        <Tab.Screen
            name={RootScreens.ACCOUNT}
            component={AccountContainer}
            options={{
              tabBarIcon: ({color}) => (<FontAwesome5 name="user" size={24} color={color} />),
              tabBarLabel: "Tài khoản"
            }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export { BottomNavigator };