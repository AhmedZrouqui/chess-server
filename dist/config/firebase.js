import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
require("dotenv").config();
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "chess-a0430.firebaseapp.com",
    databaseURL: "https://chess-a0430-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chess-a0430",
    storageBucket: "chess-a0430.appspot.com",
    messagingSenderId: "608242519460",
    appId: "1:608242519460:web:c404cd90d49afebb5d8531",
    measurementId: "G-65YDT5P1BW",
};
const app = initializeApp(firebaseConfig);
export default getFirestore(app);
//# sourceMappingURL=firebase.js.map