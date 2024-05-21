import { i18n, LocalizationKey } from "@/Localization";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, Ionicons} from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { RootScreens } from "..";
import Title3 from "@/Components/texts/Title3";
import VSRegular from "@/Components/texts/VSRegular";
import { colors } from "@/Components/colors";
import VSSemiBold from "@/Components/texts/VSSemiBold";
import LSemiBold from "@/Components/texts/LSemiBold";
import SRegular from "@/Components/texts/SRegular";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetAllScheduleQuery } from "@/Services/schedules";
import { updateSchedulesList } from "@/Store/reducers";
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

  const dispatch = useDispatch();
  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] = useLazyGetAllScheduleQuery();
  const schedulesList = useSelector((state: any) => state.schedules.scheduelesList);

  const handleFetch = async () => {
    await fetchOne();
  }

  useEffect(() => {
    handleFetch();
    if (isSuccess) {
      dispatch(updateSchedulesList(data));
    }
  }, [isSuccess]);

  return (
    <SafeAreaView>
      <StatusBar style="auto"></StatusBar>
      <View style={styles.container}>
        <View style={styles.title}>
          <Title3 textStyles={{color: colors.neutral_900}}>Xin chào, Đức</Title3>
          <VSRegular textStyles={{color: colors.neutral_500}}>Đây là hoạt động ngày hôm nay của bạn</VSRegular>
        </View>
        <View style={styles.body}>
          <View style={styles.schedule}>
            <LSemiBold>Lịch học ngày hôm nay</LSemiBold>
              {schedulesList.length == 0? 
                <View style={{padding: "5%", alignSelf: "center"}}>
                  <SRegular>Không có dữ liệu</SRegular>
                </View>: 
                <ScrollView  style={styles.schedule}>
                  {schedulesList.map((schedule: any) => {
                    let count = 0;
                    if (moment(schedule.date).format("DD-MM-YYYY") === moment().format("DD-MM-YYYY")) {
                      count++;
                      return (
                        <Pressable id={schedule.ID} style={styles.session} onPress={() => onNavigate(RootScreens.SESSION)}>
                          <SRegular>{schedule.title}</SRegular>
                        </Pressable>)
                    } else {
                      return (
                        <View style={{padding: "5%", alignSelf: "center"}}>
                          <SRegular>Không có dữ liệu</SRegular>
                        </View>
                      )
                    }
                  })}
                </ScrollView>
              }
          </View>
          <View style={styles.statistic}>
            <LSemiBold>Thông số môi trường học tập</LSemiBold>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "90%",
    paddingHorizontal: "5%",
    paddingTop: "3%",
    flexDirection: "column",
    alignContent: "flex-start",
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
  }
});