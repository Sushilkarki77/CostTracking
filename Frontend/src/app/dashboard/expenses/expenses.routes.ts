import {  Routes } from "@angular/router";
import { unsavedChangesGuard } from "../../common/guards/unsaved-changes-guard";

export const expensesRoutes: Routes = [
    { path: '', loadComponent: () => import('./list/list').then(x => x.List) },
    { path: 'add', canDeactivate: [unsavedChangesGuard], loadComponent: () => import('./add-expenses/add-expenses').then(x => x.AddExpenses) },
    { path: 'edit/:id', canDeactivate: [unsavedChangesGuard], loadComponent: () => import('./edit-expenses/edit-expenses').then(x => x.EditExpenses) },
]