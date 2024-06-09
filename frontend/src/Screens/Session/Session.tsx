import { i18n, LocalizationKey } from "@/Localization";
import React, { useContext } from "react";
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
import { deleteCurrentSchedule } from "@/Store/reducers";
import { VStack, Heading, Progress, ProgressFilledTrack, Text } from "@gluestack-ui/themed";

import moment from 'moment-timezone';
import 'moment/locale/vi';
import { AuthContext } from "@/Context/AuthProvider";
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

  const studyTime = (moment(new Date()).unix() - moment(currentSchedule.start_time).unix()) > 0? 
  (moment(new Date()).unix() - moment(currentSchedule.start_time).unix()) / (moment(currentSchedule.finish_time).unix() - moment(currentSchedule.start_time).unix()) * 100 : 0;

  const {updateAuthState} = useContext(AuthContext);

  console.log(studyTime)

  const handleReturn = () => {
    dispatch(deleteCurrentSchedule({}));
    if(user.roles === "user"){
      updateAuthState({loggedIn: true, profile: user});
      onNavigate(RootScreens.SCHEDULE);
    }
    else if(user.roles === "supervisor"){
      updateAuthState({loggedIn: true, profile: user});
      onNavigate(RootScreens.USERDETAIL);
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
          <VStack space="lg">
            <VStack space="md">
              <Heading>Thời gian đã học: {Math.round((moment(new Date()).unix() - moment(currentSchedule.start_time).unix()) / 60)} phút</Heading>
              <Text size="md">Thời gian bắt đầu: {moment(currentSchedule.start_time).format("ddd, DD/MM/YYYY, HH:mm")}</Text>
              <Progress value={studyTime} size="md">
                <ProgressFilledTrack h={8} bg={colors.secondary_500}/>
              </Progress>
              <Text size="md">Thời gian kết thúc: {moment(currentSchedule.finish_time).format("ddd, DD/MM/YYYY, HH:mm")}</Text>
            </VStack>
            <VStack space="md">
              <Heading>Thông số môi trường học tập:</Heading>
            </VStack>
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
  }
});