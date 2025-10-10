import { createContext, useState, useContext } from "react";
import { register } from "./authApi";

export const AuthContext = createContext()

export function AuthProvider({children}){ 
    const [token, setToken] = useState(null)
    const [verified, setVerified] = useState(false)


    async function userRegister(username, password){
        try {
            const {token} = await signup(username, password)
            setToken(token);
            setVerified(false);
        } catch (error) {
            console.error("userRegister error",error)
        }
    }




    return <AuthContext.Provider value={5}>{children}</AuthContext.Provider>
}


export function useAuth(){
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be in <AuthProvider>")
    }
    return context
}