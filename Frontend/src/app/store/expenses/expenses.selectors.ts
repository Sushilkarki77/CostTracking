import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ExpenseState } from "./expenses.reducer";

export const selectExpenseState = createFeatureSelector<ExpenseState>('expenses');

export const selectAllExpenses = createSelector(
  selectExpenseState,
  state => state.list
);

export const selectExpenseLoading = createSelector(
  selectExpenseState,
  state => state.loading
);