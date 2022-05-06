import { useState, useEffect } from "react"
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [isCanceled, setIsCanceled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const authContext = useAuthContext()

    const login = async ({ email, password }) => {
        setIsPending(true)
        setError(null)

        try{
            const res = await projectAuth.signInWithEmailAndPassword(email, password)

            if (!res){
                throw new Error('Could not complete login')
            }

            authContext.dispatch({ type:'LOGIN', payload:res.user })

            if(!isCanceled){
                setIsPending(false)
                setError(null)
            }
        }
        catch(err){
            if(!isCanceled){
                console.log(err)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(()=>{
        return () => {setIsCanceled(true)}
    }, [])

    return ({ login, isPending, error })
}