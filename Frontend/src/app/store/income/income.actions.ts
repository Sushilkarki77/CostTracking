import { createAction, props } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import { Income } from "../../common/interfaces/app.interface";

export const loadIncome = createAction('[Income] Attempted');
export const loadIncomeStarted = createAction('[Income] Load started');
export const createIncome = createAction('[Income] create', props<{ income: Partial<Income> }>());
export const addIncome = createAction('[Income] add', props<{ income: Income }>());
export const deleteIncome = createAction('[Income] delete', props<{ _id: string }>());
export const updateIncome = createAction('[Income] update', props<{ _id: string, income: Partial<Income> }>());
export const updateIncomeSuccess = createAction('[Income] update success', props<{ _id: string, income: Income }>());

export const loadIncomeSuccess = createAction(
    '[Income] Load Success',
    props<{ incomes: Income[] }>()
);

export const loadIncomeFailure = createAction(
    '[Income] Load Failure',
    props<{ error: HttpErrorResponse }>()
);
