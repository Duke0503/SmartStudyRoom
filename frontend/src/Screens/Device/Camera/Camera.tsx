import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ImageProps } from "react-native";
import { RootScreens } from "@/Screens";
import { colors } from "@/Components/colors";
import { Button, Layout, IconElement, Divider, CircularProgressBar } from '@ui-kitten/components';
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useGetDeviceQuery } from "@/Services/devices";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateDeviceMutation} from "@/Services/devices";
import { updateDeviceRedux } from "@/Store/reducers/devices";
export interface CameraProps {
    onNavigate: (screen: RootScreens) => void;
}



export const Camera = (props: CameraProps) => {
    const [cameraSensor, setCamerasensor] = useState({})
    const [cameradata, setCameradata] = useState(0)
    const [cameraDevice, setCameraDevice] = useState({})
    const profile = useSelector((state: any) => state.profile);
    const sensorsData = useSelector((state: any) => state.sensors.sensor);
    const deviceData = useSelector((state: any) => state.devices.devicessList);
    const [updateCameraDevice] = useUpdateDeviceMutation()
    const dispatch = useDispatch();
    useEffect(() => {
        if (sensorsData && sensorsData.is_active) {
            setCamerasensor(sensorsData)
            setCameradata(sensorsData.camera_data)
        }
      }, [sensorsData]);
    //   const handleDisconnect = async () => {
    //     try {
    //         await updateCameraDevice({device_id: cameraDevice.ID, status: "Disable"})
    //         dispatch(updateDeviceRedux({ID: cameraDevice.ID, status: "Disable"}))
    //         setCameraDevice({...cameraDevice, status: "Disable"})
    //     } catch(error) {
    //         console.log(error)
    //     }
    // }
    const { onNavigate } = props;
    const [value, setValue] = useState(0);

    const Header = () => {
        return (
            <View style={styles.header}>
                <Ionicons name="arrow-back" size={24} color="black" onPress={() => onNavigate(RootScreens.DEVICE)} />
                <Text style={styles.headerText}> Camera </Text>
            </View>
        )
    }

    const Boxes = () => {
        return (
            <View
                style={styles.boxContainer}>
                <View style={styles.box1}>
                    <View style={styles.inner}>
                        <Text style={styles.optionText}>Tên cảm biến: Cảm biến camera</Text>
                        <Text style={styles.optionText}>Trạng thái: <Text style={{ color: 'green' }}> {cameraSensor && cameraSensor.is_active ? "Đang bật" : "Đang tắt"}</Text></Text>
                    </View>
                </View>
                <View style={styles.box2}>
                    {
                        // CAMERA HERE
                    }
                </View>
                <View style={styles.box3}>
                    <Text style={styles.optionText1} >Tư thế ngồi chuẩn xác !</Text>
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
        height: "50%",
        backgroundColor: "gray",
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
        marginTop: 20,
        alignItems: "center",
    },
    box5: {
        width: "90%",
        height: "10%",
        backgroundColor: "white",
        justifyContent: "center",
        borderRadius: 10,
        padding: 5,
        paddingHorizontal: 20,
        marginTop: 40,
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
