import { Route } from '@angular/router'
import { Dashboard } from './dashboard/dashboard'

export const dashboardRoutes: Route[] = [
  {
    path: '', component: Dashboard, children: [
      { path: 'expenses', loadComponent: () => import('./expenses/list/list').then(x => x.List) },
      { path: 'analytics', loadComponent: () => import('./analytics/reports/reports').then(x => x.Reports) },
      { path: '**', redirectTo: 'analytics' }
    ]
  }
]