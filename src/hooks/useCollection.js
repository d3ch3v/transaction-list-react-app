import { useState, useEffect, useRef } from "react"
import { projectFirestore } from "../firebase/config"

export const useCollection = (collection, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    // If I don't use useRef - > infinite loop in useEffect
    // _query is an array and is 'different' on every function call
    // .current is to take the value of the array
    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

    useEffect(() => {

        let ref = projectFirestore.collection(collection)

        if (query) {
            ref = ref.where(...query)
        }
        if (orderBy) {
            ref = ref.orderBy(...orderBy)
        }

        const unsubscribe = ref.onSnapshot((snapshot) => {
            let result = []
            snapshot.docs.forEach(doc => {
                result.push({ ...doc.data(), id: doc.id })
            })


            //update state
            setDocuments(result)
            setError(null)
        }, (error) => {
            console.log(error)
            setError('Could not fetch the data.')
        })


        //unsubscribe on unmount
        return () => unsubscribe()

    }, [collection, query, orderBy])

    return { documents, error, query, orderBy }
}