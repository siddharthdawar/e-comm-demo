// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    getAuth,
    // signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
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

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
   prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
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
                email
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    return userDocRef;
};
