import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as IncomeActions from "./income.actions";
import { catchError, exhaustMap, filter, map, mergeMap, of, tap, withLatestFrom } from "rxjs";
import { select, Store } from "@ngrx/store";
import { IncomeService } from "../../common/services/income-service";
import { selectIncomeInitialized } from "./incomeselectors";


export class IncomeEffects {
    private actions$ = inject(Actions);
    private incomeService = inject(IncomeService);
    private store = inject(Store);

    loadIncomeStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IncomeActions.loadIncome),
            withLatestFrom(this.store.pipe(select(selectIncomeInitialized))),
            filter(([_, loaded]) => !loaded),
            map(() => IncomeActions.loadIncomeStarted())
        )
    );

    loadIncomeApi$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IncomeActions.loadIncomeStarted),
            mergeMap(() =>
                this.incomeService.getAll().pipe(
                    map(incomes => IncomeActions.loadIncomeSuccess({ incomes })),
                    catchError(error => of(IncomeActions.loadIncomeFailure({ error })))
                )
            )
        )
    );

    createIncome$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IncomeActions.createIncome),
            exhaustMap(action =>
                this.incomeService.add(action.income).pipe(
                    map(income => IncomeActions.addIncome({ income })),
                    catchError(error => of(IncomeActions.loadIncomeFailure({ error })))
                )
            )
        )
    );

    updateIncome$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IncomeActions.updateIncome),
            exhaustMap(action =>
                this.incomeService.update(action._id, action.income).pipe(
                    map(income => IncomeActions.updateIncomeSuccess({ _id: action._id, income })),
                    catchError(error => of(IncomeActions.loadIncomeFailure({ error })))
                )
            )
        )
    );

    deleteIncome$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IncomeActions.deleteIncome),
            exhaustMap(action =>
                this.incomeService.delete(action.id).pipe(
                    tap(res => console.log('Delete response:', res)),
                    catchError(error => of(IncomeActions.loadIncomeFailure({ error })))
                )
            )
        ),
        { dispatch: false }
    );
}
