import {Button} from '../button/button.component';
import styled from 'styled-components';

export const PaymentFormContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 300px;
    justify-content: center;
`;

export const FormContainer = styled.form`
    height: 100px;
    min-width: 500px;
`;

export const PaymentButton = styled(Button)`
    margin-left: auto;
    margin-top: 30px;
`;
