import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB6GybsTAIPGowWRFgxSB_305HB5dA5Jws",
    authDomain: "gms-gym-management-system.firebaseapp.com",
    projectId: "gms-gym-management-system",
    storageBucket: "gms-gym-management-system.appspot.com",
    messagingSenderId: "198228393353",
    appId: "1:198228393353:web:3fcd2d7b0d853a63013558",
    measurementId: "G-FB9QJNPJ3L"
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
