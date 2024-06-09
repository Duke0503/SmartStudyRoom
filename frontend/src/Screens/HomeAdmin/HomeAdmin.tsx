import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, ScrollView, ViewProps } from "react-native";
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { RootScreens } from "..";
import { StatusBar } from "expo-status-bar";
import Title3 from "@/Components/texts/Title3";
import VSRegular from "@/Components/texts/VSRegular";
import SRegular from "@/Components/texts/SRegular";
import { colors } from "@/Components/colors";
import LSemiBold from "@/Components/texts/LSemiBold";
import SSemiBold from "@/Components/texts/SSemiBold";
import { Platform, ViewStyle } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, ButtonText, CloseIcon, Heading, Icon, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Input, InputField, InputIcon, InputSlot, HStack, VStack, Box } from "@gluestack-ui/themed";
import { useAddManagedUserMutation, useDeleteManagedUserMutation, useGetManagedUserQuery, useLazyGetManagedUserQuery } from "@/Services/homeadmin";
import { resetUserList, updateCurrentUser, updateManagedUser } from "@/Store/reducers/userlist";
import { useLazyGetScheduleQuery } from "@/Services/schedules";
import { resetSchedule, updateScheduleOfUserID } from "@/Store/reducers";


export interface IHomeProps {
  onNavigate: (string: 
    RootScreens.HOMEADMIN | 
    RootScreens.ACCOUNT |
    RootScreens.PROFILE |
    RootScreens.SETTING |
    RootScreens.UPDATE |
    RootScreens.ABOUTUS |
    RootScreens.USERDETAIL
  ) => void;
}

