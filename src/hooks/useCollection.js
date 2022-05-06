import { useState, useEffect, useRef } from "react"
import { projectFirestore } from "../firebase/config"

export const useCollection = (collection, _query, _orderBy) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)
    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

    useEffect(()=>{
        let ref = projectFirestore.collection(collection)

        if (query){
            ref = ref.where(...query)
        }
        if (orderBy){
            ref = ref.orderBy(...orderBy)
        }
        
        const unsub = ref.onSnapshot(snapshoot => {
            const result = snapshoot.docs.map((doc)=>{return { ...doc.data(), id: doc.id }})
            setDocument(result)
            setError(null)
        }, err => {
            console.log(err)
            setDocument(null)
            setError("Could not get data snapshoot")
        })

        return () => unsub()

    }, [collection, query, orderBy])



    return {document, error}
}