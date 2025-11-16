

import { createReducer, on } from '@ngrx/store';
import * as CategoryActions from './category.actions';
import { Category } from '../../core/interfaces/app.interface';


export interface CategoryState {
    list: Category[];
    loading: boolean;
    initialized: boolean;
    error?: any;
}

export const initialState: CategoryState = {
    list: [],
    loading: false,
    initialized: false
};

export const categoryReducer = createReducer(
    initialState,
    on(CategoryActions.loadCategoriesStarted, state => ({ ...state, loading: true })),
    on(CategoryActions.addCategory, (state, { category }) => ({ ...state, list: [...state.list, category] })),
    on(CategoryActions.deleteCategory, (state, { id }) => ({ ...state, list: state.list.filter(x => x._id != id) })),
    on(CategoryActions.loadCategoriesSuccess, (state, { categories }) => ({
        ...state,
        list: categories,
        loading: false,
        initialized: true
    })),
    on(CategoryActions.loadCategoriesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);
