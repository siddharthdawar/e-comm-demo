import './cart-item.styles.scss';

export const CartItem = ({cartItem}) => {
    const {quantity, name} = cartItem;

    return (
        <div>
            <h2>{name}</h2>
            <span>{quantity}</span>
        </div>
    );
};
