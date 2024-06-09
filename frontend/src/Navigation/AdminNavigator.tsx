import React from "react";
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, Ionicons} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootScreens } from "@/Screens";
import { colors } from "@/Components/colors";
import AccountContainer from "@/Screens/Account/AccountContainer";
import ProfileContainer from "@/Screens/Account/Profile/ProfileContainer";
import PasswordContainer from "@/Screens/Account/Password/PasswordContainer";
import SettingContainer from "@/Screens/Account/Setting/SettingContainer";
import AboutUsContainer from "@/Screens/Account/AbousUs/AboutUsContainer";
import HomeAdminContainer from "@/Screens/HomeAdmin/HomeAdminContainer";
import UserDetailContainer from "@/Screens/UserDetail/UserDetailContainer";
import SessionContainer from "@/Screens/Session/SessionContainer";


export type AdminTabParamList = {
  [RootScreens.ACCOUNT]: undefined;
  [RootScreens.PROFILE]: undefined;
  [RootScreens.UPDATE]: undefined;
  [RootScreens.ABOUTUS]: undefined;
  [RootScreens.SETTING]: undefined;
  [RootScreens.HOMEADMIN]: undefined;
  [RootScreens.USERDETAIL]: undefined;
  [RootScreens.SESSION]: undefined;
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
      <AdminTab.Screen
          name={RootScreens.USERDETAIL}
          component={UserDetailContainer}
          options={{
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          }}
      />
      <AdminTab.Screen
          name={RootScreens.SESSION}
          component={SessionContainer}
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