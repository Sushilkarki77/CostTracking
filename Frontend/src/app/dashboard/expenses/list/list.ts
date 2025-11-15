import { Component, computed, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { filteredExpensesSummary, selectExpenseError, selectExpenseItem, selectExpenseLoading } from '../../../store/expenses/expenses.selectors';
import { deleteExpense, loadExpenses } from '../../../store/expenses/expenses.actions';
import { ExpenseSummary, Field } from '../../../common/interfaces/app.interface';
import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe, NgTemplateOutlet } from '@angular/common';
import { Router } from '@angular/router';
import { PaginationComponent } from '../../../common/components/pagination-component/pagination-component';
import { OverlayComponent } from '../../../common/components/overlay-component/overlay-component';
import { ExpenseDetails } from '../expense-details/expense-details';
import { ExpensesFilter } from '../expenses-filter/expenses-filter';
import { Fields, FilterState, SortValues } from '../expenses.interfaces';
import { ArrowDown, ArrowUp, LucideAngularModule, X } from 'lucide-angular';
import { IsItemActive } from '../../../common/directives/is-item-active';

@Component({
  selector: 'app-list',
  imports: [LucideAngularModule, AsyncPipe, ExpenseDetails, DatePipe, CurrencyPipe, PaginationComponent, JsonPipe, OverlayComponent, NgTemplateOutlet, ExpensesFilter, IsItemActive],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {
  currentPage = signal<number>(0);
  pageSize = 20;
  private store = inject(Store);

  private filterState = signal<Partial<FilterState>>({ name: '', startDate: '', endDate: '' });
  sortState = signal<Partial<Record<keyof ExpenseSummary, SortValues>>>({ date: '-1' });
  expenses$ = computed(() => this.store.select(filteredExpensesSummary(this.currentPage(), this.pageSize, this.filterState(), this.sortState())));
  protected arrowUp = ArrowUp;
  protected arrowDown = ArrowDown;
  protected cross = X;

  fields: Field<ExpenseSummary>[] = Fields;
  fieldNames: Omit<(keyof ExpenseSummary)[], 'items'> = this.fields.map(x => x.name);

  loading$ = this.store.select(selectExpenseLoading);
  error$ = this.store.select(selectExpenseError);
  private router = inject(Router);

  @ViewChild('transactionTemplate', { static: true }) transactionTemplate!: TemplateRef<void>;

  overlayVisibility = signal<boolean>(false);

  selectedItem = signal<ExpenseSummary | null>(null);

  constructor() { this.store.dispatch(loadExpenses()) }

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
    },
     {
      name: "edit",
      class: 'btn-outlined',
      label: '✏️',
      function: (exp: ExpenseSummary) => this.handleEdit(exp)
    }
  ]

  handleDelete = (exp: ExpenseSummary) => {
    const confirmed = window.confirm('Are you sure you want to delete this expense?');
    if (confirmed) {
      this.store.dispatch(deleteExpense({ _id: exp._id }));
    }
  }

  handleView = (exp: ExpenseSummary) => {
    this.selectedItem.set(exp)
    this.overlayVisibility.update(prev => !prev);
  }

  handleEdit = (exp: ExpenseSummary) => this.router.navigate([`/dashboard/expenses/edit/${exp._id}`]);

  handleAddExpense = () => this.router.navigate(['/dashboard/expenses/add']);

  setCurrentPage = (page: number) => this.currentPage.set(page);

  filterChanged = (filterState: Partial<FilterState>) => {
    this.currentPage.update(_ => 0);
    this.filterState.update(_ => filterState);
  }

  updateSortState = (key: keyof ExpenseSummary, value: '1' | '-1') => {
    const newSortState = { [key]: value }
    this.sortState.update(_ => newSortState)
  }
}