import {
    // auth,
    // signInWithGoogleRedirect
} from '../../utils/firebase/firebase.utils';
import {SignUpForm} from '../../components/sign-up-form/sign-up-form.component';
import {SignInForm} from '../../components/sign-in-form/sign-in-form.component';
// import {getRedirectResult} from 'firebase/auth';
// import {useEffect} from 'react';
import './authentication.styles.scss';

export const Authentication = () => {
    /* useEffect(() => {
        const fetchRedirectResult = async () => {
            try {
                const response = await getRedirectResult(auth);

                if (response) {
                    await createUserDocumentFromAuth(response.user);
                }
            } catch (error) {
                throw new Error(error);
            }
        };

        fetchRedirectResult();
    }, []); */

    return (
        <div className='authentication-container'>
            {/* <button onClick={signInWithGoogleRedirect}>
                Sign in with Google redirect
            </button> */}
            <SignInForm/>
            <SignUpForm/>
        </div>
    );
};
