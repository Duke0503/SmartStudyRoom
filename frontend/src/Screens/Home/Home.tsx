import { i18n, LocalizationKey } from "@/Localization";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, ViewProps } from "react-native";
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, Ionicons} from "@expo/vector-icons";
// import { MainNavigator } from "@/Navigation/Main";
import { StatusBar } from "expo-status-bar";
import { HomeScreenNavigatorProps } from "./HomeContainer";
import { RootScreens } from "..";
import Title3 from "@/Components/texts/Title3";
import VSRegular from "@/Components/texts/VSRegular";
import { colors } from "@/Components/colors";
import VSSemiBold from "@/Components/texts/VSSemiBold";
import LSemiBold from "@/Components/texts/LSemiBold";
import SRegular from "@/Components/texts/SRegular";
import SSemiBold from "@/Components/texts/SSemiBold";
import { Platform, ViewStyle } from 'react-native';
import Constants from 'expo-constants';
import { State } from "react-native-gesture-handler";
import { createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetScheduleQuery } from "@/Services/schedules";
import { updateSchedulesList } from "@/Store/reducers";
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment-timezone';
import 'moment/locale/vi';
moment().tz("Asia/Ho_Chi_Minh").format();
moment().locale('vi');
moment.updateLocale('vi', {
  week : {
      dow : 1
   }
});


export interface IHomeProps {
  onNavigate: (string: RootScreens) => void;
}

export const Home = (props: IHomeProps) => {
  const { onNavigate } = props;

  const user = useSelector((state: any) => state.profile);

  var today = new Date().toJSON().slice(0,10);

  const scheduleList = useSelector((state: any) => state.schedules.scheduelesList);

  let isSchedToday:boolean = false;
  // console.log("schedule list in home screen: ", scheduleList);


  // const dispatch = useDispatch();
  // const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] = useLazyGetSensorByUserIdQuery();
  // const sensorList = useSelector((state: any) => state.sensors.sensorsList);

  // const handleFetch = async () => {
  //   await fetchOne({}); // Provide an empty object as an argument
  // }

  // useEffect(() => {
  //   handleFetch();
  //   if (isSuccess) {
  //     console.log(data);
  //     dispatch(updateSensorsList(data));
  //   }
  // }, [isSuccess]);
  // console.log("sensorList: ",sensorList.name);

  return (
    <SafeAreaView>
      <StatusBar style="auto"></StatusBar>
      <View style={styles.container}>
        <View style={styles.title}>
          <Title3 textStyles={{color: colors.neutral_900}}>Xin chào, {user.name}</Title3>
          <Pressable style={styles.buttonNoti}>
            <Ionicons name="notifications" size={24} color={"#52B6DF"}/>
          </Pressable>
        </View>
        <VSRegular textStyles={{color: colors.neutral_500}}>Đây là hoạt động ngày hôm nay của bạn</VSRegular>

        <View style={styles.body}>
          <View style={styles.schedule}>
            <LSemiBold>Lịch học ngày hôm nay</LSemiBold>
            {/* {scheduleList.length == 0? 
              <SRegular>Không có lịch học nào</SRegular>: 
              <ScrollView  style={styles.sessionList}>
                {scheduleList.map((schedule: any) => {
                  // console.log(schedule.date, today)
                  if(schedule.date === today) isSchedToday = true;
                  return ( schedule.date != today ? 
                    null :
                    <Pressable style={styles.session} onPress={() => onNavigate(RootScreens.SESSION)}>
                      <View style={styles.topSession}>
                        <SSemiBold key={schedule.id}>
                          {schedule.title}
                        </SSemiBold>
                      </View>

                      <Seperator/>
                      <View style={styles.bottomSession}>
                        <VSRegular key={schedule.id} >
                          Bắt đầu lúc: {schedule.start_time}
                        </VSRegular>
                        <VSRegular>
                          Kết thúc lúc: {schedule.finish_time}
                        </VSRegular>
                      </View>

                    </Pressable>)
                })}
                {isSchedToday? null:
                <Block style = {styles.block}>
                  <SRegular textStyles={{color: "red"}}>Bạn không có lịch học hôm nay!</SRegular>
                  <Pressable style={styles.viewAllSchedules} onPress={() => onNavigate(RootScreens.SCHEDULE)}>
                    <SRegular textStyles={{color: "white"}}>Xem tất cả lịch học</SRegular>
                    <Entypo name="chevron-right" size={24} color={"white"} />
                  </Pressable>
                </Block>}
                
              </ScrollView>} */}
            
          </View>
          <View style={styles.statistic}>
            <LSemiBold>Thông số môi trường học tập</LSemiBold>
            <View style={styles.statisticSensor}>
              <Block style = {styles.lightSensor}>
                <Entypo name="light-bulb" size={50} color={"#FFDA19"} />
                <Text style={{fontSize: 20, color: "#4178D4", marginTop: 15}}> Độ sáng </Text>
              </Block>
              <Block style = {styles.lightSensor}>
                <FontAwesome5 name="temperature-low" size={50} color={"red"} />
                <Text style={{fontSize: 20, color: "#4178D4", marginTop: 15}}> Nhiệt độ </Text>
              </Block>
              <Block style = {styles.lightSensor}>
                <Ionicons name="volume-medium-outline" size={50} color={"#20ABFA"} />
                <Text style={{fontSize: 20, color: "#4178D4", marginTop: 15}}> Âm lượng </Text>
              </Block>
              <Block style = {styles.lightSensor}>
                <Ionicons name="videocam-outline" size={50} color={"#20ABFA"} />
                <Text style={{fontSize: 20, color: "#4178D4", marginTop: 15}}> Camera </Text>
              </Block>
            </View>
          </View>

        </View>
      </View>

    </SafeAreaView>
  );
}

