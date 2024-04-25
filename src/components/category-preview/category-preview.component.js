import {Link} from 'react-router-dom';
import {ProductCard} from '../product-cards/product-card.component';
import './category-preview.styles.scss';

export const CategoryPreview = ({products, title}) =>
    <div className='category-preview-container'>
        <h2>
            <Link
                className='title'
                to={title}
            >
                {title.toUpperCase()}
            </Link>
            <div className='preview'>
                {
                    products
                        .filter((_, index) => index < 4)
                        .map(product =>
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        )
                }
            </div>
        </h2>
    </div>;
