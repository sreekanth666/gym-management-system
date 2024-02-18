import { doc, updateDoc } from "firebase/firestore";
import { database } from "../../firebase/setup";
import { SUCCESS_MESSAGE } from "../../../constants/success.constants";

export const partialUpdateDocService = async (docId: string, newData: object, dbRef: string) => {
    
    try {
        const docRef = doc(database, dbRef, docId);
        await updateDoc(docRef, newData);
        return {success: true, message: SUCCESS_MESSAGE.DEFAULT};
    } catch (error) {
        throw error;
    }
}
