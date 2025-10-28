import { Route } from '@angular/router'
import { Dashboard } from './dashboard/dashboard'
import { List } from './expenses/list/list'
import { Reports } from './analytics/reports/reports'

export const dashboardRoutes: Route[] = [
  {
    path: '', component: Dashboard, children: [
      { path: 'list', component: List },
      { path: 'analytics', component: Reports}
    ]
  }
]