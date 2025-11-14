import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ExpensesService } from "../../common/services/expenses.services";
import * as ExpensesActions from "./expenses.actions"
import { catchError, concat, exhaustMap, filter, map, mergeMap, of, tap, withLatestFrom } from "rxjs";
import { select, Store } from "@ngrx/store";
import { selectExpenseInitialized } from "./expenses.selectors";


export class ExpensesEffects {
    private actions$ = inject(Actions);
    private expensesService = inject(ExpensesService);
    private store = inject(Store);


    loadExpensesStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExpensesActions.loadExpenses),
            withLatestFrom(this.store.pipe(select(selectExpenseInitialized))),
            filter(([_, loaded]) => !loaded),
            map(() => ExpensesActions.loadExpensesStarted())
        )
    );

    loadExpensesApi$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExpensesActions.loadExpensesStarted),
            mergeMap(() =>
                this.expensesService.getAll().pipe(
                    map(expenses => ExpensesActions.loadExpensesSuccess({ expenses })),
                    catchError(error => of(ExpensesActions.loadExpensesFailure({ error })))
                )
            )
        )
    );

    createExpense$ = createEffect(() =>
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

     updateExpense$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExpensesActions.updateExpense),
            exhaustMap(action =>
                this.expensesService.update(action._id, action.expense).pipe(
                    map(expense => ExpensesActions.updateExpenseSuccess({_id: action._id, expense })),
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