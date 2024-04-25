import {
    addItemToCart,
    clearItemFromCart,
    removeItemFromCart
} from '../../store/cart/cart.action';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import {selectCartItems} from '../../store/cart/cart.selector';
import './checkout-item.styles.scss';

export const CheckoutItem = ({cartItem}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const {imageUrl, name, price, quantity} = cartItem;

    const onClearItemClick = () => {
        dispatch(clearItemFromCart(cartItems, cartItem));
    };

    const onRemoveItemClick = () => {
        dispatch(removeItemFromCart(cartItems, cartItem));
    };

    const onAddItemClick = () => {
        dispatch(addItemToCart(cartItems, cartItem));
    };

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div
                    className='arrow'
                    onClick={onRemoveItemClick}
                >
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div
                    className='arrow'
                    onClick={onAddItemClick}
                >
                    &#10095;
                </div>
            </span>
            <span className='price'>{price}</span>
            <div
                className='remove-button'
                onClick={onClearItemClick}
            >
                &#10005;
            </div>
        </div>
    );
};
