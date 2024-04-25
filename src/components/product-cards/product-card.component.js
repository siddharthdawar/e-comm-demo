import {
    Button,
    BUTTON_TYPE_CLASSES
} from '../button/button.component';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import {addItemToCart} from '../../store/cart/cart.action';
import {selectCartItems} from '../../store/cart/cart.selector';
import './product-card.styles.scss';

export const ProductCard = ({product}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const {imageUrl, name, price} = product;

    const onAddToCartClick = () => {
        dispatch(addItemToCart(cartItems, product));
    };

    return (
        <div className='product-card-container'>
            <img
                alt='card'
                src={imageUrl}
            />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button
                buttonType={BUTTON_TYPE_CLASSES.inverted}
                onClick={onAddToCartClick}
            >
                Add to Cart
            </Button>
        </div>
    );
};
