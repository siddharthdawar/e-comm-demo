import {
    CartIconContainer,
    ItemCount,
    ShoppingIcon
} from './cart-icon.styles';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import {selectCartCount} from '../../store/cart/cart.selector';
import {setIsCartOpen} from '../../store/cart/cart.action';

export const CartIcon = () => {
    const dispatch = useDispatch();
    const cartCount = useSelector(selectCartCount);

    const handleCartIconClick = () => {
        dispatch(setIsCartOpen());
    };

    return (
        <CartIconContainer>
            <ShoppingIcon onClick={handleCartIconClick}/>
            <ItemCount className='item-count'>{cartCount}</ItemCount>
        </CartIconContainer>
    );
};
