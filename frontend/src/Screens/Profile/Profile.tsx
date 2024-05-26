import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, Image, SafeAreaView, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfileMutation } from "@/Services/users";
import { RootScreens } from "..";
import { colors } from "@/Components/colors";
import { updateUser } from "@/Store/reducers/profile";

export interface IProfileProps {
  onNavigate: (screen: RootScreens) => void;
}

export const Profile = (props: IProfileProps) => {
  const { onNavigate } = props;

  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  const [name, setName] = useState(profile.name);
  const [birthday, setBirthDate] = useState(profile.birthday);
  const [phone_number, setPhone] = useState(profile.phone_number);
  const [gender, setGender] = useState(profile.gender);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [updateProfile, { isLoading, isError }] = useUpdateProfileMutation();

  const handleUpdate = async () => {
    try {
      await updateProfile({ body: {
        name: name,
        birthday: birthday,
        phone_number: phone_number,
        gender: gender
        } }).unwrap();
      dispatch(updateUser({ name, birthday, phone_number, gender }));
      setSuccessModalVisible(true);
    } catch (error) {
      setErrorMessage("Failed to update profile");
      setErrorModalVisible(true);
    }
  };

  useEffect(() => {
    setName(profile.name);
    setBirthDate(profile.birthday);
    setPhone(profile.phone_number);
    setGender(profile.gender);
  }, [profile]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={24} color="black" onPress={() => onNavigate(RootScreens.ACCOUNT)} />
          <Text style={styles.headerText}>Thông tin cá nhân</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.avatar} />
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>Họ tên</Text>
          <TextInput 
            defaultValue={profile.name} 
            style={styles.input} 
            value={name} 
            onChangeText={setName} 
            placeholder="Le Van A" 
            onSubmitEditing={(event) => setName(event.nativeEvent.text)} 
          />

          <Text style={styles.label}>Ngày sinh</Text>
          <TextInput 
            defaultValue={profile.birthday} 
            style={styles.input} 
            value={birthday} 
            onChangeText={setBirthDate} 
            placeholder="yyyy-mm-dd" 
            keyboardType="numeric" 
            onSubmitEditing={(event) => setBirthDate(event.nativeEvent.text)} 
          />

          <Text style={styles.label}>Số điện thoại</Text>
          <TextInput 
            defaultValue={profile.phone_number} 
            style={styles.input} 
            value={phone_number} 
            onChangeText={setPhone} 
            keyboardType="phone-pad" 
            placeholder="0123456789" 
            onSubmitEditing={(event) => setPhone(event.nativeEvent.text)} 
          />

          <Text style={styles.label}>Giới tính</Text>
          <View style={styles.genderContainer}>
            <Pressable
              style={[styles.genderButton, gender === "male" && styles.genderButtonActive]}
              onPress={() => setGender("male")}
            >
              <Text style={[styles.genderText, gender === "male" && styles.genderTextActive]}>Nam</Text>
            </Pressable>
            <Pressable
              style={[styles.genderButton, gender === "female" && styles.genderButtonActive]}
              onPress={() => setGender("female")}
            >
              <Text style={[styles.genderText, gender === "female" && styles.genderTextActive]}>Nữ</Text>
            </Pressable>
          </View>
          <Pressable style={styles.updateButton} onPress={handleUpdate} disabled={isLoading}>
            <Text style={styles.updateButtonText}>{isLoading ? "Đang cập nhật..." : "Cập nhật thông tin"}</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Success Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => {
          setSuccessModalVisible(!successModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.modalImage} />
            <Text style={styles.modalTitle}>Cập nhật thành công</Text>
            <Text style={styles.modalText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames velit.</Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => setSuccessModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Error Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={errorModalVisible}
        onRequestClose={() => {
          setErrorModalVisible(!errorModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.modalImage} />
            <Text style={styles.modalTitle}>Cập nhật thất bại</Text>
            <Text style={styles.modalText}>{errorMessage}</Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => setErrorModalVisible(false)}
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
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 20,
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
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  genderButton: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: colors.neutral_500,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  genderButtonActive: {
    borderColor: "#fff",
    backgroundColor: colors.secondary_500,
  },
  genderText: {
    color: colors.neutral_900,
  },
  genderTextActive: {
    color: "#fff",
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
