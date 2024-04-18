import {Button} from '../button/button.component';
import {CartContext} from '../../contexts/cart.context';
import {useContext} from 'react';
import './product-card.styles.scss';

export const ProductCard = ({product}) => {
    const {addItemToCart} = useContext(CartContext);
    const {imageUrl, name, price} = product;

    const onAddToCartClick = () => {
        addItemToCart(product);
    };

    return (
        <div className='product-card-container'>
            <img alt='card' src={imageUrl}/>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button
                buttonType='inverted'
                onClick={onAddToCartClick}
            >
                Add to Cart
            </Button>
        </div>
    );
};
