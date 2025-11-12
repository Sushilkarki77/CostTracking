import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ExpenseState } from "./expenses.reducer";
import { Expense, ExpenseSummary } from "../../common/interfaces/app.interface";
import { FilterState } from "../../dashboard/expenses/expenses.interfaces";

export const selectExpenseState = createFeatureSelector<ExpenseState>('expenses');

export const selectAllExpenses = createSelector(
  selectExpenseState,
  state => state.list
);

export const selectExpensesSummary = createSelector(
  selectAllExpenses,
  state => state.map(x => {
    const { items, ...expense } = x;
    const total = items.reduce((acc, curr) => acc + curr.price, 0);
    return { ...expense, total }
  })
)

export const filteredExpensesSummary = (page: number, pageSize: number, filterState?: Partial<FilterState>) => createSelector(
  selectExpensesSummary,
  (state): { totalItems: number, data: ExpenseSummary[] } => {

    const filteredData = state.filter(x =>
      (filterState?.name ? x.name.toLocaleLowerCase().includes(filterState.name.toLocaleLowerCase()) : true) &&

      (filterState?.startDate ? new Date(filterState.startDate) <= new Date(x.date) : true) &&

      (filterState?.endDate ? new Date(filterState.endDate) >= new Date(x.date) : true)
    );

    return {
      totalItems: filteredData.length,
      data: filteredData.slice(page * pageSize, ((page * pageSize) + pageSize))
   }
  }
)

export const selectExpenseLoading = createSelector(
  selectExpenseState,
  state => state.loading
);


export const selectExpenseItem = (_id: string) => createSelector(
  selectExpenseState,
  state => state.list.find(x => x._id === _id)
);

export const selectExpenseInitialized = createSelector(
  selectExpenseState,
  state => state.initialized
);


export const selectExpenseError = createSelector(
  selectExpenseState,
  state => state.error
)