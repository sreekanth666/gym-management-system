import { collection, addDoc } from "firebase/firestore"
import { database } from "../firebase/setup"
import { SUCCESS_MESSAGE } from "../../constants/success.constants"

export const userRegistrationService = async(userData: { email: string; name: string; password: string }) => {
    try {
        const documentRef = collection(database, 'users')
        await addDoc(documentRef, userData)
        return {success: true, message: SUCCESS_MESSAGE.REGISTER, data: []}
    } catch (error) {
        throw error
    }
}