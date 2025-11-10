import { Route } from '@angular/router'
import { Dashboard } from './dashboard/dashboard'

export const dashboardRoutes: Route[] = [
  {
    path: '', component: Dashboard, children: [
      { path: 'category', loadComponent: () => import('./category/category-list-component/category-list-component').then(x => x.CategoryListComponent) },
      { path: 'expenses', loadChildren: () => import('./expenses/expenses.routes').then(x => x.expensesRoutes) },
      { path: 'analytics', loadComponent: () => import('./analytics/reports/reports').then(x => x.Reports) },
      { path: 'income', loadComponent: () => import('./income/incomes-list-component/incomes-list-component').then(x => x.IncomesListComponent) },
      { path: '**', redirectTo: 'analytics' }
    ]
  }
]