import { createStackNavigator } from "@react-navigation/stack";
import Signup from "./signup";
import Login from "./login";
import ChatbaseComponent from "../main/mainPage";
import SidebarNavigator from "../main/sidebarNavigator";
import ForgotPs from "./forgotps";
import Test from "./test";

const SignUp=createStackNavigator();

const SignUpNavigator=()=>
{
    
    return (
        <SignUp.Navigator screenOptions={{headerShown:false}} initialRouteName="Login">
            <SignUp.Screen name="SignUp" component={Signup}/>
            <SignUp.Screen name="Login"  component={Login} />
            <SignUp.Screen name="ForgotPs" component={ForgotPs} /> 
            {/* <SignUp.Screen name="chat"   component={ChatbaseComponent}/> */}
            {/* <SignUp.Screen name="chat"   component={SidebarNavigator}/> */}
            {/* <SignUp.Screen name="test"   component={Test}/> */}
        </SignUp.Navigator>
    )
}
export default SignUpNavigator;