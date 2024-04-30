import {
    AuthError,
    AuthErrorCodes
} from 'firebase/auth';
import {
    Button,
    BUTTON_TYPE_CLASSES
} from '../button/button.component';
import {
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup
} from '../../utils/firebase/firebase.utils';
import {FormInput} from '../form-input/form-input.component';
import {
    ChangeEvent,
    FormEvent,
    useState
} from 'react';
import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: ''
};

export const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setFormFields({
            ...formFields,
            [name]: value
        });
    };

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);

            setFormFields(defaultFormFields);
        } catch (error: unknown) {
            switch ((error as AuthError).code) {
                case AuthErrorCodes.INVALID_PASSWORD:
                    alert('incorrect password for email');
                    break;
                case AuthErrorCodes.USER_DELETED:
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
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
                        buttonType={BUTTON_TYPE_CLASSES.google}
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
