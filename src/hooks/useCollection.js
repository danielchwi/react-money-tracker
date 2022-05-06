import { useState, useEffect } from "react"
import { projectFirestore } from "../firebase/config"

export const useCollection = (collection) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const ref = projectFirestore.collection(collection)
        
        const unsub = ref.onSnapshot(snapshoot => {
            const result = snapshoot.docs.map((doc)=>{return { ...doc.data(), id: doc.id }})
            setDocument(result)
            setError(null)
        }, err => {
            setDocument(null)
            setError(err.message)
        })

        return () => unsub()

    }, [collection])



    return {document, error}
}