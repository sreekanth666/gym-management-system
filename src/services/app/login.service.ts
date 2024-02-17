import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../firebase/setup";
import { SUCCESS_MESSAGE } from "../../constants/success.constants";
import { ERROR_MESSAGE } from "../../constants/error.constant";

export const loginService = async (email: string, password: string) => {
    try {
        const querySnapshot = await getDocs(
            query(collection(database, "users"), where("email", "==", email))
        );
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            console.log(userData);
            
            if (userData.password === password) {
                return { success: true, message: SUCCESS_MESSAGE.DATA_FETCH, data: userData };
            } else {
                return { success: false, message: ERROR_MESSAGE.INVALID_CRED, data: [] };
            }
        } else {
            return { success: false, message: ERROR_MESSAGE.INVALID_CRED, data: [] };
        }
    } catch (error) {
        throw error
    }
};
