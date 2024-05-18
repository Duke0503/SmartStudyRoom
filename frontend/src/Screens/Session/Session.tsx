import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, Ionicons} from "@expo/vector-icons";
// import { MainNavigator } from "@/Navigation/Main";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
// import { HomeScreenNavigatorProps } from "./HomeContainer";
import { RootScreens } from "..";
import Title3 from "@/Components/texts/Title3";
import VSRegular from "@/Components/texts/VSRegular";
import { colors } from "@/Components/colors";
import VSSemiBold from "@/Components/texts/VSSemiBold";
import LSemiBold from "@/Components/texts/LSemiBold";
import SRegular from "@/Components/texts/SRegular";

export interface ISessionProps {
  onNavigate: (string: RootScreens) => void;
}

export const Session = (props: ISessionProps) => {
  const { onNavigate } = props;

  return (
    <SafeAreaView>
      <StatusBar style="auto"></StatusBar>
      <View style={styles.container}>
        <View style={styles.title}>
            <Pressable style={{paddingRight: 15}} onPress={() => onNavigate(RootScreens.SCHEDULE)}>
                <Ionicons name="arrow-back-outline" size={24} color={colors.neutral_900}></Ionicons>
            </Pressable>
          <Title3 textStyles={{color: colors.neutral_900}}>Phiên học 1</Title3>
        </View>
        <View style={styles.body}>
          
        </View>
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
    flexDirection: "row",
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