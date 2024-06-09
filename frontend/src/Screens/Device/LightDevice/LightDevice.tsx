import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ImageProps } from "react-native";
import { RootScreens } from "@/Screens";
import { colors } from "@/Components/colors";
import { Button, Layout, IconElement, Divider, CircularProgressBar } from '@ui-kitten/components';
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useGetDeviceQuery } from "@/Services/devices";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateLightSensorMutation } from "@/Services/sensors";
import { light } from "@eva-design/eva";
import * as Network from "expo-network";
import { useLazyGetSensorQuery, useGetSensorQuery } from "@/Services/sensors";
import { updateLightSensorRedux} from "@/Store/reducers/sensors";
import { useUpdateDeviceMutation, useUpdateLightDeviceMutation} from "@/Services/devices";
import { updateDeviceRedux, updateLightDeviceRedux } from "@/Store/reducers/devices";
export interface LightDeviceProps {
    onNavigate: (screen: RootScreens) => void;
}



export const LightDevice = (props: LightDeviceProps) => {
    const [ipAddress, setIpAddress] = useState('undefined');
    const [lightSensor, setLightsensor] = useState({})
    const [lightdata, setLightdata] = useState(0)
    const [LightDevice, setLightDevice] = useState({})
    const profile = useSelector((state: any) => state.profile);
    const sensorsData = useSelector((state: any) => state.sensors.sensor);
    const deviceData = useSelector((state: any) => state.devices.devicessList);
    const [updateLightSensor] = useUpdateLightSensorMutation()
    const [updateLightDevice] = useUpdateLightDeviceMutation()
    const dispatch = useDispatch();
    useEffect(() => {
        if (deviceData) {
            const deviceLight = deviceData.find(device => device.type == "Light")
            if (deviceLight) {
                setLightDevice(deviceLight)
            }
            if (sensorsData && sensorsData.is_active) {
                setLightsensor(sensorsData)
                setLightdata(parseFloat(sensorsData.light_data))
            } 
        }
        
      }, [sensorsData]);
    const { onNavigate } = props;
    const [value, setValue] = useState(0);
    const handleUpdateDevice = async (action) => {
        const light_data = action == "Increase" ? lightdata + 1 : lightdata - 1
        try {
            await updateLightDevice({device_id: LightDevice.ID, light_data: light_data})
            dispatch(updateLightDeviceRedux({ID: LightDevice.ID, light_data: light_data}))
            setLightdata(light_data)
        } catch (error) {
            console.log(error)
        }
    }
    // const handleDisconnect = async () => {
    //     try {
    //         await updateLightDevice({device_id: LightDevice.ID, status: "Disable"})
    //         dispatch(updateDeviceRedux({ID: LightDevice.ID, status: "Disable"}))
    //         setLightDevice({... LightDevice, status: "Disable" })
    //     } catch(error) {
    //         console.log(error)
    //     }
    // }
    const Header = () => {
        return (
            <View style={styles.header}>
                <Ionicons name="arrow-back" size={24} color="black" onPress={() => onNavigate(RootScreens.DEVICE)} />
                <Text style={styles.headerText}> Độ sáng </Text>
            </View>
        )
    }

    const Boxes = () => {
        return (
            <View
                style={styles.boxContainer}>
                <View style={styles.box1}>
                    <View style={styles.inner}>
                        <Text style={styles.optionText}>Tên cảm biến: Cảm biến ánh sáng</Text>
                        <Text style={styles.optionText}>Trạng thái: <Text style={{ color: 'green' }}> {lightSensor && lightSensor.is_active ? "Đang bật" : "Đang tắt"}</Text></Text>
                    </View>
                </View>
                <View style={styles.box2}>
                    <CircularProgressBar
                        style={styles.customizeCircle}
                        progress={lightdata && lightSensor && lightSensor.is_active ? lightdata/100 : 0}
                    />
                </View>
                <View style={styles.box3}>
                    <Text style={styles.optionText1} >Điều kiện ánh sáng của bạn đang ổn định !</Text>
                </View>
                <View style={styles.box4}>
                    <Button appearance='outline'
                        onPress={() => handleUpdateDevice("Decrease")}
                        status='primary'
                        style={styles.button}>
                        - Giảm sáng
                    </Button>
                    <Button appearance='outline'
                        onPress={() => handleUpdateDevice("Increase")}
                        status='primary'
                        style={styles.button}>
                        + Tăng sáng
                    </Button>
                </View>
                <View style={styles.box5}>
                    <Button appearance='outline'
                        // onPress={() => handleDisconnect()}
                        status='danger'
                        style={styles.button}>
                        Ngắt kết nối
                    </Button>

                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header />
            <Boxes />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        width: "100%",
        flexDirection: "column",
        flexWrap: "wrap",
        padding: 20,
    },
    box1: {
        width: "90%",
        height: "20%",
        backgroundColor: colors.secondary_500,
        borderColor: 'black',
        borderRadius: 10,
        padding: 5,
    },
    box2: {
        width: "90%",
        height: "40%",
        backgroundColor: "white",
        justifyContent: "center",
        borderRadius: 10,
        padding: 5,
        marginTop: 10,
        alignItems: "center",
    },
    box3: {
        width: "90%",
        height: "5%",
        backgroundColor: "white",
        justifyContent: "center",
        borderRadius: 10,
        padding: 5,
        marginTop: 10,
        alignItems: "center",
    },
    box4: {
        width: "90%",
        height: "10%",
        backgroundColor: "white",
        justifyContent: "space-between",
        borderRadius: 10,
        padding: 5,
        paddingHorizontal: 20,
        marginTop: 15,
        alignItems: "center",
        flexDirection: "row",
    },
    box5: {
        width: "90%",
        height: "10%",
        backgroundColor: "white",
        justifyContent: "center",
        borderRadius: 10,
        padding: 5,
        paddingHorizontal: 20,
        marginTop: 15,
        alignItems: "center",
        flexDirection: "row",
    },
    inner: {
        flex: 1,
        // alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "space-evenly",
        paddingLeft: 16
    },
    customizeCircle: {
        width: 200,
        height: 200,
        fontSize: 24,
        fontWeight: "bold",
    },
    button: {
        width: "45%",
    },
    boxContainer: {
        width: "100%",
        height: "80%",
        padding: 5,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    circlecontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    header: {
        width: "100%",
        height: "15%",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "flex-start",
        marginLeft: 15,

    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 20,
    },

    bodyHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    optionText: {
        fontSize: 16,
        color: colors.neutral_900,
    },
    optionText1: {
        fontSize: 16,
        color: colors.neutral_900,
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
    },
});
