import { View, Text, StyleSheet,Image, SafeAreaView, Dimensions, Platform, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Appearance } from 'react-native'
import React, { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import CustomButton from '../Components/Button'
import InputWithCheck from '../Components/InputWithCheck';
import { colorList } from '../Components/colorList';
import { makeRedirectUri } from 'expo-auth-session'
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import {loginUser} from '../server/signup_function';
import useAuth from '../hooks/useAuth';
import { auth, googleAuthProvider } from '../signup//firebase'; // Adjust the path as per your project structure
/*import Toast from 'react-native-root-toast';*/
WebBrowser.maybeCompleteAuthSession();

/*import { signInWithPopup , FacebookAuthProvider } from 'firebase/auth';
function App(){


    const signInWithFacebook = ()=>{
        const provider = new FacebookAuthProvider();
        signInWithPopup(authentication,provider)
        .then((re)=>{
            console.log(re);
        })
        .catch((re)=>{
            console.log(err.message);
        })  
    }

    return(
        <View style={styles.container}>
        <CustomButton
            style={[styles.otherButton, { backgroundColor: "black" }]}
            titleSize={24}
            titleColor={colorList.ghostWhite}
            pack=""
            icon={'meta'}
            onPress={signInWithFacebook}
        />
    </View>
    );
}
*/
export const appleAuth = async () => {
    try {
        const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
        });
        // signed in
    }
    catch (e) {
        if (e.code === 'ERR_REQUEST_CANCELED') {
            console.log(e)
        }
        else {
            // handle other errors
        }
    }
}

