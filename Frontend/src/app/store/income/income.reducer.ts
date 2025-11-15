import { createReducer, on } from "@ngrx/store";
import * as IncomeActions from "./income.actions";
import { Income } from "../../common/interfaces/app.interface";

export interface IncomeState {
    list: Income[];
    loading: boolean;
    initialized: boolean;
    error?: Error;
}

export const initialState: IncomeState = {
    list: [],
    loading: false,
    initialized: false
};

export const incomeReducer = createReducer(
    initialState,
    on(IncomeActions.loadIncomeStarted, state => ({ ...state, loading: true })),
    on(IncomeActions.loadIncomeSuccess, (state, { incomes }) => ({ ...state, list: incomes, loading: false, initialized: true })),
    on(IncomeActions.addIncome, (state, { income }) => ({ ...state, list: [income, ...state.list], loading: false })),
    on(IncomeActions.updateIncomeSuccess, (state, { _id, income }) => ({
        ...state,
        list: state.list.map(x => x._id !== _id ? x : income)
    })),
    on(IncomeActions.deleteIncome, (state, { _id }) => ({
        ...state,
        list: state.list.filter(x => x._id !== _id)
    })),
    on(IncomeActions.loadIncomeFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
