import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, Image, SafeAreaView, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useUpdatePasswordMutation } from "@/Services/users";
import { RootScreens } from "@/Screens";
import { colors } from "@/Components/colors";

export interface IProfileProps {
  onNavigate: (screen: RootScreens) => void;
}

export const Password = (props: IProfileProps) => {
  const { onNavigate } = props;
  const dispatch = useDispatch();
  
  const profile = useSelector((state: any) => state.profile);
  const [userID, setUserID] = useState(profile.id);
  const [current_password, setCurrent_password] = useState("");
  const [new_password, setNew_password] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const [updatePassword, { data, isSuccess }] = useUpdatePasswordMutation();

  const handleUpdate = async () => {
    try {
      await updatePassword({ body: { current_password, new_password }, id: userID }).unwrap();
      setModalVisible(true);
    } catch (error) {
      alert("Mật khẩu hiện tại không chính xác.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={24} color="black" onPress={() => onNavigate(RootScreens.ACCOUNT)} />
          <Text style={styles.headerText}>Tài khoản</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Mật khẩu hiện tại</Text>
          <TextInput 
            style={styles.input} 
            value={current_password} 
            onChangeText={setCurrent_password}
            placeholder="Mật khẩu hiện tại"
            secureTextEntry={true}
          />

          <Text style={styles.label}>Mật khẩu mới</Text>
          <TextInput 
            style={styles.input} 
            value={new_password} 
            onChangeText={setNew_password}
            placeholder="Mật khẩu mới"
            secureTextEntry={true}
          />

          <Pressable style={styles.updateButton} onPress={handleUpdate}>
            <Text style={styles.updateButtonText}>{"Cập nhật mật khẩu"}</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Success Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.modalImage} />
            <Text style={styles.modalTitle}>Thay đổi mật khẩu thành công</Text>
            <Text style={styles.modalText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames velit.</Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
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
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 20,
    alignContent: 'center'
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
  },
  form: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  label: {
    fontSize: 15,
    color: colors.neutral_900,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 10,
    marginBottom: 30,
  },

  updateButton: {
    backgroundColor: colors.secondary_500,
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    color: colors.neutral_900,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: colors.neutral_500,
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#fff",
    borderColor: colors.secondary_500,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    width: '100%'
  },
  closeButtonText: {
    color: colors.secondary_500,
    fontSize: 16,
    fontWeight: "bold",
  },
});
