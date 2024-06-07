import { i18n, LocalizationKey } from "@/Localization";
import React, { useState } from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, Ionicons} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { RootScreens } from "..";
import Title3 from "@/Components/texts/Title3";
import VSRegular from "@/Components/texts/VSRegular";
import { colors } from "@/Components/colors";
import VSSemiBold from "@/Components/texts/VSSemiBold";
import LSemiBold from "@/Components/texts/LSemiBold";
import SRegular from "@/Components/texts/SRegular";
import { useDispatch, useSelector } from "react-redux";
import { deleteCurrentSchedule, deleteSchedule, updateSchedule } from "@/Store/reducers";
import { VStack, Heading, Progress, ProgressFilledTrack, Text, HStack, Box, Modal, ButtonText, CloseIcon, Icon, Input, InputField, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Button } from "@gluestack-ui/themed";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment-timezone';
import 'moment/locale/vi';
import LRegular from "@/Components/texts/LRegular";
import { useDeleteScheduleMutation, useUpdateScheduleMutation } from "@/Services/schedules";
import session from "redux-persist/lib/storage/session";
moment().tz("Asia/Ho_Chi_Minh").format();
moment().locale('vi');
moment.updateLocale('vi', {
  week : {
      dow : 1
   }
});

export interface ISessionProps {
  onNavigate: (string: RootScreens) => void;
}

