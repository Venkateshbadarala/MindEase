// LoginProvider.js
import React from 'react';
import Image from 'next/image';
import { auth, db } from '../../Firebase/firebase-config'; // Ensure db (Firestore) is configured
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import GoogleIcon from '../../Assets/images/google.png';
import { useRouter } from 'next/navigation';

const providers = [
    {
        name: "google",
        displayName: "Continue with Google",
        icon: GoogleIcon,
    },
];

const LoginProvider = () => {
    const router = useRouter();

    const checkIfNewUser = async (uid) => {
        const userDoc = doc(db, "users", uid);
        const userRef = await getDoc(userDoc);
        return userRef;
    };

    const createNewUser = async (user) => {
        const userDoc = doc(db, "users", user.uid);
        await setDoc(userDoc, {
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            image: user.photoURL || "https://placehold.co/300x300.png", // Fallback image
        });
    };

    const handleSignin = async (providerName) => {
        if (providerName === "google") {
            const provider = new GoogleAuthProvider();
            try {
                const result = await signInWithPopup(auth, provider);
                const user = result.user;

                // Check if user exists in Firestore
                const userRef = await checkIfNewUser(user.uid);

                if (!userRef.exists()) {
                    await createNewUser(user);
                }

                router.push('/adminDashboard'); // Redirect to dashboard after login

            } catch (error) {
                console.error("Error signing in:", error.message);
            }
        }
    };

    return (
        <div>
            {providers.map((item, index) => (
                <button
                    onClick={() => handleSignin(item.name)}
                    key={index}
                    className='flex flex-row items-center justify-center gap-6 text-[15px] font-bold bg-violet-400 rounded shadow-2xl sm:w-[24rem] h-14 x-sm:w-[16rem]'>
                    {item.displayName}
                    <Image src={item.icon} height={30} width={30} alt='Google icon' />
                </button>
            ))}
        </div>
    );
};

export default LoginProvider;
