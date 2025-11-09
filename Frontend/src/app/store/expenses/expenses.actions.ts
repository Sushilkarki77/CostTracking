import { createAction, props } from "@ngrx/store";
import { Expense } from "../../common/interfaces/app.interface";
import { HttpErrorResponse } from "@angular/common/http";

export const loadExpenses = createAction('[Expenses] Load');
export const createExpense = createAction('[Expenses] create', props<{ expense: Partial<Expense> }>());
export const addExpense = createAction('[Expenses] add', props<{ expense: Expense }>());
export const deleteExpense = createAction('[Expenses] delete', props<{ id: string }>());

export const loadExpensesSuccess = createAction(
    '[Expenses] Load Success',
    props<{ expenses: Expense[] }>()
);

export const loadExpensesFailure = createAction(
    '[Expenses] Load Failure',
    props<{ error: HttpErrorResponse }>()
);

