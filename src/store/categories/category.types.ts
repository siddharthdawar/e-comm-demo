export enum CATEGORIES_ACTION_TYPES {
    FETCH_CATEGORIES_FAILED = 'FETCH_CATEGORIES_FAILED',
    FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS',
    FETCH_CATEGORIES_START = 'FETCH_CATEGORIES_START'
}

export type CategoryItem = {
    id: string;
    imageUrl: string;
    name: string;
    price: number;
};

export type Category = {
    imageUrl: string;
    items: CategoryItem[];
    title: string;
};

export type CategoryMap = {
    [key: string]: CategoryItem[];
};
