// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    NextOrObserver,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    User
} from 'firebase/auth';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    QueryDocumentSnapshot,
    setDoc
    // writeBatch
} from 'firebase/firestore';
import {Category} from '../../store/categories/category.types';

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

/*export type ObjectToAdd = {
    title: string;
};*/

/*export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
    collectionKey: string,
    objectsToAdd: T[]
): Promise<void> => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase());

        batch.set(docRef, object);
    });

    try {
        await batch.commit();
    } catch (error: any) {
        throw new Error(error);
    }
};*/

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc =>
        doc.data() as Category
    );
};

export type AdditionalInformation = {
    displayName?: string;
};

export type UserData = {
    createdAt: Date;
    displayName: string;
    email: string;
};

export const createUserDocumentFromAuth = async (
    userAuth: User,
    additionalInfo = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    // userSnapshot.exists() checks if user (document) already exists in the collection (users)

    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                createdAt,
                displayName,
                email,
                ...additionalInfo // In case user does not use any provider like Google, Facebook etc. (no display name in that case)
            });
        } catch (error: any) {
            throw new Error(error);
        }
    }

    return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) =>
    await createUserWithEmailAndPassword(auth, email, password);

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) =>
    await signInWithEmailAndPassword(auth, email, password);

export const signOutUser = async () =>
    await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
    onAuthStateChanged(auth, callback);
