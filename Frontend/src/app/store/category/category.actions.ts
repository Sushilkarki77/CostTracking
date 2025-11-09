import { createAction, props } from "@ngrx/store";
import { Category } from "../../common/interfaces/app.interface";
import { HttpErrorResponse } from "@angular/common/http";

export const loadCategories = createAction('[Category] Load');
export const createCategory = createAction('[Category create]', props<{ name: string }>());
export const addCategory = createAction('[Category add]', props<{ category: Category }>());
export const deleteCategory = createAction('[Category delete]', props<{ id: string }>());


export const loadCategoriesSuccess = createAction(
    '[Category] Load Success',
    props<{ categories: Category[] }>()
);

export const loadCategoriesFailure = createAction(
    '[Category] Load Failure',
    props<{ error: HttpErrorResponse }>()
);