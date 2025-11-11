

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CategoryActions from './category.actions';
import { catchError, concat, exhaustMap, filter, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';
import { CategoryService } from '../../common/services/category.service';
import { select, Store } from '@ngrx/store';
import { selectCategoryInitialized } from './category.selectors';

@Injectable()
export class CategoryEffects {
    private actions$ = inject(Actions);
    private categoryService = inject(CategoryService);
    private store = inject(Store);

    loadCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CategoryActions.loadCategories),
            withLatestFrom(this.store.pipe(select(selectCategoryInitialized))),
            filter(([_, loaded]) => !loaded),
            mergeMap(() => [
                CategoryActions.loadCategoriesStarted()
            ])
        )
    );

    loadCategoriesApi$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CategoryActions.loadCategoriesStarted),
            mergeMap(() =>
                this.categoryService.getAll().pipe(
                    map(categories => CategoryActions.loadCategoriesSuccess({ categories })),
                    catchError(error => of(CategoryActions.loadCategoriesFailure({ error })))
                )
            )
        )
    );

    addCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CategoryActions.createCategory),
            exhaustMap(action =>
                this.categoryService.add(action.name).pipe(
                    map(category => CategoryActions.addCategory({ category })),
                    catchError(error => of(CategoryActions.loadCategoriesFailure({ error })))
                )
            )
        )
    )


    deleteCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CategoryActions.deleteCategory),
            exhaustMap(action =>
                this.categoryService.delete(action.id).pipe(
                    tap(res => console.log('Delete response:', res)),
                    catchError(error => of(CategoryActions.loadCategoriesFailure({ error })))
                )
            )
        ),
        { dispatch: false }
    );
}
