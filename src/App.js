import {
    Route,
    Routes
} from 'react-router-dom';
import {
    createUserDocumentFromAuth,
    onAuthStateChangedListener
} from './utils/firebase/firebase.utils';
import {
    // lazy,
    // Suspense,
    useEffect
} from 'react';
import {Authentication} from './routes/authentication/authentication.component';
import {Checkout} from './routes/checkout/checkout.component';
import {Home} from './routes/home/home.component';
import {GlobalStyle} from './global.styles';
import {Navigation} from './routes/navigation/navigation.component';
import {Shop} from './routes/shop/shop.component';
// import {Spinner} from './components/spinner/spinner.component';
import {setCurrentUser} from './store/user/user.action';
import {useDispatch} from 'react-redux';

// This will load home page only when the user is on the home page
// if the user is on the shop page and refreshes, it will not fetch the home page
// it will fetch the home page when user navigates back to home
// HELPS REDUCE THE INITIAL LOAD BUNDLE SIZE
// unfortunately, doesn't work with named exports (only with default exports)
// an example workaround is:
// const Home = lazy(() => import('./routes/home/home.component').then(module => module.Home));

// const Home = lazy(() => import('./routes/home/home.component'));

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
        /*<Suspense fallback={<Spinner/>}>*/
        <>
            <GlobalStyle/>
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
        </>
        /*</Suspense>*/
    );
};
