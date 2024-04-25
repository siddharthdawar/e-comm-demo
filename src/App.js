import {
    Route,
    Routes
} from 'react-router-dom';
import {
    createUserDocumentFromAuth,
    onAuthStateChangedListener
} from './utils/firebase/firebase.utils';
import {Authentication} from './routes/authentication/authentication.component';
import {Checkout} from './routes/checkout/checkout.component';
import {Home} from './routes/home/home.component';
import {Navigation} from './routes/navigation/navigation.component';
import {Shop} from './routes/shop/shop.component';
import {setCurrentUser} from './store/user/user.action';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';

export const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(async (user) => {
            if (user) {
                await createUserDocumentFromAuth(user);
            }

            dispatch(setCurrentUser(user));
        });

        return unsubscribe;
    }, []);

    // ESLint: React Hook useEffect has a missing dependency: 'dispatch'. Either include it or remove the dependency array.(react-hooks/exhaustive-deps)
    // dispatch never changes so the above es lint error is misleading
    // dispatch can be included in the dependency array, but it will not make any difference

    return (
        <Routes>
            <Route
                path='/'
                element={<Navigation/>}
            >
                <Route
                    index
                    element={<Home/>}
                />
                <Route
                    path='shop/*'
                    element={<Shop/>}
                />
                <Route
                    path='auth'
                    element={<Authentication/>}
                />
                <Route
                    path='checkout'
                    element={<Checkout/>}
                />
            </Route>
        </Routes>
    );
};
