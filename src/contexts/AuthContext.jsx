import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
    token: null
})


const AuthContextProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('token') || null);

    useEffect(() => {
        localStorage.setItem('token', token)
    }, [token]);

    return <AuthContext.Provider>{children}</AuthContext.Provider>
}

export default AuthContextProvider