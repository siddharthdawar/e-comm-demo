import {
    Route,
    Routes
} from 'react-router-dom';
import {
    fetchCategoriesAsync,
    // fetchCategoriesStart
} from '../../store/categories/category.action';
import {CategoriesPreview} from '../categories-preview/categories-preview.component';
import {Category} from '../category/category.component';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import './shop.styles.scss';

export const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        fetchCategoriesAsync()(dispatch);

        // for use with redux-saga (comment out fetchCategoriesAsync)
        // categories saga listens to fetch categories start
        // dispatch(fetchCategoriesStart);
    }, []);

    return (
        <Routes>
            <Route
                element={<CategoriesPreview/>}
                index
            />
            <Route
                element={<Category/>}
                path=':category'
            />
        </Routes>
    );
};
