import {
    LogoContainer,
    NavigationContainer,
    NavLink,
    NavLinks
} from './navigation.styles';
import {CartDropdown} from '../../components/cart-dropdown/cart-dropdown.component';
import {CartIcon} from '../../components/cart-icon/cart-icon.component';
import {Outlet} from 'react-router-dom';
import {ReactComponent as Crown} from '../../assets/crown.svg';
// import {UserContext} from '../../contexts/user.context';
import {selectCurrentUser} from '../../store/user/user.selector';
import {selectIsCartOpen} from '../../store/cart/cart.selector';
import {signOutUser} from '../../utils/firebase/firebase.utils';
// import {useContext} from 'react';
import {useSelector} from 'react-redux';

export const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    // const {currentUser} = useContext(UserContext);
    const isCartOpen = useSelector(selectIsCartOpen);

    const onSignOutClick = async () => {
        try {
            await signOutUser();
        } catch (error: unknown) {
            console.log(error);
        }
    };

    return (
        <>
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
                            to='/auth'
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
        </>
    );
};
