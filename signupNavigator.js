import { createStackNavigator } from "@react-navigation/stack";
import Signup from "./signup";
import Login from "./login";
import ChatbaseComponent from "../main/mainPage";

const SignUp=createStackNavigator();

const SignUpNavigator=()=>
{
    
    return (
        <SignUp.Navigator screenOptions={{headerShown:false}} initialRouteName="Login">
            <SignUp.Screen name="SignUp" component={Signup}/>
            <SignUp.Screen name="Login"  component={Login} />
            <SignUp.Screen name="chat"   component={ChatbaseComponent}/>
        </SignUp.Navigator>
    )
}
export default SignUpNavigator;