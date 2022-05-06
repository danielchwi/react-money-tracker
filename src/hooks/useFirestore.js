import { useReducer, useState, useEffect } from "react"
import { projectFirestore, timestamp } from "../firebase/config"


const firestoreReducer = (state, action) => {
    switch (action.type){
        case 'IS_PENDING':
            return {document: null, isPending: true, error: null, success: null}
        case 'ERROR':
            return { document: null, isPending: false, error: action.payload, success: false }
        case 'ADDED_DOCUMENT':
            return { document: action.payload, isPending: false, error: null, success: true }
        case 'DELETE_DOCUMENT':
            return { document: null, isPending: false, error: null, success: true }
        default:
            return state
    }
}

const initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}


export const useFirestore = (collection) => {

    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCanceled, setIsCanceled] = useState(false)
    const ref = projectFirestore.collection(collection)

    const dispatchIfNotCanceled = (action) => {
        if(!isCanceled){
            dispatch(action)
        }
    }

    const addDocument = async doc => {
        dispatch({ type:'IS_PENDING' })

        try {
            const createdAt = timestamp.fromDate(new Date())
            const addedDocument = await ref.add({ ...doc, createdAt })
            dispatchIfNotCanceled({ type: "ADDED_DOCUMENT", payload: addedDocument })
        } catch (err) {
            console.log(err)
            dispatchIfNotCanceled({ type: "ERROR", payload:"Could not save document" })
        }
    }

    const deleteDocument = id => {
        
        try {
            ref.doc(id).delete()
            dispatchIfNotCanceled({ type: "DELETE_DOCUMENT" })
        } catch (err) {
            console.log(err)
            dispatchIfNotCanceled({ type: "ERROR", payload:"Could not delete document" })
        }
    }

    useEffect(()=>{
        return () => setIsCanceled(true)
    }, [])


    return {addDocument, deleteDocument, response}
}