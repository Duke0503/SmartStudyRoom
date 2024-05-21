import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RootScreens } from "@/Screens";
import { colors } from "@/Components/colors";

export interface IProfileProps {
  onNavigate: (screen: RootScreens) => void;
}

export const AboutUs = (props: IProfileProps) => {
  const { onNavigate } = props;
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={24} color="black" onPress={() => onNavigate(RootScreens.ACCOUNT)} />
          <Text style={styles.headerText}> Về chúng tôi </Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.optionText}>Về chúng tôi</Text>
          <View style={styles.separator} />
          
          <Text style={styles.optionText}>Hỗ trợ</Text>
          <View style={styles.separator} />
          
          <Text style={styles.optionText}>Điều khoản và điều kiện</Text>
          <View style={styles.separator} />

          <Text style={styles.optionText}>Chính sách bảo mật dữ liệu</Text>
          <View style={styles.separator} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,    
  },
  box: {
    flex: 1,
    backgroundColor: '#fff',
  },
  optionText: {
    fontSize: 15,
    color: colors.neutral_900,
    marginTop: 40
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
});
