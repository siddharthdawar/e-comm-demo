import {
    CartDropdownContainer,
    CartItems,
    EmptyMessage
} from './cart-dropdown.styles';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import {Button} from '../button/button.component';
import {CartItem} from '../cart-item/cart-item.component';
import {selectCartItems} from '../../store/cart/cart.selector';
import {setIsCartOpen} from '../../store/cart/cart.action';
import {useNavigate} from 'react-router-dom';
import './cart-dropdown.styles';

export const CartDropdown = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const onGoToCheckoutClick = () => {
        navigate('/checkout');

        dispatch(setIsCartOpen());
    };

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ?
                        cartItems.map(cartItem =>
                            <CartItem
                                cartItem={cartItem}
                                key={cartItem.id}
                            />) :
                        <EmptyMessage>
                            Your cart is empty
                        </EmptyMessage>
                }
            </CartItems>
            <Button onClick={onGoToCheckoutClick}>
                GO TO CHECKOUT
            </Button>
        </CartDropdownContainer>
    );
};
