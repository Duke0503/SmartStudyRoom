
import { AuthContext } from "@/Context/AuthProvider";
import { UserNavigator } from "./UserNavigator";
import { useContext } from "react";
import { AdminNavigator } from "./AdminNavigator";
import { AuthNavigator } from "./AuthNavigator";
import { View } from "@gluestack-ui/themed";
import SRegular from "@/Components/texts/SRegular";

const BottomNavigator = () => {
  const {loggedIn, profile, busy} = useContext(AuthContext)
  const isSupervisor = profile?.roles === "supervisor";
  
  if(busy) 
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <SRegular>Loading...</SRegular>
      </View>
    );
    
  if(!loggedIn) return <AuthNavigator />;
  
  if(isSupervisor){
    // console.log("catch admin navigation");
    return <AdminNavigator />;
  } 
  
  if(!profile?.supervisor) return <UserNavigator />;
}

export default BottomNavigator;