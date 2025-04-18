import { createStackNavigator } from "@react-navigation/stack";
import SignUpNavigator from "../signup/signupNavigator";
import { useContext, useState } from "react";
import MainPage from "./mainPage";
import useAuth, { AuthProvider } from "../hooks/useAuth";
import Setting from "./setting";
import SidebarNavigator from "./sidebarNavigator";
import ChatbaseComponent from "./mainPage";

const Stack = createStackNavigator();

const StackNavigator = () => {
    const {user, setUser} = useAuth()
    // const auth = true;
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            {user!==null ?
                <>
                    <Stack.Screen name="sidebar" component={SidebarNavigator}/>
                    {/* <Stack.Screen name="Chat" component={ChatbaseComponent}/> */}
                </>
                :
                <>
                    <Stack.Screen name="login_signup" component={SignUpNavigator} />
                </>
            }
        </Stack.Navigator>
    )
}

export default StackNavigator;