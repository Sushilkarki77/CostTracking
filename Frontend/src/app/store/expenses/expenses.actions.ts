import { createAction, props } from "@ngrx/store";
import { Expense } from "../../core/interfaces/app.interface";
import { HttpErrorResponse } from "@angular/common/http";

export const loadExpenses = createAction('[Expenses] Attempted');
export const loadExpensesStarted = createAction('[Expenses] Load started');
export const createExpense = createAction('[Expenses] create', props<{ expense: Partial<Expense> }>());
export const addExpense = createAction('[Expenses] add', props<{ expense: Expense }>());
export const deleteExpense = createAction('[Expenses] delete', props<{ _id: string }>());
export const updateExpense = createAction('[Expenses] update', props<{ _id: string, expense: Partial<Expense> }>());
export const updateExpenseSuccess = createAction('[Expenses] update success', props<{ _id: string, expense: Expense }>());

export const loadExpensesSuccess = createAction(
    '[Expenses] Load Success',
    props<{ expenses: Expense[] }>()
);

export const loadExpensesFailure = createAction(
    '[Expenses] Load Failure',
    props<{ error: HttpErrorResponse }>()
);

