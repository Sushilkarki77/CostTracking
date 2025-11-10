import { createReducer, on } from "@ngrx/store";
import { Expense } from "../../common/interfaces/app.interface";
import * as ExpensesAction from "./expenses.actions";

export interface ExpenseState {
    list: Expense[];
    loading: boolean;
    initialized: boolean;
    error?: Error;
}

export const initialState: ExpenseState = {
    list: [],
    loading: false,
    initialized: false
};


export const expenseReducer = createReducer(
    initialState,
    on(ExpensesAction.loadExpenses, state => ({ ...state, loading: true })),
    on(ExpensesAction.loadExpensesSuccess, (state, { expenses }) => ({ ...state, list: expenses, loading: false, initialized: true })),
    on(ExpensesAction.addExpense, (state, { expense }) => ({ ...state, list: [...state.list, expense], loading: false })),
    on(ExpensesAction.deleteExpense, (state, { id }) => ({ ...state, list: state.list.filter(x => x._id != id) })),
    on(ExpensesAction.loadExpensesFailure, (state, { error }) => ({ ...state, loading: false, error }))
)