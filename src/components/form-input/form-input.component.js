import {
    FormInputLabel,
    Group,
    Input
} from './form-input.styles';

export const FormInput = ({label, ...otherProps}) =>
    <Group>
        <Input {...otherProps}/>
        {label &&
            <FormInputLabel shrink={otherProps.value.length}>{label}</FormInputLabel>
        }
    </Group>;
