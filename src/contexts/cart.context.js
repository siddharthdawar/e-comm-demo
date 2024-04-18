import {
    createContext,
    useEffect,
    useState
} from 'react';

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(cartItem =>
        cartItem.id === productToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === productToAdd.id ?
                {...cartItem, quantity: cartItem.quantity + 1} :
                cartItem
        );
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
};

const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find(cartItem =>
        cartItem.id === productToRemove.id
    );

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
    }

    return cartItems.map(cartItem =>
        cartItem.id === productToRemove.id ?
            {...cartItem, quantity: cartItem.quantity - 1} :
            cartItem
    );
};

const clearCartItem = (cartItems, cartItemToClear) =>
    cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)

export const CartContext = createContext({
    addItemToCart: () => {},
    cartCount: 0,
    cartItems: [],
    cartTotal: 0,
    clearItemFromCart: () => {},
    isCartOpen: false,
    removeItemFromCart: () => {},
    setIsCartOpen: () => {}
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((acc, cartItem) => cartItem.quantity + acc, 0);

        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((acc, cartItem) =>
            (cartItem.quantity * cartItem.price) + acc, 0
        );

        setCartTotal(newCartTotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    };

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear))
    };

    const value = {
        addItemToCart,
        cartCount,
        cartItems,
        cartTotal,
        clearItemFromCart,
        isCartOpen,
        removeItemFromCart,
        setIsCartOpen
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