interface IBlock extends ViewProps {
  children?: React.ReactNode;
}

const Block = ({ children, ...props }: IBlock) => {
  return <View {...props}>{children}</View>
}

const seperatorStyle: ViewStyle = {
  height: 1,
  width: "100%",
  backgroundColor: "#CBD5E1",
}

const Seperator = () => <View style={seperatorStyle}/>;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "90%",
    paddingHorizontal: "5%",
    flexDirection: "column",
    alignContent: "flex-start",
  },

  title: {
    width: "100%",
    height: "5%",
    flexWrap: 'wrap',
//     flexDirection: 'row',
//     alignItems: 'center',
    alignContent: 'space-between',
  },

  buttonNoti: {

//     marginLeft: 10,
//     flexBasis: 24,
//     flexGrow: 1,
  },


  body: {
    width: "90%",
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
    height: 70,
    marginVertical: "2%",
    borderRadius: 15,
    backgroundColor: "white",
    borderColor: "#CBD5E1",
    borderWidth: 1,
  },

  topSession: {
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
//     backgroundColor: "lightblue"
  },

  bottomSession: {
    height: "50%",
    justifyContent: "center",
    flexWrap: 'wrap',
    alignContent: 'space-around',
//     backgroundColor: "pink"
  },

  statistic: {
    width: "100%",
    height: "70%",
  },

  navigation: {
    flexDirection: "row",
    width: "100%",
    height: "10%",
    borderTopWidth: 1,
    borderTopColor: colors.neutral_300,
    justifyContent: "center",
  },

  block: {
//     backgroundColor: "red"
  },

  viewAllSchedules: {
    marginTop: 10,
    padding: "2%",
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary_500,
    borderRadius: 15
  },

  statisticSensor: {
    marginTop: 20,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
//     backgroundColor: "lightblue",
    columnGap: 66,
    rowGap: 30
  },

  lightSensor: {
    backgroundColor: "white",
    color: "#4178D4",
    padding: 20,
    height: 140,
    width: 152,
    borderRadius: 15,
    borderColor: "#CBD5E1",
    borderWidth: 1,
  }
});