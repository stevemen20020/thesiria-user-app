import { UserEntity } from "@/src/Domain/Entities/User.Entity";
import { createContext, useState } from "react";


const UserInitialState:UserEntity = {
    user: {
        name:'',
        lastName:'',
        email:''
    }
}

export interface UserContextProps {
    user:UserEntity,
    fetchUserFromLocal: () => void,
    logOut: () => void,
    insertUserChanges: (user:UserEntity) => Promise<void>
}

export const UserContext = createContext({} as UserContextProps)

export const UserProvider = ({children}: any) => {
    const [user, setUser] = useState<UserEntity>(UserInitialState)

    const fetchUserFromLocal = async () => {
        //TODO add logic to fetch user from local
    }

    const insertUserChanges = async () => {
        //TODO add logic to modify user qualities from local
    }

    const logOut = async () => {
        //TODO add logic to log out
    }

    return (
        <UserContext.Provider value={{
            user,
            insertUserChanges,
            fetchUserFromLocal,
            logOut
        }}>
            {children}
        </UserContext.Provider>
    )
}