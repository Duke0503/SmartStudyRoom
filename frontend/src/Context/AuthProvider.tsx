import { Login } from "@/Screens/Login/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FC, createContext, useEffect, useState } from "react";


type profile = {
  name: String, 
  email: String, 
  id: Number,
  birthday: Date,
  phone_number: String,
  gender: String,
  roles: String,
  supervisor: Number,
}

interface AuthState {
  loggedIn: boolean;
  profile: profile | null;
  busy? : boolean;
}

interface Prop {
  children: React.ReactNode;
}

interface AuthContext extends AuthState {
  updateAuthState(state: AuthState): void;
}

export const AuthContext = createContext<AuthContext>({
  loggedIn: false,
  profile: null,
  updateAuthState: () => {}
});

const AuthProvider: FC<Prop> = ({children}) => {
  const [authState, setAuthState] = useState<AuthState>({
    loggedIn: false,
    profile: null,
    busy: true,
  });

  const updateAuthState = (state: AuthState) => {
    setAuthState({...state});
    // console.log("profile after updateAuthState: ", state.profile);
  };

  const getAuthState = async () => {
    const token = await AsyncStorage.getItem("token");
    if(!token) return updateAuthState({...authState, busy: false});
  }
  useEffect( () => {
    getAuthState();
  }, []);

  return( 
    <AuthContext.Provider 
      value={{
        ...authState,
        updateAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
};

export default AuthProvider;