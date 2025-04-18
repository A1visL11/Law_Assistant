import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useAuth from '../hooks/useAuth';
import { colorList } from './colorList';

const screen = Dimensions.get('window');

const CustomDrawerContent = (props) => {
    const { user, setUser } = useAuth(); // Use object destructuring

    const handlePress = () => {
        setUser(null)
    };
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView style={styles.drawerBody} {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View style={[styles.otherOptions]}>
                <TouchableOpacity onPress={handlePress} style={styles.touchable}>
                    <Icon name="logout" size={23} color="#f6f6f6" />
                    <Text style={styles.logoutText}>Log out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    drawerBody: {
        backgroundColor: "black",
    },
    otherOptions: {
        backgroundColor: 'black',
        padding: screen.width * 0.035,
        paddingBottom: screen.width * 0.05,
    },
    touchable: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius:20,
    },
    logoutText: {
        color: 'white',
        fontSize: 19,
        marginLeft: 10,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 8,
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CustomDrawerContent;
