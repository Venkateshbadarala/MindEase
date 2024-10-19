// FirebaseAdapter.js
import { getFirestore, doc, setDoc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";

const db = getFirestore();

const FirestoreAdapter = () => {
  return {
    async getUser(id) {
      const userDoc = await getDoc(doc(db, "users", id));
      return userDoc.exists() ? { id: userDoc.id, ...userDoc.data() } : null;
    },
    
    async getUserByEmail(email) {
      const userSnapshot = await db.collection("users").where("email", "==", email).get();
      return userSnapshot.docs.length > 0 ? { id: userSnapshot.docs[0].id, ...userSnapshot.docs[0].data() } : null;
    },
    
    async createUser(profile) {
      const userRef = doc(db, "users", profile.id);
      await setDoc(userRef, profile);
      return { id: profile.id, ...profile };
    },
    
    async updateUser(profile) {
      const userRef = doc(db, "users", profile.id);
      await updateDoc(userRef, profile);
      return { id: profile.id, ...profile };
    },
    
   
    // Method to listen for user updates
    listenForUserUpdates(userId, callback) {
      const userRef = doc(db, "users", userId);
      return onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          callback({ id: doc.id, ...doc.data() });
        } else {
          console.error("User not found");
        }
      });
    },
  };
};

export default FirestoreAdapter;
