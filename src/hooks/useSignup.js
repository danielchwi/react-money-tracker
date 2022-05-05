import { useState, useEffect } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'


export const useSignup = () => {
    const [isCanceled, setIsCanceled] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const authContext = useAuthContext()

    const signup = async ({ email, password, displayName }) => {
        setIsPending(true)
        setError(null)
        console.log({email, password, displayName})

        try{
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)
    
            if (!res){
                throw new Error('Could not complete signup')
            }
    
            await res.user.updateProfile({ displayName })

            authContext.dispatch({ type: 'LOGIN', payload: res.user })
            
            if(!isCanceled){
                setIsPending(false)
                setError(null)
            }
        } catch(err){
            if(!isCanceled){
                setIsPending(false)
                setError(err.message)
                console.log(err)
            }
        }

    }

    useEffect(()=>{
        return () => {setIsCanceled(true)}
    }, [])

    return { error, isPending, signup }
}