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

export type AuthTabParamList = {
  [RootScreens.REGISTER]: undefined;
  [RootScreens.LOGIN]: undefined;
}

const AuthTab = createBottomTabNavigator<AuthTabParamList>();

const AuthNavigator = () => {
  return (
    <AuthTab.Navigator screenOptions={{ 
      headerShown: false,
      tabBarActiveTintColor: colors.secondary_700,
      tabBarInactiveTintColor: colors.neutral_300,
      }}>
      <AuthTab.Screen
        name={RootScreens.LOGIN}
        component={LoginContainer}
        options={{
          tabBarStyle: {
            display: "none",
          },
          tabBarButton: () => null,
        }}
      />
      <AuthTab.Screen
        name={RootScreens.REGISTER}
        component={RegisterContainer}
        options={{
          tabBarStyle: {
            display: "none",
          },
          tabBarButton: () => null,
        }}
      />
    </AuthTab.Navigator>
  );
};

export { AuthNavigator };