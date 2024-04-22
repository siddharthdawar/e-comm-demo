import {
    Route,
    Routes
} from 'react-router-dom';
import {CategoriesPreview} from '../categories-preview/categories-preview.component';
import {Category} from '../category/category.component';
import './shop.styles.scss';

export const Shop = () =>
    <Routes>
        <Route element={<CategoriesPreview/>} index/>
        <Route element={<Category/>} path=':category'/>
    </Routes>;
