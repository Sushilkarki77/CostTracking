import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, switchMap, tap } from 'rxjs';
import { selectExpenseItem } from '../../../store/expenses/expenses.selectors';
import { AsyncPipe } from '@angular/common';
import { loadExpenses, updateExpense } from '../../../store/expenses/expenses.actions';
import { ExpenseForm } from '../../../common/components/expense-form/expense-form';
import { selectAllCategories } from '../../../store/category/category.selectors';
import { loadCategories } from '../../../store/category/category.actions';
import { Expense } from '../../../common/interfaces/app.interface';

@Component({
  selector: 'app-edit-expenses',
  imports: [AsyncPipe, ExpenseForm],
  templateUrl: './edit-expenses.html',
  styleUrl: './edit-expenses.scss',
})
export class EditExpenses {

  store = inject(Store);
  route = inject(ActivatedRoute);
  _id = signal<string>('');
  private router = inject(Router);
  selectedItem$ = this.route.paramMap.pipe(
    map(params => params.get('id')),
    filter((x): x is string => !!x && x !== ''),
    tap(x => this._id.set(x)),
    switchMap(id => this.store.select(selectExpenseItem(id)))
  );

  categories$ = this.store.select(selectAllCategories)

  constructor() {
    this.store.dispatch(loadExpenses());
    this.store.dispatch(loadCategories());
  }

  handleFormSubmitted = (expense: Partial<Expense>) => {
    const _id = this._id();
    this.store.dispatch(updateExpense({ _id, expense }));
    this.handleBack();
  }

  handleBack = () => this.router.navigate(['/dashboard/expenses']);
}
