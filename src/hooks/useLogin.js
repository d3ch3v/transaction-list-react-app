import { useEffect, useState } from "react"
import { useAuthContext } from "./useAuthContex"
import { projectAuth } from "../firebase/config"

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)


        //sign in user
        try {
            const response = await projectAuth.signInWithEmailAndPassword(email, password)
            //dispatch user login action
            dispatch({ type: 'LOGIN', payload: response.user })

            //update state
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }

        }
        catch (error) {
            if (!isCancelled) {
                console.log(error.message)
                setError(error.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { login, error, isPending }

}