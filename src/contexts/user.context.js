import {
    createContext,
    useEffect,
    useReducer
    // useState
} from 'react';
import {
    createUserDocumentFromAuth,
    onAuthStateChangedListener
} from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
};

const userReducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unknown type ${type} in user reducer`);
    }
};

const initialState = {
    currentUser: null
};

export const UserProvider = ({children}) => {
    // const [currentUser, setCurrentUser] = useState(null);
    const [state, dispatch] = useReducer(userReducer, initialState);

    const {currentUser} = state;
    const setCurrentUser = user => {
        dispatch({
            type: USER_ACTION_TYPES.SET_CURRENT_USER,
            payload: user
        });
    };

    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(async (user) => {
            if (user) {
                await createUserDocumentFromAuth(user);
            }

            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
