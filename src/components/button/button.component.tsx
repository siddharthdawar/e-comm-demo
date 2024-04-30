import {
    BaseButton,
    ButtonSpinner,
    GoogleSignInButton,
    InvertedButton
} from './button.styles';
import React, {ButtonHTMLAttributes} from 'react';

export enum BUTTON_TYPE_CLASSES {
    base = 'base',
    google = 'google-sign-in',
    inverted = 'inverted'
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton => ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton
}[buttonType]);

// FC type already extends "children" as a part of its prop definition, so no need to add children type
type ButtonProps = {
    buttonType?: BUTTON_TYPE_CLASSES;
    isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({buttonType, children, isLoading, ...otherProps}) => {
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
