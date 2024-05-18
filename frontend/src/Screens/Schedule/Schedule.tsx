import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, Ionicons} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { RootScreens } from "..";
import { colors } from "@/Components/colors";
import VSSemiBold from "@/Components/texts/VSSemiBold";
import Title3 from "@/Components/texts/Title3";
import { Calendar, NativeDateService, I18nConfig, Text } from '@ui-kitten/components';
import VSRegular from "@/Components/texts/VSRegular";
import SRegular from "@/Components/texts/SRegular";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetAllScheduleQuery } from "@/Services/schedules";
import { updateSchedulesList } from "@/Store/reducers/schedules";

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
    long: [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ],
  },
};

const localeDateService = new NativeDateService('vi', { i18n, startDayOfWeek: 1 });

export const Schedule = (props: IScheduleProps) => {
  const { onNavigate } = props;
  const [date, setDate] = useState(new Date());

  const dispatch = useDispatch();
  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] = useLazyGetAllScheduleQuery();
  const schedulesList = useSelector((state: any) => state.schedules.scheduelesList);

  const handleFetch = async () => {
    await fetchOne();
  }

  useEffect(() => {
    handleFetch();
    if (isSuccess) {
      console.log(data);
      dispatch(updateSchedulesList(data));
    }
  }, [isSuccess]);

  console.log(schedulesList)

  if(isFetching){
    return <View></View>
  } else {
    return (
      <SafeAreaView>
        <StatusBar style="auto"></StatusBar>
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
            {/* <Text category='h6'>
              Selected date:
              {' '}
              {date.toLocaleDateString()}
            </Text> */}
            <View>
              <Pressable style={styles.button}>
                <Entypo name="plus" size={24} color={"white"}></Entypo>
                <SRegular textStyles={{color: "white"}}>Thêm lịch học</SRegular>
              </Pressable>
                {schedulesList.length == 0? 
                <SRegular>Không có dữ liệu</SRegular>: 
                <ScrollView  style={styles.schedule}>
                  {schedulesList.map((schedule: any) => {
                    return (
                    <Pressable style={styles.session} onPress={() => onNavigate(RootScreens.SESSION)}>
                      <SRegular>{schedule.title}</SRegular>
                    </Pressable>)
                  })}
                </ScrollView>}
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "90%",
    paddingHorizontal: "5%",
    paddingTop: "3%",
    flexDirection: "column",
    alignContent: "flex-start"
  },

  title: {
    width: "100%",
    height: "7%",
  },

  body: {
    width: "100%",
    height: "93%"
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