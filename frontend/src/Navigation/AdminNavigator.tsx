import React from "react";
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, Ionicons} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { RootScreens } from "@/Screens";
import { colors } from "@/Components/colors";
import RegisterContainer from "@/Screens/Register/RegisterContainer";
import LoginContainer from "@/Screens/Login/LoginContainer";
import AccountContainer from "@/Screens/Account/AccountContainer";
import ProfileContainer from "@/Screens/Account/Profile/ProfileContainer";
import PasswordContainer from "@/Screens/Account/Password/PasswordContainer";
import SettingContainer from "@/Screens/Account/Setting/SettingContainer";
import AboutUsContainer from "@/Screens/Account/AbousUs/AboutUsContainer";
import HomeAdminContainer from "@/Screens/HomeAdmin/HomeAdminContainer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type AdminTabParamList = {
  [RootScreens.ACCOUNT]: undefined;
  [RootScreens.PROFILE]: undefined;
  [RootScreens.UPDATE]: undefined;
  [RootScreens.ABOUTUS]: undefined;
  [RootScreens.SETTING]: undefined;
  [RootScreens.HOMEADMIN]: undefined;
}

const AdminTab = createBottomTabNavigator<AdminTabParamList>();

// const Stack = createNativeStackNavigator<AdminTabParamList>();

const AdminNavigator = () =>{
  return (
    <AdminTab.Navigator screenOptions={{ 
      headerShown: false,
      tabBarActiveTintColor: colors.secondary_700,
      tabBarInactiveTintColor: colors.neutral_300,
      }}>
      <AdminTab.Screen
        name={RootScreens.HOMEADMIN}
        component={HomeAdminContainer}
        options={{
          tabBarIcon: ({color}) => (<Entypo name="home" size={24} color={color} />),
          tabBarLabel: "Trang chủ"
        }}
      />
      <AdminTab.Screen
          name={RootScreens.ACCOUNT}
          component={AccountContainer}
          options={{
            tabBarIcon: ({color}) => (<FontAwesome5 name="user" size={24} color={color} />),
            tabBarLabel: "Tài khoản"
          }}
      />
      <AdminTab.Screen
          name={RootScreens.PROFILE}
          component={ProfileContainer}
          options={{
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          }}
      />
      <AdminTab.Screen
          name={RootScreens.UPDATE}
          component={PasswordContainer}
          options={{
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          }}
      />
      <AdminTab.Screen
          name={RootScreens.SETTING}
          component={SettingContainer}
          options={{
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          }}
      />
      <AdminTab.Screen
          name={RootScreens.ABOUTUS}
          component={AboutUsContainer}
          options={{
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          }}
      />
    </AdminTab.Navigator>
  );
  // return (
  //   <Stack.Navigator>
  //     <Stack.Screen
  //       name={RootScreens.HOMEADMIN}
  //       component={HomeAdminContainer}
        
  //     />
  //   </Stack.Navigator>
  // );
};

export { AdminNavigator };