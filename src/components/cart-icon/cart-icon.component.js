import {
    CartIconContainer,
    ItemCount,
    ShoppingIcon
} from './cart-icon.styles';
import {CartContext} from '../../contexts/cart.context';
import {useContext} from 'react';

export const CartIcon = () => {
    const {cartCount, isCartOpen, setIsCartOpen} = useContext(CartContext);

    const handleCartIconClick = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <CartIconContainer>
            <ShoppingIcon onClick={handleCartIconClick}/>
            <ItemCount className='item-count'>{cartCount}</ItemCount>
        </CartIconContainer>
    );
};
