﻿import { View, Text } from 'react-native'
import React, { createContext, useContext, useState} from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [user, setUser]= useState(null)
    return (
        <AuthContext.Provider value={{ user,setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
export default function useAuth() {
    return useContext(AuthContext);
}