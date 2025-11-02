import { CommonModule } from '@angular/common';
import { Component, inject, model, ModelSignal, signal } from '@angular/core';
import { LucideAngularModule, ChevronLeft, ChevronRight, DollarSign, ChartBar, LayoutDashboard, BanknoteArrowDown, LogOut } from 'lucide-angular';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../../auth/auth-service';

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

  sideBarItems = [
    { label: 'Dashboard', icon: LayoutDashboard, size: 36, text: '', isHeader: true, route: '' },
    { label: 'Analytics', icon: ChartBar, size: 18, text: 'Analytics', isHeader: false, route: 'analytics' },
    { label: 'Expenses', icon: DollarSign, size: 18, text: 'Expenses', isHeader: false, route: 'expenses' },
    { label: 'Income', icon: BanknoteArrowDown, size: 18, text: 'Income', isHeader: false, route: 'income' },
   
  ];

  logoutItem =  { label: 'Log Out', icon: LogOut, size: 18, text: 'Log Out', isHeader: false, route: 'income' };

  expandedState = signal<boolean>(true);

  handleExpandCollapse(event: Event) {
    event.stopPropagation();
    this.expandedState.update(prev => !prev);
  }

  handleLogout() {
    this.authService.logout();
  }

}
