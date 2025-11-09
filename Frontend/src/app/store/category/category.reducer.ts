

import { createReducer, on } from '@ngrx/store';
import * as CategoryActions from './category.actions';
import { Category } from '../../common/interfaces/app.interface';


export interface CategoryState {
    list: Category[];
    loading: boolean;
    error?: any;
}

export const initialState: CategoryState = {
    list: [],
    loading: false,
};

export const categoryReducer = createReducer(
    initialState,
    on(CategoryActions.loadCategories, state => ({ ...state, loading: true })),
    on(CategoryActions.addCategory, (state, { category }) => ({ ...state, list: [...state.list, category] })),
    on(CategoryActions.deleteCategory, (state, { id }) => ({ ...state, list: state.list.filter(x => x._id != id) })),
    on(CategoryActions.loadCategoriesSuccess, (state, { categories }) => ({
        ...state,
        list: categories,
        loading: false,
    })),
    on(CategoryActions.loadCategoriesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);
