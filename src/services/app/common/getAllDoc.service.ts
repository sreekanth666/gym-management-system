import { collection, getDocs } from "firebase/firestore"
import { database } from "../../firebase/setup"
import { ERROR_MESSAGE } from "../../../constants/error.constant"

export const getAllDocsService = async (dbRef: string) => {
    try {
        const querySnapshot = await getDocs(collection(database, dbRef));
        if (querySnapshot.empty) {
            return ERROR_MESSAGE.NO_DATA;
        } else {
            const docsData = querySnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            });
            return docsData;
        }
    } catch (error) {
        throw error;
    }
}
