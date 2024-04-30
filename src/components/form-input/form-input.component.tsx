import {
    FormInputLabel,
    Group,
    Input
} from './form-input.styles';
import React, {InputHTMLAttributes} from 'react';

type FormInputProps = {
    label: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormInput: React.FC<FormInputProps> = ({label, ...otherProps}) =>
    <Group>
        <Input {...otherProps}/>
        {label &&
            <FormInputLabel shrink={Boolean(otherProps.value && typeof otherProps.value === 'string' && otherProps.value.length)}>
                {label}
            </FormInputLabel>
        }
    </Group>;
