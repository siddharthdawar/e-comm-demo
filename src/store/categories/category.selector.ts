import {CategoryMap} from './category.types';
import {CategoriesState} from './category.reducer';
import {RootState} from '../store';
import {createSelector} from 'reselect';

// Slice of the reducer we need to memoize
const selectCategoryReducer = (state: RootState): CategoriesState =>
    state.categories;

// Create a memoized selector
const selectCategories = createSelector( // this will rerun only when state.categories has changed
    [selectCategoryReducer], // "categories" will the input to the next param
    (categoriesSlice) => categoriesSlice.categories // will return state.categories.categories (memoized)
);

export const selectCategoriesMap = createSelector(
    [selectCategories], // returns categories
    (categories): CategoryMap => // only run if categories has changed, else return previous value (cached/memoized)
        categories.reduce((acc, category) => {
            const {items, title} = category;

            acc[title.toLowerCase()] = items;

            return acc;
        }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
);

// Everytime this selector runs, it will return a "new" object
// which will cause "memoization" warnings on the console
/* export const selectCategoriesMap = (state) =>
    state.categories.categories.reduce((acc, category) => {
        const {items, title} = category;

        acc[title.toLowerCase()] = items;

        return acc;
    }, {}); */
