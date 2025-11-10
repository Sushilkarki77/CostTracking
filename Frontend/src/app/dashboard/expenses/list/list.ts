import { Component, computed, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { filteredExpensesSummary, selectAllExpenses, selectExpenseError, selectExpenseInitialized, selectExpenseLoading, selectExpensesSummary } from '../../../store/expenses/expenses.selectors';
import { loadExpenses } from '../../../store/expenses/expenses.actions';
import { Expense, ExpenseSummary, Field } from '../../../common/interfaces/app.interface';
import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { PaginationComponent } from '../../../common/components/pagination-component/pagination-component';


@Component({
  selector: 'app-list',
  imports: [AsyncPipe, DatePipe, CurrencyPipe, PaginationComponent, JsonPipe],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {

  currentPage = signal<number>(0);
  pageSize = 20;
  private store = inject(Store);
  expenses$ = computed(() =>
    this.store.select(filteredExpensesSummary(this.currentPage(), this.pageSize))
  );

  loading$ = this.store.select(selectExpenseLoading);
  error$ = this.store.select(selectExpenseError);
  private router = inject(Router);


  fields: Field<ExpenseSummary>[] = [
    { label: "Name", name: "name", type: "string" },
    { label: "Created", name: "createdAt", type: "date" },
    { label: "Method", name: "paymentMethod", type: "string" },
    { label: "Total", name: "total", type: "curency" }
  ]

  fieldNames: Omit<(keyof ExpenseSummary)[], 'items'> = this.fields.map(x => x.name);

  actions = [
    {
      name: "delete",
      label: "Delete",
      function: (_id: string) => this.handleDelete(_id)
    },
    {
      name: "details",
      label: "View",
      function: (_id: string) => this.handleDelete(_id)
    }
  ]

  constructor() {

    this.store.select(selectExpenseInitialized).subscribe(loaded => {
      if (!loaded) {
        this.store.dispatch(loadExpenses())
      }
    })

  }

  isString(val: unknown) {
    return typeof val === 'string';
  }


  handleDelete = (id: string) => {

  }

  handleAddExpense = () => {
    this.router.navigate(['/dashboard/expenses/add'])
  }

  setCurrentPage(page: number) {
    this.currentPage.set(page);
  }
}
