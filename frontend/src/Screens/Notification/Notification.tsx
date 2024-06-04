import { useDispatch, useSelector } from "react-redux";
import { RootScreens } from "..";
import { useGetNotificationsQuery } from "@/Services/notifications";
import { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { updateCurrentSchedule } from "@/Store/reducers/schedules";

export interface ILoginProps {
  onNavigate: (screen: RootScreens) => void;
}

export const Notification = (props: ILoginProps) => {
  const { onNavigate } = props;
  const [dataNotifications, setData] = useState<any>([]);
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();
  const { data, isSuccess, isLoading, error } = useGetNotificationsQuery(profile.id);

  useEffect(() => {
    if (isLoading) {
      console.log("Loading notifications...");
    }

    if (error) {
      console.error("Error fetching notifications:", error);
    }

    if (isSuccess && data) {
      // console.log("Fetched notifications:", data);
      setData(data);
    }
  }, [data, isSuccess, isLoading, error]);

  const handleNavigateSession = (schedule_ID: Number) => {
    dispatch(updateCurrentSchedule(schedule_ID));
    onNavigate(RootScreens.SESSION);
  } 

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={24} color="black" onPress={() => onNavigate(RootScreens.HOME)} />
          <Text style={styles.headerText}>Thông báo</Text>
        </View>
        <View style={styles.content}>
          
          <ScrollView>
            {isLoading ? (
              <Text>Loading...</Text>
            ) : error ? (
              <Text>Error fetching notifications</Text>
            ) : (
              dataNotifications.map((notification: any) => (
                <Pressable key={notification.ID} style={styles.notificationItem} onPress={() => handleNavigateSession(notification.scheduleID)} >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.notificationTitle}>{notification.title}</Text>
                    <Text style={styles.notificationContent}>{notification.content}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Text style={styles.notificationDate}>
                      {new Intl.DateTimeFormat('vi-VN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        timeZone: 'Asia/Ho_Chi_Minh',
                      }).format(new Date(notification.date))}
                    </Text>
                  </View>
                </Pressable>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
  },
  header: {
    width: "100%",
    height: "7%",
    flexDirection: 'row',
    marginBottom: 10,
    // paddingTop: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  content: {
    width: "100%",
    height: "100%",
  },
  contentItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: "5%",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 10,
    height: "3%",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 5,
    // alignItems: 'center', // Align items vertically
  },
  notificationTitle: {
    fontWeight: 'bold',
    flex: 1, // Allow title to expand
  },
  notificationContent: {
    marginTop: 5, // Adjust the spacing
    flex: 1, // Allow content to expand
  },
  notificationDate: {
    fontSize: 12,
    color: '#666',
  },
});
