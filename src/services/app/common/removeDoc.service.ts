import { doc, deleteDoc } from "firebase/firestore";
import { database } from "../../firebase/setup";
import { SUCCESS_MESSAGE } from "../../../constants/success.constants";

export const deleteDocService = async (docId: string, dbRef: string) => {
    try {
        const docRef = doc(database, dbRef, docId);
        await deleteDoc(docRef);
        return {success: true, message: SUCCESS_MESSAGE.DEFAULT};
    } catch (error) {
        throw error;
    }
}
