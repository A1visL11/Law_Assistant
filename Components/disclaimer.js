// DisclaimerModal.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import CustomButton from './Button';

const DisclaimerModal = ({ isVisible, onAgree }) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Disclaimer</Text>
        <Text style={styles.message}>
          The chatbot answers are only suggestions and should not be considered legal advice. 
          Please consult with a professional for any legal matters.
        </Text>
        <CustomButton
            onPress={onAgree}
            style={styles.button}
            title={'I Agree'}
            titleColor={'white'}
            titleSize={16}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#777777',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf:'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DisclaimerModal;