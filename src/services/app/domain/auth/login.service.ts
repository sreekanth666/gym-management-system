import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../../../firebase/setup";
import { SUCCESS_MESSAGE } from "../../../../constants/success.constants";
import { ERROR_MESSAGE } from "../../../../constants/error.constant";
import { DB } from "../../../../constants/db.constant";

export const loginService = async (email: string, password: string) => {
    try {
        const querySnapshot = await getDocs(
            query(collection(database, DB.USER), where("email", "==", email))
        );
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            const userId = userDoc.id;

            if (userData.password === password) {
                return { success: true, message: SUCCESS_MESSAGE.DATA_FETCH, data: { userId, ...userData } };
            } else {
                return { success: false, message: ERROR_MESSAGE.INVALID_CRED, data: [] };
            }
        } else {
            return { success: false, message: ERROR_MESSAGE.INVALID_CRED, data: [] };
        }
    } catch (error) {
        throw error;
    }
};
