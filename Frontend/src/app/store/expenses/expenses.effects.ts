import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ExpensesService } from "../../common/services/expenses.services";
import * as ExpensesActions from "./expenses.actions"
import { catchError, exhaustMap, map, mergeMap, of, tap } from "rxjs";


export class ExpensesEffects {
    private actions$ = inject(Actions);
    private expensesService = inject(ExpensesService);

    loadEffects$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ExpensesActions.loadExpenses),
            mergeMap(() =>
                this.expensesService.getAll().pipe(
                    map(expenses => ExpensesActions.loadExpensesSuccess({ expenses })),
                    catchError(error => of(ExpensesActions.loadExpensesFailure({ error })))
                ),
            )
        )
    });

    addExpense$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExpensesActions.createExpense),
            exhaustMap(action =>
                this.expensesService.add(action.expense).pipe(
                    map(expense => ExpensesActions.addExpense({ expense })),
                    catchError(error => of(ExpensesActions.loadExpensesFailure({ error })))
                )
            )
        )
    )

    deleteExpense$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExpensesActions.deleteExpense),
            exhaustMap(action =>
                this.expensesService.delete(action.id).pipe(
                    tap(res => console.log('Delete response:', res)),
                    catchError(error => of(ExpensesActions.loadExpensesFailure({ error })))
                )
            )
        ),
        { dispatch: false }
    );


}