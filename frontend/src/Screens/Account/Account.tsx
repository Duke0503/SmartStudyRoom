import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Pressable, ScrollView, Image } from "react-native";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { RootScreens } from "..";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "@/Store/reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "@/Components/colors";
import LSemiBold from "@/Components/texts/LSemiBold";
import SRegular from "@/Components/texts/SRegular";
import LRegular from "@/Components/texts/LRegular";
import { AuthContext } from "@/Context/AuthProvider";

export interface IAccountProps {
  onNavigate: (screen: RootScreens) => void;
}

export const Account = (props: IAccountProps) => {
  const { onNavigate } = props;
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

  const {updateAuthState} = useContext(AuthContext);

  const handleLogout = async () => {
    
    await AsyncStorage.removeItem('token');
    dispatch(deleteUser(profile));
    updateAuthState({loggedIn: false, profile: null});
    onNavigate(RootScreens.LOGIN);
  };

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('@/../../assets/images/Logo1.png')} style={styles.logo} />
          <LSemiBold textStyles={{marginLeft: "3%"}}>I - Learn</LSemiBold>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.profileInfo}>
            <Image source={{ uri: 'https://res.cloudinary.com/dostnfbfw/image/upload/v1700357746/samples/cloudinary-icon.png' }} style={styles.avatar} />
            <View style={styles.profileText}>
              <LRegular textStyles={{color: colors.neutral_500}}>Xin chào</LRegular>
              <LSemiBold>{profile.name}</LSemiBold>
            </View>
          </View>
          <Entypo onPress={handleLogout} name="log-out" size={24} color={colors.neutral_500} />
        </View>
        <View style={styles.content}>
          <Pressable style={styles.contentItem } onPress={() => onNavigate(RootScreens.PROFILE)} >
            <FontAwesome5 name="user" size={24} color={colors.secondary_500} />
            <SRegular textStyles={{marginLeft: "3%", flex: 1}}>Thông tin cá nhân</SRegular>
            <Entypo name="chevron-right" size={24} color={colors.neutral_500} />
          </Pressable>
          <Pressable style={styles.contentItem} onPress={() => onNavigate(RootScreens.UPDATE)}>
            <Entypo name="lock" size={24} color={colors.secondary_500} />
            <SRegular textStyles={{marginLeft: "3%", flex: 1}}>Tài khoản</SRegular>
            <Entypo name="chevron-right" size={24} color={colors.neutral_500} />
          </Pressable>
          <Pressable style={styles.contentItem} onPress={() => onNavigate(RootScreens.SETTING)}>
            <Ionicons name="settings" size={24} color={colors.secondary_500} />
            <SRegular textStyles={{marginLeft: "3%", flex: 1}}>Cài đặt</SRegular>
            <Entypo name="chevron-right" size={24} color={colors.neutral_500} />
          </Pressable>
          <Pressable style={styles.contentItem} onPress={() => onNavigate(RootScreens.ABOUTUS)}>
            <Entypo name="help" size={24} color={colors.secondary_500} />
            <SRegular textStyles={{marginLeft: "3%", flex: 1}}>Về chúng tôi</SRegular>
            <Entypo name="chevron-right" size={24} color={colors.neutral_500} />
          </Pressable>
          <Image source={{ uri: 'https://vn4u.vn/wp-content/uploads/2023/09/logo-co-tinh-nhat-quan-2.png' }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "95%",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
  },

  header: {
    width: "90%",
    height: "7%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },

  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  profileContainer: {
    width: "90%",
    height: "10%",
    flexDirection: "row",
    alignItems: 'center',
  },

  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },

  profileText: {
    justifyContent: 'center',
  },

  greeting: {
    fontSize: 15,
    color: colors.neutral_500,
  },

  profileName: {
    fontSize: 17,
    fontWeight: 'bold',
    // color: '#333333',
  },

  content: {
    width: "90%",
    height: "100%",
    paddingTop: 20,
  },

  contentItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: "5%",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  }
});