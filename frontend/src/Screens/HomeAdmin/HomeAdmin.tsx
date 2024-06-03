import React, { useEffect } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, ViewProps } from "react-native";
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, Ionicons} from "@expo/vector-icons";
import { RootScreens } from "..";
import { StatusBar } from "expo-status-bar";
import Title3 from "@/Components/texts/Title3";
import VSRegular from "@/Components/texts/VSRegular";
import SRegular from "@/Components/texts/SRegular";
import { colors } from "@/Components/colors";
import LSemiBold from "@/Components/texts/LSemiBold";
import SSemiBold from "@/Components/texts/SSemiBold";
import { Platform, ViewStyle } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
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

export const HomeAdmin = (props: IHomeProps) => {
  const { onNavigate } = props;

  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.profile);
  const schedules = useSelector((state: any) => state.schedules);

  // console.log("state: ", state);
  

  let isScheduleToday:boolean = false;
  // console.log("schedule list in home screen: ", schedules.scheduelesList);


  // const dispatch = useDispatch();
  // const sensorList = useSelector((state: any) => state.sensors.sensorsList);

  // console.log("sensorList: ",sensorList.name);

  return (
    <SafeAreaView>
      <StatusBar style="auto"></StatusBar>
      <View style={styles.container}>
        <View style={styles.title}>
          <View>
            <Title3 textStyles={{color: colors.neutral_900}}>Xin chào, {user.name}</Title3>
            <VSRegular textStyles={{color: colors.neutral_500}}>Đây là hoạt động ngày hôm nay của bạn</VSRegular>
          </View>
          <Pressable>
            <Ionicons name="notifications" size={24} color={"#52B6DF"}/>
          </Pressable>
        </View>
        <View style={styles.body}>
          <View style={styles.schedule}>
            <LSemiBold>Danh sách tài khoản đang quản lý</LSemiBold>
            {schedules.scheduelesList.length == 0? 
              <SRegular>Không có tài khoản con nào</SRegular>: 
              <ScrollView style={styles.sessionList}>
                {schedules.scheduelesList.map((schedule: any) => {
                  if(moment(schedule.start_time).format("DD-MM-YYYY") === moment(new Date()).format("DD-MM-YYYY")) isScheduleToday = true;
                  return (moment(schedule.start_time).format("DD-MM-YYYY") !== moment(new Date()).format("DD-MM-YYYY")? 
                    <></> :
                    <Pressable key={schedule.id} style={styles.session} >
                      <View style={styles.topSession}>
                        <SSemiBold key={schedule.id}>
                          {schedule.title}
                        </SSemiBold>
                      </View>

                      <Seperator/>
                      <View style={styles.bottomSession}>
                        <VSRegular key={schedule.id} >
                          Bắt đầu lúc: {moment(schedule.start_time).utcOffset("+0700").format('HH:mm')}
                        </VSRegular>
                        <VSRegular key={schedule.id}>
                          Kết thúc lúc: {moment(schedule.finish_time).utcOffset("+0700").format('HH:mm')}
                        </VSRegular>
                      </View>
                    </Pressable>)
                })}
                {isScheduleToday? null:
                <Block style = {styles.block}>
                  <SRegular textStyles={{color: "red"}}>Bạn không có tài khoản con nào quản lý!</SRegular>
                </Block>}
              </ScrollView>}
          </View>
          <View style={styles.statistic}>
            <LSemiBold>Thông số môi trường</LSemiBold>
            <View style={styles.statisticSensor}>
              <View style={styles.statisticRow}>
                <Block style = {styles.lightSensor}>
                <Entypo name="light-bulb" size={50} color={"#FFDA19"} />
                <Text style={{fontSize: 20, color: "#4178D4", marginTop: 15}}> Độ sáng </Text>
              </Block>
              <Block style = {styles.lightSensor}>
                <FontAwesome5 name="temperature-low" size={50} color={"red"} />
                <Text style={{fontSize: 20, color: "#4178D4", marginTop: 15}}> Nhiệt độ </Text>
              </Block>
              </View>
              <View style={styles.statisticRow}>
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
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
  },

  title: {
    width: "90%",
    height: "7%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  body: {
    width: "90%",
    height: "93%"
  },

  schedule: {
    width: "100%",
    height: "50%",
  },

  sessionList: {
    width: "100%",
    // height: "95%",
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
    // flex: 1,
    flexWrap: "wrap",
    rowGap: 20,
    // backgroundColor: "lightblue",
    
  },

  statisticRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'space-between',
  },

  lightSensor: {
    backgroundColor: "white",
    color: "#4178D4",
    padding: 20,
    height: 140,
    width: 160,
    borderRadius: 15,
    borderColor: "#CBD5E1",
    borderWidth: 1,
  }
});