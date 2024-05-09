import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, Ionicons} from "@expo/vector-icons";
// import { MainNavigator } from "@/Navigation/Main";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HomeScreenNavigatorProps } from "./HomeContainer";
import { RootScreens } from "..";
import Title3 from "@/Components/texts/Title3";
import VSRegular from "@/Components/texts/VSRegular";
import { colors } from "@/Components/colors";
import VSSemiBold from "@/Components/texts/VSSemiBold";
import LSemiBold from "@/Components/texts/LSemiBold";
import SRegular from "@/Components/texts/SRegular";

export interface IHomeProps {
  onNavigate: (string: RootScreens) => void;
}

export const Home = (props: IHomeProps) => {
  const { onNavigate } = props;

  return (
    <SafeAreaView>
      <StatusBar style="auto"></StatusBar>
      <View style={styles.container}>
        <View style={styles.title}>
          <Title3 textStyles={{color: colors.neutral_900}}>Xin chào, Đức</Title3>
          <VSRegular textStyles={{color: colors.neutral_500}}>Đây là hoạt động ngày hôm nay của bạn</VSRegular>
        </View>
        <View style={styles.body}>
          <View style={styles.schedule}>
            <LSemiBold>Lịch học ngày hôm nay</LSemiBold>
            <ScrollView style={styles.sessionList}>
              <Pressable style={styles.session} onPress={() => onNavigate(RootScreens.SESSION)}>
                <SRegular>Phiên học 1</SRegular>
              </Pressable>
              <Pressable style={styles.session}>
                <SRegular>Phiên học 2</SRegular>
              </Pressable>
              <Pressable style={styles.session}>
                <SRegular>Phiên học 3</SRegular>
              </Pressable>
              <Pressable style={styles.session}>
                <SRegular>Phiên học 4</SRegular>
              </Pressable>
            </ScrollView>
          </View>
          <View style={styles.statistic}>
            <LSemiBold>Thông số môi trường học tập</LSemiBold>
          </View>
        </View>
      </View>
      <View style={styles.navigation}>
        <Pressable style={styles.activeButton}>
          <Entypo name="home" size={24} color={colors.secondary_700} />
          <VSSemiBold textStyles={{color: colors.secondary_700}}>Trang chủ</VSSemiBold>
        </Pressable>
        <Pressable style={styles.inactiveButton} onPress={() => onNavigate(RootScreens.SCHEDULE)}>
          <Entypo name="calendar" size={24} color={colors.neutral_300} />
          <VSSemiBold textStyles={{color: colors.neutral_300}}>Lịch học</VSSemiBold>
        </Pressable>
        <Pressable style={styles.inactiveButton} onPress={() => onNavigate(RootScreens.DEVICE)}>
          <Entypo name="light-bulb" size={24} color={colors.neutral_300} />
          <VSSemiBold textStyles={{color: colors.neutral_300}}>Thiết bị</VSSemiBold>
        </Pressable>
        <Pressable style={styles.inactiveButton}>
          <FontAwesome5 name="user" size={24} color={colors.neutral_300} />
          <VSSemiBold textStyles={{color: colors.neutral_300}}>Tài khoản</VSSemiBold>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "90%",
    paddingHorizontal: "5%",
    paddingTop: "3%",
    flexDirection: "column",
    alignContent: "flex-start",
  },

  title: {
    width: "100%",
    height: "7%",
  },

  body: {
    width: "100%",
    height: "93%",
    paddingTop: "3%"
  },

  schedule: {
    width: "100%",
    height: "50%",
  },

  sessionList: {
    width: "100%",
    height: "95%",
    marginVertical: "3%",
  },

  session: {
    width: "100%",
    height: 100,
    marginVertical: "2%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },

  statistic: {
    width: "100%",
    height: "50%",
  },

  navigation: {
    flexDirection: "row",
    width: "100%",
    height: "10%",
    borderTopWidth: 1,
    borderTopColor: colors.neutral_300,
    justifyContent: "center",
  },

  activeButton: {
    width: "25%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  inactiveButton: {
    width: "25%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
});