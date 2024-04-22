import {
    createContext,
    useEffect,
    useState
} from 'react';
// import {SHOP_DATA} from '../shop-data';
// import {addCollectionAndDocuments} from '../utils/firebase/firebase.utils';
import {getCategoriesAndDocuments} from '../utils/firebase/firebase.utils';

export const CategoriesContext = createContext({
    categoriesMap: {},
    setProducts: () => null
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    /*useEffect(() => {
        addCollectionAndDocuments('categories', SHOP_DATA);
    }, []);*/

    useEffect(() => {
        const getCategoriesMap = async () => {
            try {
                const categoriesMap = await getCategoriesAndDocuments();

                setCategoriesMap(categoriesMap);
            } catch(error) {
                throw new Error(error);
            }
        };

        getCategoriesMap();
    }, []);

    const value = {categoriesMap, setCategoriesMap};

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
};
