import React from 'react';
import Image from 'next/image';
import { auth, db } from '../../Firebase/firebase-config'; // Ensure db (Firestore) is configured
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Import Firestore methods
import GoogleIcon from '../../Assets/images/google.png';

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
            photoURL: user.photoURL,
            completedMultistep: false,
        });
    };

    const handleSignin = async (providerName) => {
        if (providerName === "google") {
            const provider = new GoogleAuthProvider();
            try {
                const result = await signInWithPopup(auth, provider);
                const user = result.user;
                const idToken = await user.getIdToken();

                // Check if user exists in Firestore
                const userRef = await checkIfNewUser(user.uid);

                if (userRef.exists()) {
                    const userData = userRef.data();
                    if (userData.completedMultistep) {
                        await signIn("google", {
                            idToken,
                            callbackUrl: '/dashboard',
                        });
                        router.push('/dashboard');
                    } else {
                        await signIn("google", {
                            idToken,
                            callbackUrl: '/multistep',
                        });
                        router.push('/multistep');
                    }
                } else {
                
                    await createNewUser(user);
                    await signIn("google", {
                        idToken,
                        callbackUrl: '/multistep',
                    });
                    router.push('/multistep');
                }

            } catch (error) {
                console.error("Error signing in: ", error.message);
            }
        }
    };

    return (
        <div>
            {providers.map((item, index) => (
                <button
                    onClick={() => handleSignin(item.name)}
                    key={index}
                    className='flex flex-row items-center justify-center gap-6 text-xl font-bold bg-violet-400 rounded shadow-2xl w-[24rem] h-14'>
                    {item.displayName}
                    <Image src={item.icon} height={30} width={30} alt='Google icon' />
                </button>
            ))}
        </div>
    );
};

export default LoginProvider;
