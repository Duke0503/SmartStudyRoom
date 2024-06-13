import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, ViewProps, Image, Dimensions, TouchableOpacity } from "react-native";
import { RootScreens } from "../..";
import Onboarding from 'react-native-onboarding-swiper';
import { colors } from "@/Components/colors";
import { setItem } from "@/util/asyncStorage";
import { ImageBackground } from "@gluestack-ui/themed";
import LSemiBold from "@/Components/texts/LSemiBold";


export interface IHomeProps {
  onNavigate: (string:
    RootScreens.ONBOARD |
    RootScreens.LOGIN |
    RootScreens.REGISTER |
    RootScreens.FORGETPASSWORD |
    RootScreens.OTP |
    RootScreens.NEWPASSWORD
  ) => void;
}

const { width, height } = Dimensions.get('window');

export const Onboard = (props: IHomeProps) => {
  const { onNavigate } = props;

  const handleDone = () => {
    setItem('onBoarded', '1');
    onNavigate(RootScreens.LOGIN);
  }

  const skipButton = ({ ...prop }) => {
    return (
      <TouchableOpacity style={styles.skipButton} {...prop}>
        <Text style={{ color: 'black' }}>Tiếp tục</Text>
      </TouchableOpacity>
    )
  };
  
  const doneButton = ({ ...prop }) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...prop}>
        <Text style={{ color: 'black' }}>Xong</Text>
      </TouchableOpacity>
    )
  };
  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        SkipButtonComponent={skipButton}
        DoneButtonComponent={doneButton}
        containerStyles={{ paddingHorizontal: 15 }}
        pages={[
          {
            backgroundColor: "#B5D1E0",
            image: (
              <View style={styles.OnboardingImg}>
                <ImageBackground style={{ width: "100%", height: "100%" }} source={require('@/../../assets/images/OnboardScreen1.png')}>
                <View style={styles.innerImg}>
                  <ImageBackground style={{ width: "100%", height: "100%", justifyContent: 'flex-end', }} source={require('@/../../assets/images/BGOnboard.png')}>
                    <View style={styles.ILearn}>
                      <Image source={require('@/../../assets/images/Logo1.png')} style={styles.logo} />
                      <LSemiBold textStyles={{ marginLeft: "3%", color: 'white' }}>I - Learn</LSemiBold>
                    </View>
                    
                  </ImageBackground>
                </View>
                  
                </ImageBackground>
              </View>
            ),
            title: 'Quản lý thời gian học hiệu quả',
            titleStyles: {
              fontSize: 25, fontWeight: "bold", textAlign: "center",
            },
            subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit enim, ac amet ultrices.',
          },
          {
            backgroundColor: "#B5D1E0",
            image: (
              <View style={styles.OnboardingImg}>
                <ImageBackground style={{ width: "100%", height: "100%" }} source={require('@/../../assets/images/OnboardScreen2.jpeg')}>
                <View style={styles.innerImg}>
                  <ImageBackground style={{ width: "100%", height: "100%", justifyContent: 'flex-end', }} source={require('@/../../assets/images/BGOnboard.png')}>
                    <View style={styles.ILearn}>
                      <Image source={require('@/../../assets/images/Logo1.png')} style={styles.logo} />
                      <LSemiBold textStyles={{ marginLeft: "3%", color: 'white' }}>I - Learn</LSemiBold>
                    </View>
                    
                  </ImageBackground>
                </View>
                  
                </ImageBackground>
              </View>
            ),
            title: 'Giám sát môi trường học',
            subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit enim, ac amet ultrices.',
          },
          {
            backgroundColor: "#B5D1E0",
            image: (
              <View style={styles.OnboardingImg}>
                <ImageBackground style={{ width: "100%", height: "100%" }} source={require('@/../../assets/images/OnboardScreen3.webp')}>
                <View style={styles.innerImg}>
                  <ImageBackground style={{ width: "100%", height: "100%", justifyContent: 'flex-end', }} source={require('@/../../assets/images/BGOnboard.png')}>
                    <View style={styles.ILearn}>
                      <Image source={require('@/../../assets/images/Logo1.png')} style={styles.logo} />
                      <LSemiBold textStyles={{ marginLeft: "3%", color: 'white' }}>I - Learn</LSemiBold>
                    </View>
                    
                  </ImageBackground>
                </View>
                  
                </ImageBackground>
              </View>
            ),
            title: 'Ngồi học với tư thế tốt nhất',
            titleStyles: {
              fontSize: 25, fontWeight: "bold", textAlign: "center",
            },
            subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit enim, ac amet ultrices.',
          },

        ]}
      />
    </View>
  )

}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: "red",
  },
  onboardBox: {
    // height: 100,
    // width: "100%",
    backgroundColor: "green",
  },
  OnboardingImg: {
    width: width + 0.9,
    height: width,
    backgroundColor: 'pink',
  },
  innerImg: {
    position: 'absolute',
    top: 0, left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    flexDirection: 'column',
    // backgroundColor: "#4178D4",
  },

  ILearn: {
    width: "100%",
    height: "25%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'flex-end',
    padding: 5,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  skipButton: {
    padding: 20,
    borderRadius: 10,
  },

  doneButton: {
    padding: 20,
    backgroundColor: colors.secondary_500,
    borderRadius: 10,
  },


});
