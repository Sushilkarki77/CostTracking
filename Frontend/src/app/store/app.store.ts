import { provideEffects } from "@ngrx/effects";
import { provideStore } from "@ngrx/store";
import { categoryReducer } from "./category.reducer";
import { CategoryEffects } from "./category.effects";

export const appStoreProviders = [
  provideStore({
    categories: categoryReducer,
    // expenses: expenseReducer,
  }),
  provideEffects([CategoryEffects]),
 
];