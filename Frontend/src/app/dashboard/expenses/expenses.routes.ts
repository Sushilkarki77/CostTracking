import { Route, Routes } from "@angular/router";
import { List } from "./list/list"
import { AddExpenses } from "./add-expenses/add-expenses";



export const expensesRoutes: Routes = [
    { path: '', component: List },
    { path: 'add', component: AddExpenses }
]