export const HomeAdmin = (props: IHomeProps) => {
  const { onNavigate } = props;

  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.profile);
  const userlists = useSelector((state: any) => state.listOfUsers);

  const [addUserList, setAddUserList] = useState(false);
  const [deleteUserList, setDeleteUserList] = useState(false);

  const [userID, setUserID] = useState<number | null>(null);
  const [verifyDeleteUser, setVerifyDeleteUser] = useDeleteManagedUserMutation();

  const [email, setEmail] = useState("");
  const [sendEmailRequest, sendEmailRequestResult] = useAddManagedUserMutation();

  const [getManagedUser, { isFetching }] = useLazyGetManagedUserQuery();
  const { data: managedUserData } = useGetManagedUserQuery({ user_ID: user.id });

  const [getSchedule, {isFetching : getScheduleFetching }] = useLazyGetScheduleQuery();

  const handleNavigateUserDetail = async (user_id: number) => {
    dispatch(resetSchedule());
    try {
      setUserID(user_id);
      const response = await getSchedule({user_ID: user_id}).unwrap();
      if(response){   
        dispatch(updateScheduleOfUserID(response));
        dispatch(updateCurrentUser(user_id));
        // console.log("current user in homeAdmin: ",userlists.currentUser);
        onNavigate(RootScreens.USERDETAIL);
      }
      else {
        console.log("Update schedule of user id failed")
      }
    }
    catch (error) {
      console.error('Error get schedule: ', error);
    }    
  }

  const handleDeleteUserList = (user_id: number) => {
    setUserID(user_id);
    setDeleteUserList(true);
  };

  const handleVerifyDeleteUserList = async () => {
    try {
      await verifyDeleteUser({ user_ID: userID }).unwrap();
      setUserID(null);
      handleUpdateManagedUser();
      setDeleteUserList(false);
    }
    catch (error) {
      console.error('Error verify delete user: ', error);
    }
  };

  const handleAddUserList = () => {
    setAddUserList(true);
  };

  const handleSendEmailRequest = async () => {
    try {
      setAddUserList(false);
      const response = await sendEmailRequest({ email: email, user_ID: user.id }).unwrap();

      if (response.success) {
        setEmail("");
      } else {
        console.log("Send verify email request failed");
      }
    }
    catch (error) {
      console.error('Error send verify email request:', error);
    }
  };

  const handleUpdateManagedUser = async () => {
    // console.log('user_id: ', user.id);
    try {
      const response = await getManagedUser({ user_ID: user.id }).unwrap();
      // console.log("list user after update: ", response);
      dispatch(updateManagedUser(response));
    } catch (error) {
      console.error('Error updating managed user:', error);
    }
  }

  useEffect(() => {
    if (managedUserData) {
      dispatch(updateManagedUser(managedUserData));
    }
  }, [managedUserData]);

  const handleReset = () => {
    dispatch(resetUserList());
  }

  // console.log('list users in home admin: ', userlists.userList);
  return (
    <SafeAreaView>
      <StatusBar style="auto"></StatusBar>
      <View style={styles.container}>
        <View style={styles.title}>
          <View>
            <Title3 textStyles={{ color: colors.neutral_900 }}>Xin chào, {user.name}</Title3>
          </View>
          <Pressable>
            <Ionicons name="notifications" size={24} color={"#52B6DF"} />
          </Pressable>
        </View>
        <View style={styles.body}>
          <View style={styles.userList}>
            <LSemiBold>Các tài khoản bạn đang quản lý</LSemiBold>
            {userlists.userList.length == 0 ?
              <SRegular>Bạn không có tài khoản con nào để quản lý!</SRegular> :
              <ScrollView style={styles.userManagedList}>
                {userlists.userList.map((users: any) => {
                  return (user.id !== users.supervisorID ?
                    null :
                    <View key={users.ID}>
                      <Block style={styles.userItem}>
                        <View style={styles.topUserItem}>
                          <SSemiBold>
                            Tên tài khoản: {users.name}
                          </SSemiBold>
                        </View>

                        <View style={styles.bottomUserItem}>
                          <VSRegular>
                            Email: {users.email}
                          </VSRegular>
                        </View>
                      </Block>
                      <View style={styles.groupButton}>
                        <Pressable style={styles.buttonLeft} onPress={() => {handleDeleteUserList(users.ID)}}>
                          <MaterialIcons name="delete" size={24} color={"white"} />
                          <SRegular textStyles={{ color: "white" }}>Xóa</SRegular>
                        </Pressable>
                        <Pressable style={styles.buttonRight} onPress={() => {handleNavigateUserDetail(users.ID)}}>
                          <SRegular textStyles={{ color: "white" }}>Chi tiết</SRegular>
                          <Entypo name="chevron-right" size={24} color={"white"} />
                        </Pressable>
                      </View>
                      <Modal
                        isOpen={deleteUserList}
                        onClose={() => {
                          setDeleteUserList(false)
                        }}
                      >
                        <ModalBackdrop />
                        <ModalContent>
                          <ModalHeader>
                            <Heading size="lg">Bạn có chắc chắn muốn xóa tài khoản này khỏi danh sách không?</Heading>
                            <ModalCloseButton>
                              <Icon as={CloseIcon} />
                            </ModalCloseButton>
                          </ModalHeader>
                          <ModalFooter>
                            <Button
                              variant="outline"
                              size="sm"
                              action="secondary"
                              mr="$3"
                              onPress={() => {
                                setUserID(null);
                                setDeleteUserList(false);
                              }}
                            >
                              <ButtonText>Hủy</ButtonText>
                            </Button>
                            <Button
                              bgColor={colors.secondary_500}
                              size="sm"
                              action="positive"
                              borderWidth="$0"
                              onPress={() => {
                                handleVerifyDeleteUserList();
                              }}
                            >
                              <ButtonText>Xóa tài khoản</ButtonText>
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </View>
                  )
                })}

              </ScrollView>}


          </View>
          <Block style={styles.loading}>
            {isFetching &&
              <View>
                <AntDesign name="loading1" size={24} color={colors.primary_500} style={{ alignSelf: "center" }}></AntDesign>
                <Text color={colors.primary_500}>Đang tải</Text>
              </View>
            }
          </Block>


          {/* <Pressable style={styles.button} onPress={handleReset}>
            <Ionicons name="reload" size={24} color={"white"}></Ionicons>
            <SRegular textStyles={{ color: "white" }}>Reset State</SRegular>
          </Pressable> */}
          <View style={styles.groupButton}>
            <Pressable style={styles.buttonLeft} onPress={handleUpdateManagedUser}>
              <Ionicons name="reload" size={24} color={"white"}></Ionicons>
              <SRegular textStyles={{ color: "white" }}>Tải lại danh sách</SRegular>
            </Pressable>
            <Pressable style={styles.buttonRight} onPress={handleAddUserList}>
              <Entypo name="plus" size={24} color={"white"}></Entypo>
              <SRegular textStyles={{ color: "white" }}>Thêm tài khoản</SRegular>
            </Pressable>
          </View>
          <Modal
            isOpen={addUserList}
            onClose={() => {
              setAddUserList(false)
            }}
          >
            <ModalBackdrop />
            <ModalContent>
              <ModalHeader>
                <Heading size="lg">Gửi yêu cầu thêm tài khoản</Heading>
                <ModalCloseButton>
                  <Icon as={CloseIcon} />
                </ModalCloseButton>
              </ModalHeader>
              <ModalBody>
                <VStack space="lg">
                  <VStack space="md">
                    <Text>Email</Text>
                    <Input
                      variant="rounded"
                      size="lg"
                    >
                      <InputField placeholder="Nhập email" onChangeText={email => setEmail(email)} defaultValue={email} />
                    </Input>
                  </VStack>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="outline"
                  size="sm"
                  action="secondary"
                  mr="$3"
                  onPress={() => {
                    setAddUserList(false);
                    setEmail("");
                  }}
                >
                  <ButtonText>Hủy</ButtonText>
                </Button>
                <Button
                  bgColor={colors.secondary_500}
                  size="sm"
                  action="positive"
                  borderWidth="$0"
                  onPress={() => {
                    handleSendEmailRequest()
                  }}
                >
                  <ButtonText>Thêm</ButtonText>
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

        </View>
      </View>

    </SafeAreaView>
  );
}

