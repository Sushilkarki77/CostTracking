import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CategoryState } from "./category.reducer";


export const selectCategoryState = createFeatureSelector<CategoryState>('categories');

export const selectAllCategories = createSelector(
  selectCategoryState,
  state => state.list
);

export const selectCategoryLoading = createSelector(
  selectCategoryState,
  state => state.loading
);


export const selectCategoryInitialized = createSelector(
  selectCategoryState,
  state => state.initialized
);