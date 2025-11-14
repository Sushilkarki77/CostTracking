import { Route, Routes } from "@angular/router";
import { List } from "./list/list"
import { AddExpenses } from "./add-expenses/add-expenses";
import { EditExpenses } from "./edit-expenses/edit-expenses";
import {  unsavedChangesGuard } from "../../common/guards/unsaved-changes-guard";

export const expensesRoutes: Routes = [
    { path: '', component: List },
    { path: 'add', canDeactivate:[unsavedChangesGuard], component: AddExpenses },
    { path: 'edit/:id', canDeactivate:[unsavedChangesGuard], component: EditExpenses },
]