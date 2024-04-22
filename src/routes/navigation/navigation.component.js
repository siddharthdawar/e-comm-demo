import {
    Fragment,
    useContext
} from 'react';
import {
    LogoContainer,
    NavigationContainer,
    NavLink,
    NavLinks
} from './navigation.styles';
import {CartContext} from '../../contexts/cart.context';
import {CartDropdown} from '../../components/cart-dropdown/cart-dropdown.component';
import {CartIcon} from '../../components/cart-icon/cart-icon.component';
import {Outlet} from 'react-router-dom';
import {ReactComponent as Crown} from '../../assets/crown.svg';
import {UserContext} from '../../contexts/user.context';
import {signOutUser} from '../../utils/firebase/firebase.utils';

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
            <NavigationContainer>
                <LogoContainer to='/'>
                    <Crown className='logo'/>
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>
                    {currentUser ?
                        <NavLink
                            as='span'
                            onClick={onSignOutClick}
                        >
                            SIGN OUT
                        </NavLink> :
                        <NavLink to='/auth'>
                            SIGN IN
                        </NavLink>
                    }
                    <CartIcon/>
                </NavLinks>
                {isCartOpen && <CartDropdown/>}
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    );
};
