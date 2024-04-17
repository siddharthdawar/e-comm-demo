import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';
import {Button} from '../button/button.component';
import {FormInput} from '../form-input/form-input.component';
import {useState} from 'react';
import './sign-up-form.styles.scss';

const defaultFormFields = {
    confirmPassword: '',
    displayName: '',
    email: '',
    password: ''
};

export const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {confirmPassword, displayName, email, password} = formFields;

    const onChange = (event) => {
        const {name, value} = event.target;

        setFormFields({
            ...formFields,
            [name]: value
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords don\'t match');

            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, {displayName});
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                throw new Error(error);
            }
        } finally {
            // setFormFields(defaultFormFields);
        }
    };

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={onSubmit}>
                <FormInput
                    label='Display Name'
                    name='displayName'
                    onChange={onChange}
                    required
                    type='text'
                    value={displayName}
                />
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
                <FormInput
                    label='Confirm Password'
                    name='confirmPassword'
                    onChange={onChange}
                    required
                    type='password'
                    value={confirmPassword}
                />
                <Button>Sign Up</Button>
            </form>
        </div>
    );
};
