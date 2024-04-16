import {
    createUserDocumentFromAuth,
    signInWithGooglePopup
} from '../../utils/firebase/firebase.utils';

export const SignIn = () => {
    const onSignInWithGooglePopup = async () => {
        const {user} = await signInWithGooglePopup();

        await createUserDocumentFromAuth(user);
    };

    return (
        <div>
            <h1>SIGN IN VIEW</h1>
            <button onClick={onSignInWithGooglePopup}>
                Sign in with Google popup
            </button>
        </div>
    );
};
