import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Pressable, TextInput } from "react-native";
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, Ionicons} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { RootScreens } from "..";
import Title3 from "@/Components/texts/Title3";
import { colors } from "@/Components/colors";
import SRegular from "@/Components/texts/SRegular";
import SSemiBold from "@/Components/texts/SSemiBold";
import { useRegisterUserMutation } from "@/Services";
import { useDispatch, useSelector } from "react-redux";
import { SelectTrigger, SelectInput, SelectIcon, ChevronDownIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, Select, Icon, SelectItem } from "@gluestack-ui/themed";
import { AuthContext } from "@/Context/AuthProvider";

export interface IRegisterProps {
  onNavigate: (string: RootScreens) => void;
}

export const Register = (props: IRegisterProps) => {
  const { onNavigate } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.profile);

  const [signup, signUpResult] = useRegisterUserMutation();

  const {updateAuthState} = useContext(AuthContext);

  const handleSignUp = async () => {
    try {
      const response = await signup({ name, email, password, roles }).unwrap();
      
      if (response.success) {
        onNavigate(RootScreens.LOGIN);
      } else {
        console.error('Signup failed');
      }
    } catch (err) {
      console.error('An error occurred:', err);
    }
  };

  useEffect(() => {
    if (user.token !== undefined && user.token !== "") {
      if(user.roles === 'supervisor'){
        updateAuthState({loggedIn: true, profile: user, busy: false});
        onNavigate(RootScreens.HOMEADMIN);
      }
      else{
        updateAuthState({loggedIn: true, profile: user, busy: false});
        onNavigate(RootScreens.HOME);
      }
    }
    }, []
  );

  return (
    <SafeAreaView>
      <StatusBar style="auto"></StatusBar>
      <View style={styles.container}>
        <View style={styles.title}>
            <Title3>Đăng ký</Title3>
        </View>
        <View style={styles.body}>
            <View style={styles.inputGroup}>
                <SRegular>Họ tên*</SRegular>
                <TextInput 
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder="Họ tên của bạn"
                ></TextInput>
            </View>
            <View style={styles.inputGroup}>
                <SRegular>Email*</SRegular>
                <TextInput 
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email của bạn"
                ></TextInput>
            </View>
            <View style={styles.inputGroup}>
                <SRegular>Vai trò*</SRegular>
                <Select onValueChange={setRole} selectedValue={roles}>
                  <SelectTrigger variant="outline" size="md" >
                    <SelectInput placeholder="Select option" />
                    <SelectIcon mr="$3">
                      <Icon as={ChevronDownIcon} />
                    </SelectIcon>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop/>
                    <SelectContent >
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      <SelectItem label="Học sinh" value="user" />
                      <SelectItem label="Phụ huynh" value="supervisor" />
                      
                    </SelectContent>
                  </SelectPortal>
                </Select>
            </View>
            <View style={styles.inputGroup}>
                <SRegular>Mật khẩu*</SRegular>
                <TextInput 
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Mật khẩu của bạn"
                    secureTextEntry={true}
                ></TextInput>
            </View>
            <View style={styles.inputGroup}>
                <SRegular>Nhập lại mật khẩu*</SRegular>
                <TextInput 
                    style={styles.input}
                    onChangeText={setRePassword}
                    value={rePassword}
                    placeholder="Nhập lại mật khẩu của bạn"
                    secureTextEntry={true}
                ></TextInput>
            </View>
            <Pressable onPress={() => onNavigate(RootScreens.LOGIN)}>
              <SRegular>Đã có tài khoản? Đăng nhập</SRegular>
            </Pressable>
            <Pressable style={styles.registerButton} onPress={handleSignUp}>
              <SSemiBold textStyles={{color: "white"}}>Đăng ký</SSemiBold>
            </Pressable>
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
    justifyContent: "center",
    alignItems: "center"
  },

  body: {
    width: "100%",
    height: "93%",
    paddingTop: "3%"
  },

  inputGroup: {
    width: "100%",
    height: "10%",
    marginVertical: "3%"
  },

  input: {
    marginTop: "2%",
    borderWidth: 1,
    borderColor: colors.neutral_300,
    borderRadius: 15,
    padding: "3%",
    height: "75%"
  },

  registerButton: {
    width: "50%",
    height: "10%",
    borderRadius: 15,
    backgroundColor: colors.secondary_500,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginVertical: "5%",
  }
  
});