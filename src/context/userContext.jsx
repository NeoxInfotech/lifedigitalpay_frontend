import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { server } from "../main";


export const UserContext = createContext();



export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const getUser = async () => {
        try {
            const res = await axios.get(`${server}/auth/refetch`, { withCredentials: true })
            setUser(res?.data.user)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getUser();
    }, [])



    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}