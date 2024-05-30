import React, { useEffect } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from "react-native";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { RootScreens } from "..";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "@/Store/reducers";
import { useLazyGetProfileQuery } from "@/Services/users";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "@/Components/colors";

export interface IAccountProps {
  onNavigate: (screen: RootScreens) => void;
}

export const Account = (props: IAccountProps) => {
  const { onNavigate } = props;
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();
  const [fetchOne, { data, isSuccess, isLoading, error }] = useLazyGetProfileQuery();

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    await fetchOne();
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    dispatch(deleteUser(profile));
    onNavigate(RootScreens.LOGIN);
  };

  const handleNavigateToProfile = () => {
    onNavigate(RootScreens.PROFILE);
  };

  const handleNavigateToUpdate = () => {
    onNavigate(RootScreens.UPDATE);
  };

  const handleNavigateToSetting = () => {
    onNavigate(RootScreens.SETTING);
  };

  const handleNavigateToAboutUs = () => {
    onNavigate(RootScreens.ABOUTUS);
  };

  const handleNavigateToNotification = () => {
    onNavigate(RootScreens.NOTIFICATION);
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.logo} />
          <Text style={styles.appName}>I - Learn</Text>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.profileInfo}>
            <Image source={{ uri: 'https://res.cloudinary.com/dostnfbfw/image/upload/v1700357746/samples/cloudinary-icon.png' }} style={styles.avatar} />
            <View style={styles.profileText}>
              <Text style={styles.greeting}>Xin chào</Text>
              <Text style={styles.profileName}>{profile.name}</Text>
            </View>
          </View>
          <Entypo onPress={handleLogout} name="log-out" size={24} color={colors.neutral_500} />
        </View>
        <ScrollView style={styles.content}>
          <Pressable style={styles.contentItem } onPress={handleNavigateToProfile} >
            <FontAwesome5 name="user" size={24} color={colors.secondary_500} />
            <Text style={styles.contentItemText}>Thông tin cá nhân</Text>
            <Entypo name="chevron-right" size={24} color={colors.neutral_500} />
          </Pressable>
          <Pressable style={styles.contentItem} onPress={handleNavigateToUpdate}>
            <Entypo name="lock" size={24} color={colors.secondary_500} />
            <Text style={styles.contentItemText}>Tài khoản</Text>
            <Entypo name="chevron-right" size={24} color={colors.neutral_500} />
          </Pressable>
          <Pressable style={styles.contentItem} onPress={handleNavigateToSetting}>
            <Ionicons name="settings" size={24} color={colors.secondary_500} />
            <Text style={styles.contentItemText}>Cài đặt</Text>
            <Entypo name="chevron-right" size={24} color={colors.neutral_500} />
          </Pressable>
          <Pressable style={styles.contentItem} onPress={handleNavigateToAboutUs}>
            <Entypo name="help" size={24} color={colors.secondary_500} />
            <Text style={styles.contentItemText}>Về chúng tôi</Text>
            <Entypo name="chevron-right" size={24} color={colors.neutral_500} />
          </Pressable>
          <Pressable style={styles.contentItem} onPress={handleNavigateToNotification}>
            <Entypo name="help" size={24} color={colors.secondary_500} />
            <Text style={styles.contentItemText}>Thông báo</Text>
            <Entypo name="chevron-right" size={24} color={colors.neutral_500} />
          </Pressable>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#fff',
    
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#1e90ff',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
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
    color: '#333',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  contentItemText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },
});