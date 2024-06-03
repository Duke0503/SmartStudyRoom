import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Pressable, ScrollView, StatusBar, Platform } from "react-native";
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, Ionicons} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootScreens } from "..";
import { colors } from "@/Components/colors";
import VSSemiBold from "@/Components/texts/VSSemiBold";
import Title3 from "@/Components/texts/Title3";
import { Calendar, NativeDateService, I18nConfig } from '@ui-kitten/components';
import VSRegular from "@/Components/texts/VSRegular";
import SRegular from "@/Components/texts/SRegular";
import { useDispatch, useSelector } from "react-redux";
import { Text, Button, ButtonText, CloseIcon, Heading, Icon, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Input, InputField, InputIcon, InputSlot, HStack, VStack, Box } from '@gluestack-ui/themed';
import moment from 'moment-timezone';
import 'moment/locale/vi';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useCreateScheduleMutation, useLazyGetScheduleQuery } from "@/Services/schedules";
import { addSchedule, deleteCurrentSchedule, reset, updateCurrentSchedule } from "@/Store/reducers/schedules";

moment().tz("Asia/Ho_Chi_Minh").format();
moment().locale('vi');
moment.updateLocale('vi', {
  week : {
      dow : 1
   }
});

export interface IScheduleProps {
  onNavigate: (string: RootScreens) => void;
}

const i18n: I18nConfig = {
  dayNames: {
    short: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    long: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
  },
  monthNames: {
    short: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    long: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  },
};

const localeDateService = new NativeDateService('vi', { i18n, startDayOfWeek: 1 });

export const Schedule = (props: IScheduleProps) => {
  const { onNavigate } = props;
  const [date, setDate] = useState(new Date());
  const [addCalendar, setAddCalendar] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state:any) => state.profile);
  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] = useLazyGetScheduleQuery();
  const schedulesList = useSelector((state: any) => state.schedules.scheduelesList);

  const [createSchedule, createScheduleResult] = useCreateScheduleMutation();
  
  const handleAddCalendar = () => {
    setAddCalendar(true);
  }

  const [title, setTitle] = useState("");
  const [breakTime, setBreakTime] = useState(1);

  const [showStartTime, setShowStartTime] = useState(false);
  const [showStartDate, setShowStartDate] = useState(false);
  const [showFinishTime, setShowFinishTime] = useState(false);
  const [showFinishDate, setShowFinishDate] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [finishTime, setFinishTime] = useState(new Date());

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

  const handleCreateSchedule = async () => {
    try {
      setAddCalendar(false);

      const response = await createSchedule({title: title, status: "Chưa bắt đầu", start_time: startTime, finish_time: finishTime, break_time: breakTime, user_ID: user.id}).unwrap();

      if (response.success) {
        const params = {
          ID: response.data,
          title: title,
          status: "Chưa bắt đầu",
          start_time: startTime,
          finish_time: finishTime,
          break_time: breakTime
        }

        dispatch(addSchedule(params));

        setTitle("");
        setStartTime(new Date());
        setFinishTime(new Date());
        setBreakTime(1);
      } else {
        console.log("Create Schedule Failed");
      }
    }
    catch (error) {
      console.error('Error creating scheule:', error);
    }
  };

  const handleNavigateSession = (schedule_ID: Number) => {
    dispatch(updateCurrentSchedule(schedule_ID));
    onNavigate(RootScreens.SESSION);
  }

  const handleReset = () => {
    dispatch(reset());
  }

  return (
    <SafeAreaView>
      <StatusBar></StatusBar>
      <View style={styles.container}>
        <View style={styles.title}>
          <Title3>Quản lý lịch học</Title3>
        </View>
        <View style={styles.body}>
          <Calendar
            dateService={localeDateService}
            date={date}
            onSelect={nextDate => setDate(nextDate)}
          />
          <View style={styles.scheduleList}>
            <Pressable style={styles.button} onPress={handleAddCalendar}>
              <Entypo name="plus" size={24} color={"white"}></Entypo>
              <SRegular textStyles={{color: "white"}}>Thêm lịch học</SRegular>
            </Pressable>
            <Modal
              isOpen={addCalendar}
              onClose={() => {
                setAddCalendar(false)
              }}
            >
              <ModalBackdrop />
              <ModalContent>
                <ModalHeader>
                  <Heading size="lg">Thêm lịch học</Heading>
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
                      </VStack>
                      <VStack space="md">
                        <Text>Giờ bắt đầu</Text>
                          <HStack space="sm" style={{borderWidth: 1, padding: 10, borderRadius: 25, borderColor: "#DDDDDD"}}>
                            <Pressable onPress={() => setShowStartDate(true)}>
                              <Text>{startTime.toLocaleDateString()}</Text>
                            </Pressable>
                            <Pressable onPress={() => setShowStartTime(true)}>
                              <Text>{startTime.toLocaleTimeString()}</Text>
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
                                <Text>{finishTime.toLocaleTimeString()}</Text>
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
                      </VStack>
                      <VStack space="md">
                        <Text>Thời gian giải lao</Text>
                        <Input
                          variant="rounded"
                          size="lg"
                        >
                          <InputField keyboardType="numeric" placeholder="Số phút giải lao" onChangeText={breakTime => setBreakTime(parseInt(breakTime))} />
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
                      setAddCalendar(false);
                      setTitle("");
                      setStartTime(new Date());
                      setFinishTime(new Date());
                      setBreakTime(1);
                    }}
                  >
                    <ButtonText>Hủy</ButtonText>
                  </Button>
                  <Button
                    size="sm"
                    action="positive"
                    borderWidth="$0"
                    onPress={() => {
                      handleCreateSchedule()
                    }}
                  >
                    <ButtonText>Thêm</ButtonText>
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            
            {schedulesList.length == 0? 
            <View style={{padding: "5%", alignSelf: "center"}}>
              <SRegular>Không có dữ liệu</SRegular>
            </View>: 
            <ScrollView style={styles.schedule}>
              {schedulesList.map((schedule: any) => {
                let count = 0;
                if (moment(schedule.date).format("DD-MM-YYYY") === moment(date).format("DD-MM-YYYY")) {
                  count++;
                  return (
                    <Pressable key={schedule.ID} style={styles.session} onPress={() => handleNavigateSession(schedule.ID)}>
                      <SRegular>{schedule.title}</SRegular>
                    </Pressable>)
                }
              })} 
            </ScrollView>}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

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
  },

  body: {
    width: "90%",
    height: "93%"
  },

  scheduleList: {
    width: "100%",
    // height: "100%"
    // justifyContent: "center",
    // alignItems: "center"
  },

  schedule: {
    width: "100%",
    height: "50%",
  },

  button: {
    padding: "2%",
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary_500,
    borderRadius: 15
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
});