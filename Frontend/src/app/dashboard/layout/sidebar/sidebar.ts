import { CommonModule } from '@angular/common';
import { Component, model, ModelSignal, signal } from '@angular/core';
import { LucideAngularModule, ChevronLeft, ChevronRight, DollarSign, ChartBar, LayoutDashboard, Route } from 'lucide-angular';
import { RouterLink, RouterLinkActive } from "@angular/router";





@Component({
  selector: 'dashboard-sidebar',
  imports: [LucideAngularModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  readonly chevronLeft = ChevronLeft;
  readonly chevronRight = ChevronRight;

  sideBarItems = [
    { label: 'Dashboard', icon: LayoutDashboard, size: 36, text: '', isHeader: true, route: '' },
    { label: 'Analytics', icon: ChartBar, size: 18, text: 'Analytics', isHeader: false, route: 'analytics' },
    { label: 'Expenses', icon: DollarSign, size: 18, text: 'Expenses', isHeader: false, route: 'expenses' },
  ];

  expandedState = signal<boolean>(true);

  handleExpandCollapse(event: Event) {
    event.stopPropagation();
    this.expandedState.update(prev => !prev);
  }

}
