import React, { useEffect, useState } from "react";
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootScreens } from "@/Screens";
import { colors } from "@/Components/colors";
import RegisterContainer from "@/Screens/Register/RegisterContainer";
import LoginContainer from "@/Screens/Login/LoginContainer";
import ForgetPasswordContainer from "@/Screens/ForgetPassword/ForgetPasswordContainer";
import OTPContainer from "@/Screens/OTP/OTPContainer";
import NewPasswordContainer from "@/Screens/NewPassword/NewPasswordContainer";
import OnBoardContainer from "@/Screens/Onboard/Onboarding/OnboardingContainer";
import WelcomeContainer from "@/Screens/Onboard/WelcomeContainer";
import { getItem } from "@/util/asyncStorage";

export type AuthTabParamList = {
  [RootScreens.WELCOME]: undefined;
  [RootScreens.ONBOARD]: undefined;
  [RootScreens.REGISTER]: undefined;
  [RootScreens.LOGIN]: undefined;
  [RootScreens.FORGETPASSWORD]: undefined;
  [RootScreens.OTP]: undefined;
  [RootScreens.NEWPASSWORD]: undefined;
}

const AuthTab = createBottomTabNavigator<AuthTabParamList>();

const AuthNavigator = () => {
  const [showOnBoarding, setShowOnBoarding] = useState<boolean | null>(null);

  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, [])

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem('onBoarded');
    if (onboarded === '1') {
      setShowOnBoarding(false);
    }
    else {
      setShowOnBoarding(true);
    }
  }
  if (showOnBoarding === null) {
    return null;
  }

  if (showOnBoarding) {
    return (
      <AuthTab.Navigator
        initialRouteName={RootScreens.WELCOME}
        screenOptions={{
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
        <AuthTab.Screen
          name={RootScreens.FORGETPASSWORD}
          component={ForgetPasswordContainer}
          options={{
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          }}
        />
        <AuthTab.Screen
          name={RootScreens.OTP}
          component={OTPContainer}
          options={{
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          }}
        />
        <AuthTab.Screen
          name={RootScreens.NEWPASSWORD}
          component={NewPasswordContainer}
          options={{
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          }}
        />
        <AuthTab.Screen
          name={RootScreens.ONBOARD}
          component={OnBoardContainer}
          options={{
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          }}
        />
        <AuthTab.Screen
          name={RootScreens.WELCOME}
          component={WelcomeContainer}
          options={{
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          }}
        />
      </AuthTab.Navigator>
    );
  }
  else {
    return (
      <AuthTab.Navigator
        initialRouteName={RootScreens.LOGIN}
        screenOptions={{
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
        <AuthTab.Screen
          name={RootScreens.FORGETPASSWORD}
          component={ForgetPasswordContainer}
          options={{
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          }}
        />
        <AuthTab.Screen
          name={RootScreens.OTP}
          component={OTPContainer}
          options={{
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          }}
        />
        <AuthTab.Screen
          name={RootScreens.NEWPASSWORD}
          component={NewPasswordContainer}
          options={{
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          }}
        />
        <AuthTab.Screen
          name={RootScreens.ONBOARD}
          component={OnBoardContainer}
          options={{
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          }}
        />
        <AuthTab.Screen
          name={RootScreens.WELCOME}
          component={WelcomeContainer}
          options={{
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          }}
        />
      </AuthTab.Navigator>
    );
  }


};

export default AuthNavigator;