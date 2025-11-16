import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ExpenseState } from "./expenses.reducer";
import { Expense, ExpenseSummary } from "../../core/interfaces/app.interface";
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
    const total = items?.reduce((acc, curr) => acc + curr.price, 0);
    return { ...expense, total }
  })
)

export const filteredExpensesSummary = (page: number, pageSize: number, filterState?: Partial<FilterState>, sortState?: Record<keyof ExpenseSummary, '-1' | '0'> | {}) => createSelector(
  selectExpensesSummary,
  (state): { totalItems: number, data: ExpenseSummary[] } => {


    const filteredData = state.filter(x =>
      (filterState?.name ? x.name.toLocaleLowerCase().includes(filterState.name.toLocaleLowerCase()) : true) &&

      (filterState?.startDate ? new Date(filterState.startDate) <= new Date(x.date) : true) &&

      (filterState?.endDate ? new Date(filterState.endDate) >= new Date(x.date) : true)
    );


    let sortedData = filteredData.sort((a, b) => {
      if (!sortState) return 0;

      for (const [field, direction] of Object.entries(sortState) as [keyof ExpenseSummary, '1' | '-1'][]) {
        const dir = direction === '1' ? 1 : -1;
        if (a[field] > b[field]) return 1 * dir;
        if (a[field] < b[field]) return -1 * dir;
      }

      return 0;
    });



    return {
      totalItems: filteredData.length,
      data: sortedData.slice(page * pageSize, ((page * pageSize) + pageSize))
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
);

export const totalExpenses = createSelector(
  selectExpensesSummary,
  state => state.reduce((acc, curr) => acc + curr.total, 0)
);

export const avarageDailyExpenses = createSelector(
  selectExpensesSummary,
  totalExpenses,
  (expenses, total) => {
    if (!expenses.length) return 0;

    const dates = expenses.filter(x => !!x.date).map(item => new Date(item.date).getTime());

    const earliestDate = new Date(Math.min(...dates));
    const latestDate = new Date(Math.max(...dates));

    const diffTime = latestDate.getTime() - earliestDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return total;
  
    return total / diffDays;
  }
);
