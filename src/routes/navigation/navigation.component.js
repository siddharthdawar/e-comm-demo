import {Link, Outlet} from 'react-router-dom';
import {ReactComponent as Crown} from '../../assets/crown.svg';
import {Fragment} from 'react';
import './navigation.styles.scss';

export const Navigation = () =>
    <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <Crown/>
            </Link>
            <div className='nav-links-container'>
                <Link className='nav-link' to='/auth'>
                    SIGN IN
                </Link>
            </div>
        </div>
        <Outlet/>
    </Fragment>;
