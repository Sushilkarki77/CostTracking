import { provideEffects } from "@ngrx/effects";
import { provideStore } from "@ngrx/store";
import { categoryReducer, CategoryState } from "./category/category.reducer";
import { CategoryEffects } from "./category/category.effects";
import { expenseReducer, ExpenseState } from "./expenses/expenses.reducer";
import { ExpensesEffects } from "./expenses/expenses.effects";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { environment } from "../../environments/environment";
import { metaReducers } from "./clear-state.metareducer";

export interface AppState {
  categories: CategoryState;
  expenses: ExpenseState;
}


export const appStoreProviders = [
  provideStore<AppState>({
    categories: categoryReducer,
    expenses: expenseReducer,
  }, { metaReducers }),
  provideEffects([CategoryEffects, ExpensesEffects]),
  provideStoreDevtools({
    maxAge: 25,
    logOnly: environment.production,
    autoPause: true
  }),

];