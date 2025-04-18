import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import React, { useState, forwardRef } from 'react';
import { colorList } from './colorList';

const screen = Dimensions.get('window');

const InputBox = forwardRef(({ onChangeText = () => { }, ...props }, ref) => {
  const [focus, setFocus] = useState(false);

  return (
    <View style={[styles.container, focus && { borderColor: colorList.black }]}>
      <TextInput
        style={styles.input}
        onFocus={() => {
          setFocus(true);
        }}
        onChangeText={onChangeText}
        ref={ref}
        {...props}
      />
    </View>
  );
});

export default InputBox;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: colorList.ghostWhite,
    borderColor: 'rgba(0, 0, 0, .1)',
    borderWidth: 1.5,
    borderRadius: 500,
    paddingHorizontal: 10,
    width: screen.width * 0.7,
    height: screen.height * 0.05,
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    justifyContent: 'center',
  },
});