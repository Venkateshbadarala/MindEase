// Use these functions in your components
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
};

const logout = async () => {
    await signOut(auth);
};
