import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, ViewProps, Image, Dimensions } from "react-native";
import { RootScreens } from "..";
import { colors } from "@/Components/colors";
import { ImageBackground } from "@gluestack-ui/themed";
import SSemiBold from "@/Components/texts/SSemiBold";
import LSemiBold from "@/Components/texts/LSemiBold";


export interface IHomeProps {
  onNavigate: (string:
    RootScreens.WELCOME |
    RootScreens.ONBOARD |
    RootScreens.LOGIN |
    RootScreens.REGISTER |
    RootScreens.FORGETPASSWORD |
    RootScreens.OTP |
    RootScreens.NEWPASSWORD
  ) => void;
}

export const Welcome = (props: IHomeProps) => {
  const { onNavigate } = props;

  return (
    <View style={styles.container}>
      <ImageBackground style={{ width: "100%", height: "100%" }} source={require('@/../../assets/images/OnboardWelcome.png')}>
        <View style={styles.innerImg}>
          <ImageBackground style={{ width: "100%", height: "100%" }} source={require('@/../../assets/images/BG.png')}>
            <View style={styles.head}>
              <Image source={require('@/../../assets/images/Logo1.png')} style={styles.logo} />
              <LSemiBold textStyles={{ marginLeft: "3%", color: 'white' }}>I - Learn</LSemiBold>

            </View>
            <View style={styles.welcomeText}>
              <Text style={{fontSize: 32, fontWeight: "bold", color: 'white', textAlign: "center" }}>Chào mừng đến với I - Learn</Text>
              <Text style={{fontSize: 13, color: 'white' }}>Hãy cùng nhau học tập thật hiệu quả</Text>
            </View>

            <Pressable style={styles.start} onPress={() => onNavigate(RootScreens.ONBOARD)}>
              <View style={styles.button}>
                <SSemiBold textStyles={{ color: "white" }}>Bắt đầu nào!</SSemiBold>
              </View>
            </Pressable>


          </ImageBackground>


        </View>
      </ImageBackground>

    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerImg: {
    position: 'absolute',
    top: 0, left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    // backgroundColor: "#4178D4",
  },
  head: {
    width: "100%",
    height: "7%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  welcomeText: {
    width: "100%",
    height: "70%",
    padding: 7,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  start: {
    height: "20%",
    // backgroundColor: 'lightgreen',
    justifyContent: 'center',
  },
  button: {
    // marginTop: 10,
    padding: "5%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: colors.secondary_500,
    borderRadius: 10,
  }

});
