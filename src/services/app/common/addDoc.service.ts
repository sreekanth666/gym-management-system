import { addDoc, collection } from "firebase/firestore"
import { database } from "../../firebase/setup"
import { SUCCESS_MESSAGE } from "../../../constants/success.constants"

export const addDocService = async(data: any, dbRef: string) => {
    try {
        const documentRef = collection(database, dbRef)
        await addDoc(documentRef, data)
        return {success: true, message: SUCCESS_MESSAGE.DEFAULT}
    } catch (error) {
        throw error
    }
}