import { useState, useEffect } from "react"
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const [isCanceled, setIsCanceled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const authContext = useAuthContext()

    const logout = async () => {
        setIsPending(true)
        setError(null)

        try{
            await projectAuth.signOut()

            authContext.dispatch({ type:'LOGOUT' })

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

    return ({ logout, isPending, error })
}