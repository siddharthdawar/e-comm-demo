import {Button} from '../button/button.component';
import {CartContext} from '../../contexts/cart.context';
import {CartItem} from '../cart-item/cart-item.component';
import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import './cart-dropdown.styles.scss';

export const CartDropdown = () => {
    const {cartItems, setIsCartOpen} = useContext(CartContext);
    const navigate = useNavigate();

    const onGoToCheckoutClick = () => {
        navigate('/checkout');
        setIsCartOpen(false);
    };

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map(cartItem =>
                    <CartItem
                        cartItem={cartItem}
                        key={cartItem.id}
                    />)}
            </div>
            <Button onClick={onGoToCheckoutClick}>
                GO TO CHECKOUT
            </Button>
        </div>
    );
};
