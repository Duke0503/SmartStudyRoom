import { i18n, LocalizationKey } from "@/Localization";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, SectionList, Button, Alert, FlatList } from "react-native";
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
import * as Network from "expo-network";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetSensorQuery } from "@/Services/sensors";
import { useGetDeviceQuery } from "@/Services/devices";
import { addSensor, deleteSensor} from "@/Store/reducers/sensors";
import { addDevice, deleteCurrentDevice } from "@/Store/reducers/devices";
import { ButtonText, CloseIcon, Heading, Icon, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Input, InputField, InputIcon, InputSlot, HStack, VStack, Box } from '@gluestack-ui/themed';

export interface IDeviceProps {
  onNavigate: (string: RootScreens) => void;
}

export const Device = (props: IDeviceProps) => {
  const [connectedDevices, setConnectedDevices] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(false);
  const [showSensor, setShowSensor] = useState(false)
  const profile = useSelector((state: any) => state.profile);
  const sensors = useSelector((state: any) => state.sensors);
  const [fetchOne, { data, isSuccess, isLoading, error }] = useLazyGetSensorQuery();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ip = await Network.getIpAddressAsync();
        await fetchOne({ip: ip});
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
  }, []);

  const dispatch = useDispatch();

  const deviceData = useGetDeviceQuery({user_id: profile.id, type: "All"}, { refetchOnMountOrArgChange: true }).currentData;
  const devicename = deviceData && deviceData.map(device => device.name);

  const { onNavigate } = props;

  const DATA = [
    {
      title: 'Thiết bị đã kết nối',
      data: devicename,
    },
  ];

  const listSensor = data ? data.map((item, index) => ({
    id: item.id_sensor,
    title: "Sensor " + item.id_sensor,
    isActive: item.is_active,
    sensor: item
  })) : [];

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

  const handleToggleConnect = (action: any) => {
    deviceData && deviceData.map((item, index) => {
      dispatch(addDevice(item))
    })

    if (action == "Connect") {
      setShowSensor(true)
      setConnectedDevices(true)
      setSelectedSensor(false)
    }
  }

  console.log(sensors);

  const handleDisconnect = () => {
    dispatch(deleteSensor({}));
    dispatch(deleteCurrentDevice({}));

    setShowSensor(false);
    setConnectedDevices(false);
    setSelectedSensor(false);
  }

  const handleSelectSensor = (sensor: any) => {
    dispatch(addSensor(sensor));

    setSelectedSensor(true)
    setShowSensor(false)
  }

  // console.log(sensors);

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
                        {/* <SRegular textStyles={{ color: colors.neutral_900 }}>{lightSensor.light_data ? lightSensor.light_data : "Không có kết nối"}</SRegular> */}
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
                        {/* <SRegular textStyles={{ color: colors.neutral_900 }}>{tempSensor.temp_data ? tempSensor.temp_data : "Không có kết nối"}</SRegular> */}
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
                        <VSSemiBold textStyles={{ color: colors.neutral_900 }}>Âm thanh</VSSemiBold>
                        {/* <SRegular textStyles={{ color: colors.neutral_900 }}>{soundSensor.sound_data ? soundSensor.sound_data : "Không có kết nối"}</SRegular> */}
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
                        {/* <SRegular textStyles={{ color: colors.neutral_900 }}>{cameraSensor.camera_data ? cameraSensor.camera_data : "Không có kết nối"}</SRegular> */}
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
              onPress={() => handleDisconnect()}
            />
          </View>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView>
      {connectedDevices && selectedSensor? <ContentBody /> :
        <View style={styles.openContainer}>
          <Button
            title="Connect"
            color=""
            onPress={() => handleToggleConnect("Connect")} />
          <Modal
              isOpen={showSensor}
              onClose={() => {
                setShowSensor(false)
              }}
            >
              <ModalBackdrop />
              <ModalContent>
                <ModalHeader>
                  <Heading size="lg">Chọn sensor</Heading>
                  <ModalCloseButton>
                    <Icon as={CloseIcon} />
                  </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                  {listSensor && listSensor.map((item, index) => {
                      return item.isActive && (<View key={index} ><Pressable  onPress={() => handleSelectSensor(item.sensor)}><Text>{item.title}</Text></Pressable></View>)
                  })}
                </ModalBody>
                <ModalFooter>
                  <Button
                      title="Cancel"
                      color=""
                      onPress={() => {setShowSensor(false)}} />
                </ModalFooter>
              </ModalContent>
            </Modal>
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
    marginTop: "50%",
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