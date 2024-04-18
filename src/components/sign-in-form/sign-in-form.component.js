import {
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup
} from '../../utils/firebase/firebase.utils';
import {Button} from '../button/button.component';
import {FormInput} from '../form-input/form-input.component';
import {useState} from 'react';
import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: ''
};

export const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const onChange = (event) => {
        const {name, value} = event.target;

        setFormFields({
            ...formFields,
            [name]: value
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);

            setFormFields(defaultFormFields);
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    throw new Error(error);
            }
        }
    };

    const onSignInWithGooglePopup = async () => {
        await signInWithGooglePopup();
    };

    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={onSubmit}>
                <FormInput
                    label='Email'
                    name='email'
                    onChange={onChange}
                    required
                    type='email'
                    value={email}
                />
                <FormInput
                    label='Password'
                    name='password'
                    onChange={onChange}
                    required
                    type='password'
                    value={password}
                />
                <div className='buttons-container'>
                    <Button>Sign In</Button>
                    <Button
                        buttonType='google'
                        onClick={onSignInWithGooglePopup}
                        type='button' // buttons are of submit type by default. This prevents form from being submitted in this case
                    >
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    );
};
