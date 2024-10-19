import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Function to check if the user is new
export const checkIfNewUser = async (uid) => {
    const userDocRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists();  // Returns true if user exists
};

// Function to create a new user document
export const createNewUser = async (user) => {
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, {
        name: user.displayName,
        email: user.email,
        completedMultistep: false,
    });
};

// Function to update user document
export const updateUser = async (user) => {
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, {
        name: user.displayName,
        email: user.email,
        completedMultistep: true,
    }, { merge: true });

    const updatedUserDoc = await getDoc(userDocRef);
    return updatedUserDoc.data();
};

// Optional: Check the authentication state
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("User is signed in:", user);
        const isNewUser = await checkIfNewUser(user.uid);
        if (!isNewUser) {
            await createNewUser(user);
            console.log("New user created:", user);
        } else {
            console.log("User already exists:", user);
        }
    } else {
        console.log("No user is signed in.");
    }
});

export { auth, db, storage };
