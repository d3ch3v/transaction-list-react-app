import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const contex = useContext(AuthContext)


    if (!contex) {
        throw new Error('useAuthContext must be inside and AuthContextProvider')
    }

    return contex
}