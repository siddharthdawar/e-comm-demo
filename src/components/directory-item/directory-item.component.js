import {
    BackgroundImage,
    Body,
    DirectoryItemContainer
} from './directory-item.styles';
import {useNavigate} from 'react-router-dom';

export const DirectoryItem = ({category}) => {
    const navigate = useNavigate();
    const onNavigateHandler = () => navigate(category.route);

    return (
        <DirectoryItemContainer>
            <BackgroundImage imageurl={category.imageUrl}/>
            <Body>
                <h2 onClick={onNavigateHandler}>
                    {category.title}
                </h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    );
};