export const Session = (props: ISessionProps) => {
  const { onNavigate } = props;

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.profile);
  const schedules = useSelector((state: any) => state.schedules);
  const currentSchedule = schedules.currentSchedule;
  const [updateScheduleDatabase, updateScheduleDatabaseResult] = useUpdateScheduleMutation();
  const [deleteScheduleDatabase, deleteScheduleDatabaseResult] = useDeleteScheduleMutation();

  const [changeCalendar, setChangeCalendar] = useState(false);  

  const [title, setTitle] = useState(currentSchedule.title);
  const [sessionTime, setSessionTime] = useState(currentSchedule.session_time.toString());
  const [breakTime, setBreakTime] = useState(currentSchedule.break_time.toString());

  const [showStartTime, setShowStartTime] = useState(false);
  const [showStartDate, setShowStartDate] = useState(false);
  const [showFinishTime, setShowFinishTime] = useState(false);
  const [showFinishDate, setShowFinishDate] = useState(false);
  const [startTime, setStartTime] = useState(new Date(currentSchedule.start_time));
  const [finishTime, setFinishTime] = useState(new Date(currentSchedule.finish_time));

  const changeStartTime = (event: any, startTime: Date) => {
    setShowStartTime(false);
    setShowStartDate(false);
    setStartTime(startTime);
  };

  const changeFinishTime = (event: any, finishTime: Date) => {
    setShowFinishTime(false);
    setShowFinishDate(false);
    setFinishTime(finishTime);
  };

  let studyTime;

  if ((moment(new Date()).unix() - moment(currentSchedule.start_time).unix()) > 0) {
    studyTime = (moment(new Date()).unix() - moment(currentSchedule.start_time).unix()) / (moment(currentSchedule.finish_time).unix() - moment(currentSchedule.start_time).unix()) * 100;

    if (studyTime > 100) {
      studyTime = 100;
    }
  } else {
    studyTime = 0;
  }

  const handleReturn = () => {
    // dispatch(deleteCurrentSchedule({}));
    onNavigate(RootScreens.SCHEDULE);
  }

  console.log(currentSchedule)

  const handleChange = async(schedule_ID: Number) => {
    const response = await updateScheduleDatabase({schedule_ID: currentSchedule.ID, title: title, status: currentSchedule.status, start_time: startTime, finish_time: finishTime, session_time: sessionTime, break_time: breakTime, user_ID: user.id, sensor_ID: 1}).unwrap();

    if (response.success) {
      console.log("Update Schedule Success");

      const params = {
        ID: schedule_ID,
        title: title,
        status: currentSchedule.status,
        start_time: startTime,
        finish_time: finishTime,
        session_time: sessionTime,
        break_time: breakTime,
        sensor_ID: 1
      };

      dispatch(updateSchedule({schedule_ID: schedule_ID, params: params}));
      setChangeCalendar(false);
    } else {
      console.log("Delete Schedule Failed");
    }
  }

  const handleDelete = async (schedule_ID: Number) => {
    const response = await deleteScheduleDatabase({schedule_ID: schedule_ID}).unwrap();

    if (response.success) {
      console.log("Delete Schedule Success");
      dispatch(deleteSchedule({schedule_ID: schedule_ID}));
      onNavigate(RootScreens.SCHEDULE);
    } else {
      console.log("Delete Schedule Failed");
    }
  }

  return (
    <SafeAreaView>
      <StatusBar style="auto"></StatusBar>
      <View style={styles.container}>
        <View style={styles.title}>
            <Pressable style={{paddingRight: 15}} onPress={() => handleReturn()}>
                <Ionicons name="arrow-back-outline" size={24} color={colors.neutral_900}></Ionicons>
            </Pressable>
          <Title3 textStyles={{color: colors.neutral_900}}>{currentSchedule.title}</Title3>
        </View>
        <View style={styles.body}>
          <VStack h="100%" space="lg">
            <VStack space="md">
              {moment(new Date()).unix() > moment(currentSchedule.finish_time).unix()?
              <Heading>Thời gian đã học: Đã xong</Heading>:
              <Heading>Thời gian đã học: {Math.round((moment(new Date()).unix() - moment(currentSchedule.start_time).unix()) / 60)} phút</Heading>
              }
              
              <Text size="md">Thời gian bắt đầu: {moment(currentSchedule.start_time).format("ddd, DD/MM/YYYY, HH:mm")}</Text>
              <Progress value={studyTime} size="md">
                <ProgressFilledTrack h={8} bg={colors.secondary_500}/>
              </Progress>
              <Text size="md">Thời gian kết thúc: {moment(currentSchedule.finish_time).format("ddd, DD/MM/YYYY, HH:mm")}</Text>
            </VStack>
            <VStack h="50%" space="md">
              <Heading>Thông số môi trường học tập:</Heading>
              <VStack h="100%">
                <HStack h="50%" justifyContent="space-between">
                  <Box w="40%" h="70%" style={styles.sensorDataBox}>
                    <Entypo name="light-bulb" size={50} color={"#FFDA19"} />
                    <LRegular>Độ sáng:</LRegular>
                  </Box>
                  <Box w="40%" h="70%" style={styles.sensorDataBox}>
                    <FontAwesome5 name="temperature-low" size={50} color={"red"} />
                    <LRegular>Nhiệt độ:</LRegular>
                  </Box>
                </HStack>
                <HStack h="50%" justifyContent="space-between">
                  <Box w="40%" h="70%" style={styles.sensorDataBox}>
                    <Ionicons name="volume-medium-outline" size={50} color={"#20ABFA"} />
                    <LRegular>Âm thanh:</LRegular>
                  </Box>
                  <Box w="40%" h="70%" style={styles.sensorDataBox}>
                    <Ionicons name="videocam-outline" size={50} color={"#20ABFA"} />
                    <LRegular>Camera</LRegular>
                  </Box>
                </HStack>
              </VStack>
            </VStack>
            <Pressable style={styles.changeButton} onPress={() => setChangeCalendar(true)}>
              <LRegular textStyles={{color: "#FFFFFF"}}>Chỉnh sửa</LRegular>
            </Pressable>
            <Modal
              isOpen={changeCalendar}
              onClose={() => {
                setChangeCalendar(false)
              }}
            >
              <ModalBackdrop />
              <ModalContent>
                <ModalHeader>
                  <Heading size="lg">Chỉnh sửa lịch học</Heading>
                  <ModalCloseButton>
                    <Icon as={CloseIcon} />
                  </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <VStack space="lg">
                      <VStack space="md">
                        <Text>Tên</Text>
                        <Input
                          variant="rounded"
                          size="lg"
                        >
                          <InputField placeholder="Nhập tên" onChangeText={title => setTitle(title)} defaultValue={title} />
                        </Input>
                        {/* {displayTitleAlert &&
                          <Text color="red">Tên buổi học không được để trống</Text>} */}
                      </VStack>
                      <VStack space="md">
                        <Text>Giờ bắt đầu</Text>
                          <HStack space="sm" style={{borderWidth: 1, padding: 10, borderRadius: 25, borderColor: "#DDDDDD"}}>
                            <Pressable onPress={() => setShowStartDate(true)}>
                              <Text>{startTime.toLocaleDateString()}</Text>
                            </Pressable>
                            <Pressable onPress={() => setShowStartTime(true)}>
                              <Text>{startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
                            </Pressable>
                            {showStartDate && 
                            <DateTimePicker
                              value={startTime}
                              mode={"date"}
                              display={"default"}
                              minimumDate={new Date()}
                              is24Hour={true}
                              onChange={changeStartTime}
                            />}
                            {showStartTime &&
                            <DateTimePicker
                              value={startTime}
                              mode={"time"}
                              display={"default"}
                              minimumDate={new Date()}
                              is24Hour={true}
                              onChange={changeStartTime}
                            />}
                          </HStack>
                      </VStack>
                      <VStack space="md">
                        <Text>Giờ kết thúc</Text>
                          <HStack space="sm" style={{borderWidth: 1, padding: 10, borderRadius: 25, borderColor: "#DDDDDD"}}>
                              <Pressable onPress={() => setShowFinishDate(true)}>
                                <Text>{finishTime.toLocaleDateString()}</Text>
                              </Pressable>
                              <Pressable onPress={() => setShowFinishTime(true)}>
                                <Text>{finishTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
                              </Pressable>
                            {showFinishDate && 
                            <DateTimePicker
                              value={finishTime}
                              mode={"date"}
                              display={"default"}
                              minimumDate={startTime}
                              is24Hour={true}
                              onChange={changeFinishTime}
                            />}
                            {showFinishTime &&
                            <DateTimePicker
                              value={finishTime}
                              mode={"time"}
                              display={"default"}
                              minimumDate={startTime}
                              is24Hour={true}
                              onChange={changeFinishTime}
                            />}
                          </HStack>
                          {/* {displayFinishTimeAlert &&
                          <Text color="red">Giờ kết thúc phải lớn hơn giờ bắt đầu</Text>} */}
                      </VStack>
                      <VStack space="md">
                        <Text>Thời gian một phiên học</Text>
                        <Input
                          variant="rounded"
                          size="lg"
                        >
                          <InputField keyboardType="numeric" placeholder="Số phút học" onChangeText={sessionTime => setSessionTime(parseInt(sessionTime))} defaultValue={sessionTime} />
                        </Input>
                        {/* {displaySessionTimeAlert &&
                          <Text color="red">Thời gian một phiên học không được để trống</Text>} */}
                      </VStack>
                      <VStack space="md">
                        <Text>Thời gian giải lao</Text>
                        <Input
                          variant="rounded"
                          size="lg"
                        >
                          <InputField keyboardType="numeric" placeholder="Số phút giải lao" onChangeText={breakTime => setBreakTime(parseInt(breakTime))} defaultValue={breakTime} />
                        </Input>
                      </VStack>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    action="secondary"
                    mr="$3"
                    onPress={() => {
                      setChangeCalendar(false);
                      setTitle(currentSchedule.title);
                      setStartTime(new Date(currentSchedule.start_time));
                      setFinishTime(new Date(currentSchedule.finish_time));
                      setSessionTime(currentSchedule.session_time.toString());
                      setBreakTime(currentSchedule.break_time.toString());
                    }}
                  >
                    <ButtonText>Hủy</ButtonText>
                  </Button>
                  <Button
                    size="sm"
                    action="positive"
                    borderWidth="$0"
                    onPress={() => {
                      handleChange(currentSchedule.ID)
                    }}
                  >
                    <ButtonText>Chỉnh sửa</ButtonText>
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Pressable style={styles.deleteButton} onPress={() => handleDelete(currentSchedule.ID)}>
              <LRegular textStyles={{color: "#FFFFFF"}}>Xóa</LRegular>
            </Pressable>
          </VStack>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: "5%",
    paddingTop: "3%",
    flexDirection: "column",
    alignContent: "flex-start",
    backgroundColor: "#FFFFFF"
  },

  title: {
    width: "100%",
    height: "7%",
    flexDirection: "row",
    backgroundColor: colors.neutral_100,
    borderRadius: 25,
    alignItems: "center",
    paddingLeft: "3%"
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
  },

  sensorDataBox: {
    justifyContent: "space-evenly",
    borderWidth: 1,
    borderColor: colors.neutral_300,
    borderRadius: 15,
    padding: "5%"
  },

  changeButton: {
    backgroundColor: colors.success_500,
    width: "100%",
    height: "8%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15
  },

  deleteButton: {
    backgroundColor: colors.error_500,
    width: "100%",
    height: "8%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15
  }
});