import {
    applyMiddleware,
    compose,
    legacy_createStore as createStore
} from 'redux';
import {
    // persistReducer,
    persistStore
} from 'redux-persist';
// import createSagaMiddleware from 'redux-saga';
// import {logger} from 'redux-logger/src';
import {rootReducer} from './root-reducer';
// import {rootSaga} from './root-saga';
// import storage from 'redux-persist/lib/storage'; // by default, it is the browser storage
import {thunk} from 'redux-thunk';

// Middlewares are like helpers (enhancers)
// A dispatched "action" first goes through a middleware before hitting a reducer
// Middlewares are OPTIONAL

// const sagaMiddleware = createSagaMiddleware();

// Only run logger in dev mode
const middlewares = [
    // process.env.NODE_ENV !== 'production' && logger,
    thunk,
    // sagaMiddleware // can only use either thunk middleware or saga middleware, not both
].filter(item => item);

// Will pass middleware for all environments
// const middlewares = [logger];

const composeEnhancer = ( // If not in production and redux dev tools exist, use composeEnhancer or use regular compose
    process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;
const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

/* const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'] // persist this state only
}; */

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    rootReducer,
    // persistedReducer, // use either persistReducer or rootReducer
    undefined,
    composedEnhancers
);

// sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
