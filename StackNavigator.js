import { createStackNavigator } from "@react-navigation/stack";
import SignUpNavigator from "../signup/signupNavigator";
import { useState } from "react";
import MainPage from "./mainPage";
import useAuth from "../hooks/useAuth";
import Setting from "./setting";

const Stack = createStackNavigator();

const StackNavigator = () => {
    const {user} = useAuth()
    // const auth = true;
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            {user ?
                <>
                    <Stack.Screen name="MainPage" component={MainPage}/>
                    <Stack.Screen name="Setting" component={Setting}/>
                </>
                :
                <Stack.Screen name="login_signup" component={SignUpNavigator} />
            }

        </Stack.Navigator>
    )
}

export default StackNavigator;