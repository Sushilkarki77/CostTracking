import { CommonModule } from '@angular/common';
import { Component, model, ModelSignal, signal } from '@angular/core';
import { LucideAngularModule, ChevronLeft, ChevronRight, DollarSign, ChartBar, LayoutDashboard } from 'lucide-angular';





@Component({
  selector: 'dashboard-sidebar',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
 
   readonly chevronLeft = ChevronLeft;
   readonly chevronRight = ChevronRight;


    sideBarItems = [
    { label: 'Dashboard', icon: LayoutDashboard, size: 36, text: '', isHeader: true },
    { label: 'Analytics', icon: ChartBar, size: 18, text: 'Analytics', isHeader: false },
    { label: 'Expenses', icon: DollarSign, size: 18, text: 'Expenses', isHeader: false },
  ];


    expandedState = signal<boolean>(true);


   handleExpandCollapse() {
    this.expandedState.update(prev => !prev);
   }

}
