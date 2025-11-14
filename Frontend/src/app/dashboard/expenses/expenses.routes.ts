import { Route, Routes } from "@angular/router";
import { List } from "./list/list"
import { AddExpenses } from "./add-expenses/add-expenses";
import { EditExpenses } from "./edit-expenses/edit-expenses";
import { addFormDeactivateGuard } from "../../common/guards/add-form-deactivate-guard";

export const expensesRoutes: Routes = [
    { path: '', component: List },
    { path: 'add', canDeactivate:[addFormDeactivateGuard], component: AddExpenses },
    { path: 'edit/:id', canDeactivate:[addFormDeactivateGuard], component: EditExpenses },
]