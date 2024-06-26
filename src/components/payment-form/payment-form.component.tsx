import {
    CardElement,
    useElements,
    useStripe
} from '@stripe/react-stripe-js';
import {
    FormContainer,
    PaymentButton,
    PaymentFormContainer
} from './payment-form.styles';
import {
    FormEvent,
    useState
} from 'react';
import {BUTTON_TYPE_CLASSES} from '../button/button.component';
import {StripeCardElement} from '@stripe/stripe-js';
import {selectCartTotal} from '../../store/cart/cart.selector';
import {selectCurrentUser} from '../../store/user/user.selector';
import {useSelector} from 'react-redux';

// "card is StripeCardElement" means that if the function returns true, card MUST BE of type StripeCardElement
const isValidCartElement = (card: StripeCardElement | null): card is StripeCardElement =>
    card !== null;

export const PaymentForm = () => {
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);

    // hooks provided by stripe
    const stripe = useStripe();
    const elements = useElements();

    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessingPayment(true);

        // payment intent backend request (to tell stripe that a payment is coming)
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            body: JSON.stringify({amount: amount * 100}), // amount is in cents
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

        // this client secret is sent by stripe to be included with the actual payment call
        // so that stripe knows that the payment is coming from a genuine source
        const {client_secret} = response.paymentIntent;
        const card = elements.getElement(CardElement);

        if (!isValidCartElement(card)) {
            return;
        }

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest'
                },
                card
            }
        });

        setIsProcessingPayment(false);

        if (paymentResult.error) {
            alert(paymentResult.error);
        } else if (paymentResult.paymentIntent.status === 'succeeded') {
            alert('Payment successful');

        }
    };

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}> {/* CardElement allows the whole form to be submitted as is */}
                <h2>Credit Card Payment: </h2>
                <CardElement/>
                <PaymentButton
                    buttonType={BUTTON_TYPE_CLASSES.inverted}
                    isLoading={isProcessingPayment}
                >
                    Pay now
                </PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    );
};
