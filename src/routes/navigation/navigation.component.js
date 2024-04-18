import {
    Fragment,
    useContext
} from 'react';
import {
    Link,
    Outlet
} from 'react-router-dom';
import {CartContext} from '../../contexts/cart.context';
import {CartDropdown} from '../../components/cart-dropdown/cart-dropdown.component';
import {CartIcon} from '../../components/cart-icon/cart-icon.component';
import {ReactComponent as Crown} from '../../assets/crown.svg';
import {UserContext} from '../../contexts/user.context';
import {signOutUser} from '../../utils/firebase/firebase.utils';
import './navigation.styles.scss';

export const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);

    const onSignOutClick = async () => {
        try {
            await signOutUser();
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <Fragment>
            <div className='navigation'>
                <Link
                    className='logo-container'
                    to='/'
                >
                    <Crown/>
                </Link>
                <div className='nav-links-container'>
                    <Link
                        className='nav-link'
                        to='/shop'
                    >
                        SHOP
                    </Link>
                    {currentUser ?
                        <span
                            className='nav-link'
                            onClick={onSignOutClick}
                        >
                            SIGN OUT
                        </span> :
                        <Link
                            className='nav-link'
                            to='/auth'
                        >
                            SIGN IN
                        </Link>
                    }
                    <CartIcon/>
                </div>
                {isCartOpen && <CartDropdown/>}
            </div>
            <Outlet/>
        </Fragment>
    );
};
