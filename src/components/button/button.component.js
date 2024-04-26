import {
    BaseButton,
    ButtonSpinner,
    GoogleSignInButton,
    InvertedButton
} from './button.styles';

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted'
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton
}[buttonType]);

export const Button = ({buttonType, children, isLoading, ...otherProps}) => {
    const CustomButton = getButton(buttonType);

    return (
        <CustomButton
            disabled={isLoading}
            {...otherProps}
        >
            {isLoading ?
                <ButtonSpinner/> :
                children
            }
        </CustomButton>
    );
}
