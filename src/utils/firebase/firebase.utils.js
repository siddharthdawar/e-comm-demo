// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    // signInWithRedirect,
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

// Firestore hierarchy
// Database
//      |__Collection (e.g. "users")
//      |       |__Document (e.g. "a user")
//      |       |__Document (e.g. "another user")
//      |
//      |__Another Collection
//              |__Another Document

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAcW8FwPk6gtCBT-sQHDSHUbbbPTnqOhUU",
    authDomain: "e-comm-demo-74767.firebaseapp.com",
    projectId: "e-comm-demo-74767",
    storageBucket: "e-comm-demo-74767.appspot.com",
    messagingSenderId: "131812925703",
    appId: "1:131812925703:web:f779fd7d91a682f396e5a2"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
   prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    // userSnapshot.exists() checks if user (document) already exists in the collection (users)

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                createdAt,
                displayName,
                email,
                ...additionalInfo // In case user does not use any provider like Google, Facebook etc. (no display name in that case)
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) =>
    await createUserWithEmailAndPassword(auth, email, password);

export const signInAuthUserWithEmailAndPassword = async (email, password) =>
    await signInWithEmailAndPassword(auth, email, password);

export const signOutUser = async () =>
    await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
    onAuthStateChanged(auth, callback);
