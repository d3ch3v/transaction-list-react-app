import { useState } from "react"
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContex'
import { useEffect } from "react"

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName) => {
        setError(null)
        setIsPending(false)

        try {
            //sign up user
            const response = await projectAuth.createUserWithEmailAndPassword(email, password)

            //if response is null and it does not work, that's why I need this check
            if (!response) {
                throw new Error('Could not complete signup')
            }

            //add display name to user
            await response.user.updateProfile({ displayName })

            // dispatch login action
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

    return { error, isPending, signup }
}