import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IncomeState } from "./income.reducer";
import { Income } from "../../core/interfaces/app.interface";
import { convertToMonthNames, getMonthYear, getPast12MonthsMap } from "../../core/app.utils";


export const selectIncomeState = createFeatureSelector<IncomeState>('income');

export const selectAllIncome = createSelector(
  selectIncomeState,
  state => state.list
);

export const filteredIncome = (page: number, pageSize: number, filterState?: { name?: string; startDate?: string; endDate?: string; }, sortState?: Record<keyof Income, '1' | '-1'> | {}) => createSelector(
  selectAllIncome,
  (state): { totalItems: number; data: Income[] } => {
    const filteredData = state.filter(x =>
      (filterState?.name ? x.name.toLocaleLowerCase().includes(filterState.name.toLocaleLowerCase()) : true) &&
      (filterState?.startDate ? new Date(filterState.startDate) <= new Date(x.date) : true) &&
      (filterState?.endDate ? new Date(filterState.endDate) >= new Date(x.date) : true)
    );

    let sortedData = filteredData.sort((a, b) => {
      if (!sortState) return 0;

      for (const [field, direction] of Object.entries(sortState) as [keyof Income, '1' | '-1'][]) {
        const dir = direction === '1' ? 1 : -1;
        if (a[field] > b[field]) return 1 * dir;
        if (a[field] < b[field]) return -1 * dir;
      }

      return 0;
    });

    return {
      totalItems: filteredData.length,
      data: sortedData.slice(page * pageSize, ((page * pageSize) + pageSize))
    };
  }
);

export const selectIncomeLoading = createSelector(
  selectIncomeState,
  state => state.loading
);

export const selectIncomeItem = (_id: string) => createSelector(
  selectIncomeState,
  state => state.list.find(x => x._id === _id)
);

export const selectIncomeInitialized = createSelector(
  selectIncomeState,
  state => state.initialized
);

export const selectIncomeError = createSelector(
  selectIncomeState,
  state => state.error
);


export const totalIncome = createSelector(
  selectAllIncome,
  state => state.reduce((acc, curr) => acc + +curr?.amount, 0)
)


export const getPast12MonthsIncome = createSelector(
  selectAllIncome,
  (state): [Map<string, number>, Array<string>] => {
    const [monthsMap, monthsArr] = getPast12MonthsMap();
    const past12MonthsIncomes = state.filter(x => new Date(x.date) > new Date(monthsArr[0]));

    past12MonthsIncomes.forEach(x => {
      const formattedDate = getMonthYear(new Date(x.date));
      monthsMap.set(formattedDate, (monthsMap.get(formattedDate) || 0) + +x.amount)
    });


    return [monthsMap, convertToMonthNames(monthsArr)];
  }
)




