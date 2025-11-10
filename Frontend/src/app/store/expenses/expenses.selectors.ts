import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ExpenseState } from "./expenses.reducer";
import { Expense, ExpenseSummary } from "../../common/interfaces/app.interface";

export const selectExpenseState = createFeatureSelector<ExpenseState>('expenses');

export const selectAllExpenses = createSelector(
  selectExpenseState,
  state => state.list
);

export const selectExpensesSummary =  createSelector(
  selectAllExpenses,
  state => state.map(x => {
    const { items, ...expense } = x;
    const total = items.reduce((acc, curr) => acc + curr.price, 0);
    return { ...expense, total }
  })
)

export const filteredExpensesSummary = (page: number, pageSize: number) => createSelector(
  selectExpensesSummary,
  (state): {totalItems: number, data: ExpenseSummary[]} => ({
   totalItems: state.length,
   data: state.slice(page * pageSize, ((page * pageSize) + pageSize))}
  )
)

export const selectExpenseLoading = createSelector(
  selectExpenseState,
  state => state.loading
);

export const selectExpenseInitialized= createSelector(
  selectExpenseState,
  state => state.initialized
);


export const selectExpenseError = createSelector(
  selectExpenseState,
  state => state.error
)