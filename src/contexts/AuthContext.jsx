/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()


// eslint-disable-next-line react/prop-types
const AuthContextProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('token') || null);

    useEffect(() => {
        if (token) localStorage.setItem('token', token)
    }, [token]);

    return <AuthContext.Provider value={{ token, setToken }} >{children}</AuthContext.Provider>
}

export default AuthContextProvider