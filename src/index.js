import {
    // persistor,
    store
} from './store/store';
import {App} from './App';
import {BrowserRouter} from 'react-router-dom';
import {Elements} from '@stripe/react-stripe-js';
// import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
// import {UserProvider} from './contexts/user.context';
import reportWebVitals from './reportWebVitals';
import {stripePromise} from './utils/stripe/stripe.utils';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            {/*<PersistGate persistor={persistor}>*/}
            <BrowserRouter>
                {/*<UserProvider>*/}
                <Elements stripe={stripePromise}> {/* stripe promise tells stripe that it is THIS app that is making request and not a spoof */}
                    <App/>
                </Elements>
                {/*</UserProvider>*/}
            </BrowserRouter>
            {/*</PersistGate>*/}
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
