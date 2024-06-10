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
import LRegular from "@/Components/texts/LRegular";
import { TouchableOpacity } from 'react-native';
import { useAddSensorMutation } from "@/Services/users";
export interface IDeviceProps {
  onNavigate: (string: RootScreens) => void;
}

export const Device = (props: IDeviceProps) => {
  const [connectedDevices, setConnectedDevices] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(false);
  const [showSensor, setShowSensor] = useState(false)
  const profile = useSelector((state: any) => state.profile);
  const sensors = useSelector((state: any) => state.sensors.sensor);
  const [fetchOne, { data, isSuccess, isLoading, error }] = useLazyGetSensorQuery();
  const [addSensorIntoUser] = useAddSensorMutation() 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ip = await Network.getIpAddressAsync();
        console.log(ip)
        await fetchOne({ip: ip});
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
  }, [connectedDevices]);

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
  
  const handleDisconnect = async () => {
    dispatch(deleteSensor({}));
    dispatch(deleteCurrentDevice({}));
    await addSensorIntoUser({user_id: profile.id, sensor_id: 0})
    setShowSensor(false);
    setConnectedDevices(false);
    setSelectedSensor(false);
  }

  const handleSelectSensor = async (sensor: any) => {
    dispatch(addSensor(sensor));
    await addSensorIntoUser({user_id: profile.id, sensor_id: sensor.id_sensor})
    setSelectedSensor(true)
    setShowSensor(false)
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
          {/* <VStack h="70%">
                <HStack h="50%" justifyContent="space-between">
                  <Box w="40%" h="70%" style={styles.sensorDataBox} onPress={handleNagivateToLightDevice}>
                    <Entypo name="light-bulb" size={50} color={"#FFDA19"} />
                    <LRegular>Độ sáng: {sensors.light_data ? sensors.light_data : "Không có kết nối"}</LRegular>
                  </Box>
                  <Box w="40%" h="70%" style={styles.sensorDataBox} onPress={handleNagivateToTempDevice}>
                    <FontAwesome5 name="temperature-low" size={50} color={"red"} />
                    <LRegular>Nhiệt độ: {sensors.temp_data ? sensors.temp_data : "Không có kết nối"}</LRegular>
                  </Box>
                </HStack>
                <HStack h="50%" justifyContent="space-between">
                  <Box w="40%" h="70%" style={styles.sensorDataBox} onPress={handleNagivateToNoiseDevice}>
                    <Ionicons name="volume-medium-outline" size={50} color={"#20ABFA"} />
                    <LRegular>Âm thanh: {sensors.sound_data ? sensors.sound_data : "Không có kết nối"}</LRegular>
                  </Box>
                  <Box w="40%" h="70%" style={styles.sensorDataBox} onPress={handleNagivateToCamera}>
                    <Ionicons name="videocam-outline" size={50} color={"#20ABFA"} />
                    <LRegular>Camera</LRegular>
                  </Box>
                </HStack>
              </VStack> */}
            <ScrollView style={{}}>

              <View style={styles.schedule}>
                <View style={styles.sessionList}>
                  <Pressable style={styles.session} onPress={handleNagivateToLightDevice}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%" }}>
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Entypo name="light-bulb" size={40} color={"#FFDA19"} />
                        <SRegular>Độ sáng: {sensors.light_data ? sensors.light_data : "Không có kết nối"}</SRegular>
                  
                      </View>
                      <View style={{ flexDirection: "column", justifyContent: "center" }}>
                        <Ionicons name="chevron-forward" size={24} color={colors.neutral_900} />
                      </View>
                    </View>
                  </Pressable>
                  <Pressable style={styles.session} onPress={handleNagivateToTempDevice}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%" }}>
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <FontAwesome5 name="temperature-low" size={0} color={"red"} />
                        <SRegular textStyles={{ color: colors.neutral_900 }}>Nhiệt độ: {sensors.temp_data ? sensors.temp_data : "Không có kết nối"}</SRegular>
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
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Ionicons name="volume-medium-outline" size={40} color={"#20ABFA"} />
                        
                        <SRegular textStyles={{ color: colors.neutral_900 }}>Âm thanh: {sensors.sound_data ? sensors.sound_data : "Không có kết nối"}</SRegular>
                      </View>
                      <View style={{ flexDirection: "column", justifyContent: "center" }}>
                        <Ionicons name="chevron-forward" size={24} color={colors.neutral_900} />
                      </View>
                    </View>
                  </Pressable>
                  <Pressable style={styles.session} onPress={handleNagivateToCamera}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%" }}>
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Ionicons name="videocam-outline" size={40} color={"#20ABFA"} />
                        <VSSemiBold textStyles={{ color: colors.neutral_900 }}> Camera</VSSemiBold>
                       
                      </View>
                      <View style={{ flexDirection: "column", justifyContent: "center" }}>
                        <Ionicons name="chevron-forward" size={24} color={colors.neutral_900} />
                      </View>
                    </View>
                  </Pressable>
                </View>
              </View>
            </ScrollView>
            {/* <SectionList
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
            />  */}
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
  },
  sensorDataBox: {
    justifyContent: "space-evenly",
    borderWidth: 1,
    borderColor: colors.neutral_300,
    borderRadius: 15,
    padding: "5%"
  },

});