import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons, FontAwesome6 } from '@expo/vector-icons'

const CustomButton = ({ onPress = () => { }, pack, style, title, titleSize, titleColor, icon, iconPaddingLeft }) => {
  return (
    <TouchableOpacity
      style={[{ alignSelf: 'start' }, style]}
      onPress={onPress}
    >
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        {icon !== undefined &&
          <View style={{ paddingRight: iconPaddingLeft, justifyContent: 'center', alignItems: 'center' }}>
            {pack == "Ionicon" ?
              <Ionicons name={icon} style={{ fontSize: titleSize, textAlign: 'center', color: titleColor }} />
              :
              <FontAwesome6 name={icon} style={{ fontSize: titleSize, textAlign: 'center', color: titleColor }} />
            }
          </View>
        }
        <Text style={{ fontSize: titleSize, textAlign: 'center', alignSelf: 'center', color: titleColor }}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default CustomButton