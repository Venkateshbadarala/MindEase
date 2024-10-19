import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { auth } from "../../../Firebase/firebase-config"; // Ensure this path is correct
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// NextAuth options
export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", // Redirect to custom login page
  },
  debug: true, // Enable debug mode
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Please enter both email and password");
        }

        try {
          // Sign in with email and password
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );

          const user = userCredential.user;

          const user1 = auth.currentUser;
          console.log(user1,"user Auth")

          // Get Firestore user data
          const db = getFirestore(auth); // Pass auth to getFirestore
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();

            // Log current user
            console.log("Current User after sign in:", auth.currentUser);

            return {
              id: user.uid,
              name: userData.name || user.displayName || "Anonymous", 
              email: user.email,
              image: userData.image || user.photoURL || null, 
              provider: 'credentials', 
            };
          } else {
            throw new Error("User not found in the database");
          }
        } catch (error) {
          console.error("Error during authorization:", error);
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.provider = user.provider; 
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name || "Anonymous",
        email: token.email,
        image: token.image,
        provider: token.provider,
      };
      return session;
    },
  },
};

// Handler for NextAuth
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