interface IBlock extends ViewProps {
  children?: React.ReactNode;
}

const Block = ({ children, ...props }: IBlock) => {
  return <View {...props}>{children}</View>
}

const seperatorStyle: ViewStyle = {
  height: 1,
  width: "100%",
  backgroundColor: "#CBD5E1",
}

const Seperator = () => <View style={seperatorStyle} />;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
  },

  title: {
    width: "90%",
    height: "7%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  body: {
    width: "90%",
    height: "93%"
  },

  userList: {
    width: "100%",
    height: "85%",
    // backgroundColor: "red",
  },

  userManagedList: {
    width: "100%",
    // height: "60%",
    marginVertical: "3%",
    // backgroundColor: "pink",
  },

  userItem: {
    width: "100%",
    height: 65,
    borderRadius: 15,
    backgroundColor: "white",
    borderColor: "#CBD5E1",
    borderWidth: 1,
    // flex: 1,
  },

  topUserItem: {
    height: "50%",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: "5%",
    //     backgroundColor: "lightblue"
  },

  bottomUserItem: {
    height: "40%",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: "5%",
    //     backgroundColor: "pink"
  },

  buttonDetail: {
    padding: "2%",
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary_500,
    borderRadius: 15
  },

  loading: {
    height: "7%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "yellow",
  },

  groupButton: {
    alignSelf: "flex-end",
    height: 55,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "green",
  },

  buttonLeft: {
    padding: "2%",
    // alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary_500,
    borderRadius: 15,
  },

  buttonRight: {
    padding: "2%",
    // alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary_500,
    borderRadius: 15
  },

  block: {
    //     backgroundColor: "red"
  },

  button: {
    marginTop: 10,
    padding: "2%",
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary_500,
    borderRadius: 15
  },
});