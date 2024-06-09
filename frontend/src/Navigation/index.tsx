
import { AuthContext } from "@/Context/AuthProvider";
import { UserNavigator } from "./UserNavigator";
import { useContext } from "react";
import { AdminNavigator } from "./AdminNavigator";
import { AuthNavigator } from "./AuthNavigator";

const BottomNavigator = () => {
  const {loggedIn, profile} = useContext(AuthContext)
  const isSupervisor = profile?.roles === "supervisor";

  if(!loggedIn){
    // console.log("catch auth navigation");
    return <AuthNavigator />;
  } 
  
  if(isSupervisor){
    // console.log("catch admin navigation");
    return <AdminNavigator />;
  } 
  if(!isSupervisor){
    // console.log("catch user navigation");
    return <UserNavigator />;
  } 
}

export default BottomNavigator;