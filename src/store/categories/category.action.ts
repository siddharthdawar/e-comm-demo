import {
    ActionWithPayload,
    ActionWithoutPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';
import {
    CATEGORIES_ACTION_TYPES,
    Category
} from './category.types';
import {getCategoriesAndDocuments} from '../../utils/firebase/firebase.utils';

type FetchCategoriesStartAction = ActionWithoutPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;
export const fetchCategoriesStart = withMatcher((): FetchCategoriesStartAction =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START));

type FetchCategoriesSuccessAction = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>;
export const fetchCategoriesSuccess = withMatcher((categories: Category[]): FetchCategoriesSuccessAction =>
    createAction(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
        categories
    ));

type FetchCategoriesFailedAction = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>;
export const fetchCategoriesFailed = withMatcher((error: Error): FetchCategoriesFailedAction =>
    createAction(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
        error
    ));

// export type CategoryAction = FetchCategoriesStartAction | FetchCategoriesSuccessAction | FetchCategoriesFailedAction;

export const fetchCategoriesAsync = () =>
    async (dispatch: any) => {
        dispatch(fetchCategoriesStart());

        try {
            const categories: any = await getCategoriesAndDocuments();

            dispatch(fetchCategoriesSuccess(categories));
        } catch (error) {
            dispatch(fetchCategoriesFailed(error as Error));
        }

    };
