import {CartContext} from '../../contexts/cart.context';
import {useContext} from 'react';
import './checkout-item.styles.scss';

export const CheckoutItem = ({cartItem}) => {
    const {
        addItemToCart,
        clearItemFromCart,
        removeItemFromCart
    } = useContext(CartContext);

    const {imageUrl, name, price, quantity} = cartItem;

    const onClearItemClick = () => {
        clearItemFromCart(cartItem);
    };

    const onRemoveItemClick = () => {
        removeItemFromCart(cartItem);
    };

    const onAddItemClick = () => {
        addItemToCart(cartItem);
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
