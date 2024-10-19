"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, checkIfNewUser, db } from "../Firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (userCredential) => {
            if (userCredential) {
                const uid = userCredential.uid;
                const userExists = await checkIfNewUser(uid);
                if (userExists) {
                    const userDoc = await getDoc(doc(db, "users", uid));
                    setUser({ uid, ...userDoc.data() });
                }
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);