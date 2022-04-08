import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDKCv7h7Ywst_QJnVrKLEhn2gSI6zHMC8I",
    authDomain: "tech-geeks-auth.firebaseapp.com",
    projectId: "tech-geeks-auth",
    storageBucket: "tech-geeks-auth.appspot.com",
    messagingSenderId: "730277037219",
    appId: "1:730277037219:web:7a7f770c3de64227e1eb16"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth }
export default app;