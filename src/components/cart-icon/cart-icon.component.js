import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import {CartContext} from '../../contexts/cart.context';
import {useContext} from 'react';
import './cart-icon.styles.scss';

export const CartIcon = () => {
    const {isCartOpen, setIsCartOpen} = useContext(CartContext);

    const handleCartIconClick = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <div className='cart-icon-container'>
            <ShoppingIcon
                className='shopping-icon'
                onClick={handleCartIconClick}
            />
            <span className='item-count'>0</span>
        </div>
    );
};
