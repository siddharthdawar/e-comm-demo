import {
    selectCategoriesIsLoading,
    selectCategoriesMap
} from '../../store/categories/category.selector';
import {
    useEffect,
    useState
} from 'react';
import {ProductCard} from '../../components/product-cards/product-card.component';
import {Spinner} from '../../components/spinner/spinner.component';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import './category.styles.scss';

export const Category = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const {category} = useParams();

    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            {isLoading ?
                <Spinner/> :
                <div className='category-container'>
                    {products && products.map(product =>
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    )}
                </div>
            }
        </>
    );
};
