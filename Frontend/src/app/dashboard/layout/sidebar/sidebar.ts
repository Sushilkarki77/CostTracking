import { CommonModule } from '@angular/common';
import { Component, inject, model, ModelSignal, signal } from '@angular/core';
import { LucideAngularModule, ChevronLeft, ChevronRight, DollarSign, ChartBar, LayoutDashboard, BanknoteArrowDown, LogOut, ListCollapse } from 'lucide-angular';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CategoryListComponent } from '../../category/category-list-component/category-list-component';
import { AuthService } from '../../../common/services/auth-service';
import { Store } from '@ngrx/store';
import { logoutAction } from '../../../store/clear-state.metareducer';

@Component({
  selector: 'dashboard-sidebar',
  imports: [LucideAngularModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  readonly chevronLeft = ChevronLeft;
  readonly chevronRight = ChevronRight;

  private authService = inject(AuthService);
  private store = inject(Store);

  sideBarItems = [
    { label: 'Dashboard', icon: LayoutDashboard, size: 36, text: '', isHeader: true, route: '' },
    { label: 'Analytics', icon: ChartBar, size: 18, text: 'Analytics', isHeader: false, route: 'analytics' },
    { label: 'Category', icon: ListCollapse, size: 18, text: 'category', isHeader: false, route: 'category' },
    { label: 'Expenses', icon: DollarSign, size: 18, text: 'Expenses', isHeader: false, route: 'expenses' },
    { label: 'Income', icon: BanknoteArrowDown, size: 18, text: 'Income', isHeader: false, route: 'income' },

  ];

  logoutItem = { label: 'Log Out', icon: LogOut, size: 18, text: 'Log Out', isHeader: false, route: 'income' };

  expandedState = signal<boolean>(true);

  handleExpandCollapse(event: Event) {
    event.stopPropagation();
    this.expandedState.update(prev => !prev);
  }

  handleLogout() {
    this.authService.logout();
    this.store.dispatch(logoutAction())
  }

}
