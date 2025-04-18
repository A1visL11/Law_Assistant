import { View, Text, TouchableWithoutFeedback, SafeAreaView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const LoginSignupBackground = ({child}) => {
    return (
        <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        >
            <LinearGradient
            colors={['#C5BEBE', '#C5BEBE']}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 0.7 }}
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            >
                <SafeAreaView>
                    <KeyboardAvoidingView 
                        behavior={Platform.OS === "ios" ? 'padding' : 'height'} 
                        style={{ flex: 1, justifyContent: 'center' }}
                    >
                        {child}
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </LinearGradient>
        </TouchableWithoutFeedback>
    )
}

export default LoginSignupBackground

