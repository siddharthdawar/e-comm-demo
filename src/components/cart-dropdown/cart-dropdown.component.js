import {
    CartDropdownContainer,
    CartItems,
    EmptyMessage
} from './cart-dropdown.styles';
import {Button} from '../button/button.component';
import {CartContext} from '../../contexts/cart.context';
import {CartItem} from '../cart-item/cart-item.component';
import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import './cart-dropdown.styles';

export const CartDropdown = () => {
    const {cartItems, setIsCartOpen} = useContext(CartContext);
    const navigate = useNavigate();

    const onGoToCheckoutClick = () => {
        navigate('/checkout');
        setIsCartOpen(false);
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
