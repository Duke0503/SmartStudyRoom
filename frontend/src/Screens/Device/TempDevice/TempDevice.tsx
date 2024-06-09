import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ImageProps } from "react-native";
import { RootScreens } from "@/Screens";
import { colors } from "@/Components/colors";
import { Button, Layout, IconElement, Divider, CircularProgressBar } from '@ui-kitten/components';
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useGetDeviceQuery } from "@/Services/devices";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateTempSensorMutation } from "@/Services/sensors";
import * as Network from "expo-network";
import { useGetSensorQuery } from "@/Services/sensors";
import { useUpdateDeviceMutation, useUpdateTempDeviceMutation} from "@/Services/devices";
import { updateDeviceRedux, updateTempDeviceRedux } from "@/Store/reducers/devices";
// import { updateTempSensorRedux } from "@/Store/reducers";
export interface TempDeviceProps {
    onNavigate: (screen: RootScreens) => void;
}



export const TempDevice = (props: TempDeviceProps) => {
    const [ipAddress, setIpAddress] = useState('undefined');
    const [tempSensor, setTempsensor] = useState({})
    const [tempdata, setTempdata] = useState(0)
    const [tempDevice, setTempDevice] = useState({})
    const profile = useSelector((state: any) => state.profile);
    const sensorsData = useSelector((state: any) => state.sensors.sensor);
    const deviceData = useSelector((state: any) => state.devices.devicessList);
    const [updateTempSensor] = useUpdateTempSensorMutation()
    const [updateTempDevice] = useUpdateTempDeviceMutation()
    const dispatch = useDispatch();
    useEffect(() => {
       
        if (deviceData) {
            const deviceTemp = deviceData.find(device => device.type == "Temp")
            if (deviceTemp) {
                setTempDevice(deviceTemp)
            }
            if (sensorsData && sensorsData.is_active) {
                setTempsensor(sensorsData)
                setTempdata(parseFloat(sensorsData.temp_data))
            } 
        }
        
      }, [sensorsData]);
    const { onNavigate } = props;
    const [value, setValue] = useState(0);
    const handleUpdateDevice = async (action) => {
        const temp_data = action == "Increase" ? tempdata + 1 : tempdata - 1
        try {
            await updateTempDevice({device_id: tempDevice.ID, temp_data: temp_data})
            dispatch(updateTempDeviceRedux({ID: tempDevice.ID, temp_data: temp_data}))
            setTempdata(temp_data)
        } catch (error) {
            console.log(error)
        }
    }
    // const handleDisconnect = async () => {
    //     try {
    //         await updateTempDevice({device_id: tempDevice.ID, status: "Disable"})
    //         dispatch(updateDeviceRedux({ID: tempDevice.ID, status: "Disable"}))
    //         setTempDevice({... tempDevice, status: "Disable" })
    //     } catch(error) {
    //         console.log(error)
    //     }
    // }
    const Header = () => {
        return (
            <View style={styles.header}>
                <Ionicons name="arrow-back" size={24} color="black" onPress={() => onNavigate(RootScreens.DEVICE)} />
                <Text style={styles.headerText}> Nhiệt độ </Text>
            </View>
        )
    }

    const Boxes = () => {
        return (
            <View
                style={styles.boxContainer}>
                <View style={styles.box1}>
                    <View style={styles.inner}>
                        <Text style={styles.optionText}>Tên cảm biến: Cảm biến nhiệt độ</Text>
                        <Text style={styles.optionText}>Trạng thái: <Text style={{ color: 'green' }}> {tempSensor && tempSensor.is_active ? "Đang bật" : "Đang tắt"}</Text></Text>
                    </View>
                </View>
                <View style={styles.box2}>
                    <CircularProgressBar
                        style={styles.customizeCircle}
                        progress={tempdata && tempSensor && tempSensor.is_active ? tempdata/100: 0}
                    />
                </View>
                <View style={styles.box3}>
                    <Text style={styles.optionText1} >Điều kiện nhiệt độ của bạn đang ổn định !</Text>
                </View>
                <View style={styles.box4}>
                    <Button appearance='outline'
                        onPress={() => handleUpdateDevice("Decrease")}
                        status='primary'
                        style={styles.button}>
                        - Giảm độ
                    </Button>
                    <Button appearance='outline'
                        onPress={() => handleUpdateDevice("Increase")}
                        status='primary'
                        style={styles.button}>
                        + Tăng độ
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
