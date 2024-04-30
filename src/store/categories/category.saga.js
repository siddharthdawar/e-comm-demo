import {
    all,
    call,
    put,
    takeLatest
} from 'redux-saga/effects';
import {
    fetchCategoriesFailed,
    fetchCategoriesSuccess
} from './category.action';
import {CATEGORIES_ACTION_TYPES} from './category.types';
import {getCategoriesAndDocuments} from '../../utils/firebase/firebase.utils';

export function* fetchCategoriesAsync() {
    try {
        const categories = yield call(getCategoriesAndDocuments);

        yield put(fetchCategoriesSuccess(categories));
    } catch (error) {
        yield put(fetchCategoriesFailed(error));
    }
}

export function* onFetchCategories() {
    yield takeLatest(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
        fetchCategoriesAsync
    ); // takeLatest gives you the latest action that fired in the sequence
}

export function* categoriesSaga() {
    yield all([
        call(onFetchCategories)
    ]); // all waits until everything passed to it is completed
}
