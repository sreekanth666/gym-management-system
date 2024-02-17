import { collection, getDocs, query, where } from "firebase/firestore"
import { database } from "../../firebase/setup"
import { ERROR_MESSAGE } from "../../../constants/error.constant"

export const getDocService = async(id: string, dbRef: string) => {
    try {
        const querySnapshot = await getDocs(
            query(collection(database, dbRef), where("id", "==", id))
        )
        if (querySnapshot.empty) {
            return ERROR_MESSAGE.NO_DATA
        } else {
            return querySnapshot.docs[0].data
        }
    } catch (error) {
        throw error
    }
}