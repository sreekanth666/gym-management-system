import { doc, getDoc } from "firebase/firestore";
import { database } from "../../firebase/setup";
import { ERROR_MESSAGE } from "../../../constants/error.constant";

export const getDocService = async (id: string, dbRef: string) => {
    try {
        const docRef = doc(database, dbRef, id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return ERROR_MESSAGE.NO_DATA;
        } else {
            return docSnap.data();
        }
    } catch (error) {
        throw error;
    }
};
