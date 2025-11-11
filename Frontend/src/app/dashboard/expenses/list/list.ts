import { Component, computed, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { filteredExpensesSummary, selectExpenseError, selectExpenseInitialized, selectExpenseItem, selectExpenseLoading, selectExpensesSummary } from '../../../store/expenses/expenses.selectors';
import { deleteExpense, loadExpenses } from '../../../store/expenses/expenses.actions';
import {  ExpenseSummary, Field } from '../../../common/interfaces/app.interface';
import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe, NgTemplateOutlet } from '@angular/common';
import { Router } from '@angular/router';
import { PaginationComponent } from '../../../common/components/pagination-component/pagination-component';
import { OverlayComponent } from '../../../common/components/overlay-component/overlay-component';
import { ExpenseDetails } from '../expense-details/expense-details';
import { Subject, takeUntil } from 'rxjs';

const Fields: Field<ExpenseSummary>[] = [
  { label: "Name", name: "name", type: "string" },
  { label: "Created", name: "createdAt", type: "date" },
  { label: "Method", name: "paymentMethod", type: "string" },
  { label: "Total", name: "total", type: "curency" }
]

@Component({
  selector: 'app-list',
  imports: [AsyncPipe, ExpenseDetails, DatePipe, CurrencyPipe, PaginationComponent, JsonPipe, OverlayComponent, NgTemplateOutlet],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {
  private componentDestroyed$ = new Subject<boolean>();

  currentPage = signal<number>(0);
  pageSize = 20;
  private store = inject(Store);

  expenses$ = computed(() =>
  
  this.store.select(filteredExpensesSummary(this.currentPage(), this.pageSize))
    
  );

  fields: Field<ExpenseSummary>[] = Fields;
  fieldNames: Omit<(keyof ExpenseSummary)[], 'items'> = this.fields.map(x => x.name);


  loading$ = this.store.select(selectExpenseLoading);
  error$ = this.store.select(selectExpenseError);
  private router = inject(Router);


  @ViewChild('transactionTemplate', { static: true })
  transactionTemplate!: TemplateRef<void>;

  overlayVisibility = signal<boolean>(false);

  selectedItem = signal<ExpenseSummary | null>(null);

  handleClose = () => this.overlayVisibility.update(prev => !prev);

  expenseItemSelected$ = computed(() => {
    const selectedItem = this.selectedItem();
    if (!selectedItem) return null;
    return this.store.select(selectExpenseItem(selectedItem._id))
  })

  actions = [
    {
      name: "delete",
      class: "btn-danger",
      label: '✖',
      function: (exp: ExpenseSummary) => this.handleDelete(exp)
    },
    {
      name: "details",
      class: 'btn-outlined',
      label: '👁‍🗨',
      function: (exp: ExpenseSummary) => this.handleView(exp)
    }
  ]

  constructor() {
     this.store.dispatch(loadExpenses())
  }

  handleDelete = (exp: ExpenseSummary) => {
    const confirmed = window.confirm('Are you sure you want to delete this expense?');
    if (confirmed) {
      this.store.dispatch(deleteExpense({ id: exp._id }));
    }
  }

  handleView = (exp: ExpenseSummary) => {
    this.selectedItem.set(exp)
    this.overlayVisibility.update(prev => !prev);
  }

  handleAddExpense = () => this.router.navigate(['/dashboard/expenses/add'])

  setCurrentPage = (page: number) => this.currentPage.set(page);

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
  }
}