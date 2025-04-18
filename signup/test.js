import { View, Text } from 'react-native'
import React from 'react'
import LoginSignupBackground from '../Components/backgrounds'

const Test = () => {
  return (
    <LoginSignupBackground>
        <View style={{zIndex:100}}>
            <Text>Test</Text>
        </View>
    </LoginSignupBackground>
  )
}

export default Test