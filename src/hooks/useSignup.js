import { useState } from 'react'
import { projectAuth } from '../firebase/config'


export const useSignup = () => {
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    const signup = async ({ email, password, displayName }) => {
        setIsPending(true)
        setError(null)
        console.log({email, password, displayName})

        try{
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)
            console.log(res.user)
    
            if (!res){
                throw new Error('Could not complete signup')
            }
    
            await res.user.updateProfile({ displayName })
    
            setIsPending(false)
            setError(null)

        } catch(err){
            setIsPending(false)
            setError(err.message)
            console.log(err)
        }

    }

    return { error, isPending, signup }
}