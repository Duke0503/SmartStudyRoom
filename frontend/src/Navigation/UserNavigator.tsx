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
import ProfileContainer from "@/Screens/Account/Profile/ProfileContainer";
import PasswordContainer from "@/Screens/Account/Password/PasswordContainer";
import SettingContainer from "@/Screens/Account/Setting/SettingContainer";
import AboutUsContainer from "@/Screens/Account/AbousUs/AboutUsContainer";
import HomeAdminContainer from "@/Screens/HomeAdmin/HomeAdminContainer";

export type TabParamList = {
  [RootScreens.HOME]: undefined;
  [RootScreens.SCHEDULE]: undefined;
  [RootScreens.SESSION]: undefined;
  [RootScreens.DEVICE]: undefined;
  [RootScreens.ACCOUNT]: undefined;
  [RootScreens.PROFILE]: undefined;
  [RootScreens.UPDATE]: undefined;
  [RootScreens.ABOUTUS]: undefined;
  [RootScreens.SETTING]: undefined;
}

const Tab = createBottomTabNavigator<TabParamList>();

const UserNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ 
      headerShown: false,
      tabBarActiveTintColor: colors.secondary_700,
      tabBarInactiveTintColor: colors.neutral_300,
      }}>
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
      <Tab.Screen
          name={RootScreens.PROFILE}
          component={ProfileContainer}
          options={{
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          }}
      />
      <Tab.Screen
          name={RootScreens.UPDATE}
          component={PasswordContainer}
          options={{
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          }}
      />
      <Tab.Screen
          name={RootScreens.SETTING}
          component={SettingContainer}
          options={{
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          }}
      />
      <Tab.Screen
          name={RootScreens.ABOUTUS}
          component={AboutUsContainer}
          options={{
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          }}
      />
    </Tab.Navigator>
  );
};

export { UserNavigator };