import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colorList } from './colorList'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
const screen = Dimensions.get('window');
const InputBox = ({ onChangeText = () => { }, ...props }) => {
  const [focus, setFocus] = useState(false)
  return (
    <View style={[styles.container, focus && { borderColor: colorList.lightBlue }]}>
      <TextInput
        style={styles.input}
        onFocus={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          setFocus(true)
        }}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  )
}

export default InputBox

const styles = StyleSheet.create({
  container:
  {
    backgroundColor: colorList.ghostWhite,
    borderColor: 'transparent',
    borderWidth: 1.5,
    borderRadius: 500,
    paddingHorizontal: 10,
    // paddingVertical:10,
    width: screen.width * 0.7,
    height: screen.height * 0.05,
    alignSelf: 'center',
    justifyContent:'space-between',
    // alignItems: 'center',
    flexDirection: 'row',
    // flexWrap:'wrap',
    // alignContent:'space-between'
  },
  iconWapper:
  {
    // backgroundColor:'red',
    justifyContent:'center',
    // alignSelf:'flex-end',
  },
  input:
  {
    // backgroundColor:'red',
    flex:1,
    justifyContent:'center',
  },
})