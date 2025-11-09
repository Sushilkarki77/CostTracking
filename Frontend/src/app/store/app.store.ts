import { provideEffects } from "@ngrx/effects";
import { provideStore } from "@ngrx/store";
import { categoryReducer } from "./category/category.reducer";
import { CategoryEffects } from "./category/category.effects";
import { expenseReducer } from "./expenses/expenses.reducer";
import { ExpensesEffects } from "./expenses/expenses.effects";


export const appStoreProviders = [
  provideStore({
    categories: categoryReducer,
    expenses: expenseReducer,
  }),
  provideEffects([CategoryEffects, ExpensesEffects]),
];