import { i18n, LocalizationKey } from "@/Localization";
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, SectionList, Button, Alert } from "react-native";
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, Ionicons } from "@expo/vector-icons";
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
import { Divider } from "@ui-kitten/components";
export interface IDeviceProps {
  onNavigate: (string: RootScreens) => void;
}

export const Device = (props: IDeviceProps) => {
  const { onNavigate } = props;
  const DATA = [
    {
      title: 'Thiết bị đã kết nối',
      data: ['Pizza', 'Burger', 'Risotto', 'Hotdog',],
    },

  ];

  const handleNagivateToLightDevice = () => {
    onNavigate(RootScreens.LIGHTDEVICE)
  };
  const handleNagivateToCamera = () => {
    onNavigate(RootScreens.CAMERA)
  };
  const handleNagivateToTempDevice = () => {
    onNavigate(RootScreens.TEMPDEVICE)
  };
  const handleNagivateToNoiseDevice = () => {
    onNavigate(RootScreens.NOISEDEVICE)
  };

  const [connectedDevices, setConnectedDevices] = useState(false);

  const handleToggleConnect = () => {
    setConnectedDevices(!connectedDevices);
  }
  const ContentBody = () => {
    return (
      <View>
        <StatusBar style="auto"></StatusBar>
        <View style={styles.container}>
          <View style={styles.title}>
            <Title3 textStyles={{ color: colors.neutral_900 }}>Danh sách thiết bị</Title3>
          </View>
          <View style={styles.body}>

            <ScrollView style={{}}>

              <View style={styles.schedule}>
                <View style={styles.sessionList}>
                  <Pressable style={styles.session} onPress={handleNagivateToLightDevice}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%" }}>
                      <View style={{ flexDirection: "column", justifyContent: "center" }}>
                        <VSSemiBold textStyles={{ color: colors.neutral_900 }}>Độ sáng</VSSemiBold>
                        <SRegular textStyles={{ color: colors.neutral_900 }}>700</SRegular>
                      </View>
                      <View style={{ flexDirection: "column", justifyContent: "center" }}>
                        <Ionicons name="chevron-forward" size={24} color={colors.neutral_900} />
                      </View>
                    </View>
                  </Pressable>
                  <Pressable style={styles.session} onPress={handleNagivateToTempDevice}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%" }}>
                      <View style={{ flexDirection: "column", justifyContent: "center" }}>
                        <VSSemiBold textStyles={{ color: colors.neutral_900 }}>Nhiệt độ</VSSemiBold>
                        <SRegular textStyles={{ color: colors.neutral_900 }}>700</SRegular>
                      </View>
                      <View style={{ flexDirection: "column", justifyContent: "center" }}>
                        <Ionicons name="chevron-forward" size={24} color={colors.neutral_900} />
                      </View>
                    </View>
                  </Pressable>
                </View>
              </View>
              <View style={styles.schedule}>
                <View style={styles.sessionList}>
                  <Pressable style={styles.session} onPress={handleNagivateToNoiseDevice}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%" }}>
                      <View style={{ flexDirection: "column", justifyContent: "center" }}>
                        <VSSemiBold textStyles={{ color: colors.neutral_900 }}>Âm lượng</VSSemiBold>
                        <SRegular textStyles={{ color: colors.neutral_900 }}>700</SRegular>
                      </View>
                      <View style={{ flexDirection: "column", justifyContent: "center" }}>
                        <Ionicons name="chevron-forward" size={24} color={colors.neutral_900} />
                      </View>
                    </View>
                  </Pressable>
                  <Pressable style={styles.session} onPress={handleNagivateToCamera}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%" }}>
                      <View style={{ flexDirection: "column", justifyContent: "center" }}>
                        <VSSemiBold textStyles={{ color: colors.neutral_900 }}>Camera</VSSemiBold>
                        <SRegular textStyles={{ color: colors.neutral_900 }}>Bình thường</SRegular>
                      </View>
                      <View style={{ flexDirection: "column", justifyContent: "center" }}>
                        <Ionicons name="chevron-forward" size={24} color={colors.neutral_900} />
                      </View>
                    </View>
                  </Pressable>
                </View>
              </View>
            </ScrollView>
            <SectionList
              sections={DATA}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => (
                <ScrollView style={styles.item}>
                  <Text style={styles.itemtitle}>{item}</Text>
                </ScrollView>
              )}
              renderSectionHeader={({ section: { title } }) => (
                <View style={styles.header}>
                  <Text style={styles.headeritem}>{title}</Text>
                </View>
              )}
            />
          </View>
          <View >
            <Button
              title="Thêm thiết bị"
              color=""
              onPress={() => Alert.alert('Button with adjusted color pressed')}
            />
            <Divider />
            <Divider />
            <Divider />
            <Divider />
            <Divider />
            <Divider />
            <Divider />
            <Divider />
            <Button
              title="Ngắt kết nối"
              color="red"
              onPress={handleToggleConnect}
            />
          </View>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView>
      {connectedDevices ? <ContentBody /> :
        <View style={styles.openContainer}>
          <Button
            title="Connect"
            color=""
            onPress={handleToggleConnect} />
        </View>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  openContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    marginTop: "50%"
  },
  container: {
    width: "100%",
    height: "95%",
    paddingHorizontal: "5%",
    paddingTop: "3%",
    flexDirection: "column",
    alignContent: "flex-start",
  },
  item: {
    backgroundColor: colors.secondary_500,
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
  },
  header: {
    justifyContent: "center",
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  headeritem: {
    fontSize: 18,
  },
  itemtitle: {
    fontSize: 14,
    color: "white",
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
    width: "45%",
    height: "95%",
    marginVertical: "3%",
    flexDirection: "row",

  },

  session: {
    width: "100%",
    height: 100,
    marginVertical: "2%",
    marginHorizontal: "5%",
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
  },
  footer: {
    height: 100
  }

});