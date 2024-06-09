import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, ScrollView, ViewProps } from "react-native";
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, Ionicons } from "@expo/vector-icons";
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
import { Text, Button, ButtonText, CloseIcon, Heading, Icon, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Input, InputField, InputIcon, InputSlot, HStack, VStack, Box } from "@gluestack-ui/themed";
import moment from 'moment-timezone';
import 'moment/locale/vi';
import { updateCurrentSchedule } from "@/Store/reducers";
moment().tz("Asia/Ho_Chi_Minh").format();
moment().locale('vi');
moment.updateLocale('vi', {
  week: {
    dow: 1
  }
});


export interface IHomeProps {
  onNavigate: (string:
    RootScreens.HOMEADMIN |
    RootScreens.ACCOUNT |
    RootScreens.PROFILE |
    RootScreens.SETTING |
    RootScreens.UPDATE |
    RootScreens.ABOUTUS |
    RootScreens.USERDETAIL |
    RootScreens.SESSION
  ) => void;
}


export const UserDetail = (props: IHomeProps) => {
  const { onNavigate } = props;

  const dispatch = useDispatch();

  const userlists = useSelector((state: any) => state.listOfUsers);
  const user = userlists.currentUser;

  const schedules = useSelector((state: any) => state.schedules);
  let isScheduleToday: boolean = false;

  const realTimeSchedule = schedules.scheduelesList.find((schedule: any) => (
    moment(schedule.start_time).format("DD-MM-YYYY") === moment(new Date()).format("DD-MM-YYYY")
    &&
    (moment(schedule.start_time).format("HH:mm:ss") <= moment(new Date()).format("HH:mm:ss") && moment(schedule.finish_time).format("HH:mm:ss") >= moment(new Date()).format("HH:mm:ss"))
  ));
  // if(realTimeSchedule){
  //   console.log("realTimeSchedule: ", realTimeSchedule);
  // }

  const handleNavigateSession = (schedule_ID: Number) => {
    dispatch(updateCurrentSchedule(schedule_ID));
    onNavigate(RootScreens.SESSION);
  }

  return (
    <SafeAreaView>
      <StatusBar style="auto"></StatusBar>
      <View style={styles.container}>
        <View style={styles.title}>
          <Ionicons name="arrow-back" size={24} color="black" onPress={() => onNavigate(RootScreens.HOMEADMIN)} />
          <View style={styles.name}>
            <Title3 textStyles={{ color: colors.neutral_900 }}>Tài khoản: {user.name}</Title3>
            <VSRegular textStyles={{ color: colors.neutral_500 }}>Email: {user.email}</VSRegular>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.schedule}>
            <View style={styles.realTimeSession}>
              <LSemiBold>Phiên học đang diễn ra</LSemiBold>
              {realTimeSchedule ?
                <Pressable style={styles.session} onPress={() => handleNavigateSession(realTimeSchedule.ID)}>
                  <View style={styles.topSession}>
                    <SSemiBold>
                      {realTimeSchedule.title}
                    </SSemiBold>
                  </View>
                  <Seperator />
                  <View style={styles.bottomSession}>
                    <VSRegular>
                      Bắt đầu lúc: {moment(realTimeSchedule.start_time).utcOffset("+0700").format('HH:mm')}
                    </VSRegular>
                    <VSRegular>
                      Kết thúc lúc: {moment(realTimeSchedule.finish_time).utcOffset("+0700").format('HH:mm')}
                    </VSRegular>
                  </View>
                </Pressable>
                : <SRegular>Không có phiên học nào đang diễn ra</SRegular>
              }
            </View>


            <LSemiBold>Lịch học ngày hôm nay</LSemiBold>
            {schedules.scheduelesList.length == 0 ?
              <SRegular>Không có lịch học nào</SRegular> :
              <ScrollView style={styles.sessionList}>
                {schedules.scheduelesList.map((schedule: any) => {
                  if (moment(schedule.start_time).format("DD-MM-YYYY") === moment(new Date()).format("DD-MM-YYYY")) isScheduleToday = true;
                  return (moment(schedule.start_time).format("DD-MM-YYYY") !== moment(new Date()).format("DD-MM-YYYY") ?
                    null :
                    <Pressable key={schedule.ID} style={styles.session} onPress={() => handleNavigateSession(schedule.ID)}>
                      <View style={styles.topSession}>
                        <SSemiBold>
                          {schedule.title}
                        </SSemiBold>
                      </View>
                      <Seperator />
                      <View style={styles.bottomSession}>
                        <VSRegular>
                          Bắt đầu lúc: {moment(schedule.start_time).utcOffset("+0700").format('HH:mm')}
                        </VSRegular>
                        <VSRegular>
                          Kết thúc lúc: {moment(schedule.finish_time).utcOffset("+0700").format('HH:mm')}
                        </VSRegular>
                      </View>
                    </Pressable>)
                })}
                {isScheduleToday ? null :
                  <Block style={styles.block}>
                    <SRegular textStyles={{ color: "red" }}>{user.name} không có lịch học hôm nay!</SRegular>
                  </Block>}
              </ScrollView>}
          </View>
          <View style={styles.statistic}>
            <LSemiBold>Lịch sử các buổi học</LSemiBold>
            {schedules.scheduelesList.length == 0 ?
              <SRegular>Không có lịch học nào</SRegular> :
              <ScrollView style={styles.sessionList}>
                {schedules.scheduelesList.map((schedule: any) => {
                  return (
                    <Pressable key={schedule.ID} style={styles.session} onPress={() => handleNavigateSession(schedule.ID)}>
                      <View style={styles.topSession}>
                        <SSemiBold>
                          {schedule.title}
                        </SSemiBold>
                      </View>
                      <Seperator />
                      <View style={styles.bottomSession}>
                        <VSRegular>
                          Bắt đầu lúc: {moment(schedule.start_time).utcOffset("+0700").format('HH:mm')}
                        </VSRegular>
                        <VSRegular>
                          Kết thúc lúc: {moment(schedule.finish_time).utcOffset("+0700").format('HH:mm')}
                        </VSRegular>
                      </View>
                    </Pressable>)
                })}
                {isScheduleToday ? null :
                  <Block style={styles.block}>
                    <SRegular textStyles={{ color: "red" }}>{user.name} không có lịch học hôm nay!</SRegular>
                  </Block>}
              </ScrollView>}
          </View>
        </View>
      </View>

    </SafeAreaView>
  );
};

interface IBlock extends ViewProps {
  children?: React.ReactNode;
};

const Block = ({ children, ...props }: IBlock) => {
  return <View {...props}>{children}</View>
};

const seperatorStyle: ViewStyle = {
  height: 1,
  width: "100%",
  backgroundColor: "#CBD5E1",
};

const Seperator = () => <View style={seperatorStyle} />;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
  },

  header: {
    width: "90%",
    height: "7%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: 'red',
  },

  title: {
    width: "90%",
    height: "7%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    // backgroundColor: 'pink',
  },

  name: {
    marginLeft: 7,
    // backgroundColor: 'lightblue',
  },

  body: {
    width: "90%",
    height: "93%",
    // backgroundColor: 'pink',
  },

  schedule: {
    width: "100%",
    height: "50%",
    // backgroundColor: 'lightgreen',
  },

  realTimeSession: {
    width: "100%",
    height: "35%",
    // backgroundColor: "brown",
  },

  sessionList: {
    width: "100%",
    marginVertical: "3%",
    // backgroundColor: 'lightyellow',
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
    height: "45%",
    // backgroundColor: "lightblue",
  },

  block: {
    //     backgroundColor: "red"
  },
});