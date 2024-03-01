'use client'
import { createContext, useState } from "react"
import React from "react";

interface AuthContextType {
    auth?: { email: string; jwtToken: string }; // Adjust based on what your auth state shape is
    setAuth: (authInfo: { email: string; jwtToken: string }) => void; // Define the function type
  }
  

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState({} as AuthContextType["auth"]);

    return (
            <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;