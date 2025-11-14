import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {  ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule, Plus } from 'lucide-angular/src/icons';
import { ExpenseForm } from '../../../common/components/expense-form/expense-form';
import { Store } from '@ngrx/store';
import { selectAllCategories } from '../../../store/category/category.selectors';
import { Category, Expense } from '../../../common/interfaces/app.interface';
import { loadCategories } from '../../../store/category/category.actions';
import {  createExpense } from '../../../store/expenses/expenses.actions';

@Component({
  selector: 'app-add-expenses',
  imports: [ReactiveFormsModule, LucideAngularModule, CommonModule, ExpenseForm, AsyncPipe],
  templateUrl: './add-expenses.html',
  styleUrl: './add-expenses.scss',
})
export class AddExpenses {
  private store = inject(Store);
  categories$ = this.store.select(selectAllCategories);

  categories: Array<Category> = [];
  private router = inject(Router);

  constructor() {
    this.store.dispatch(loadCategories());
  }

  handleBack = () =>  this.router.navigate(['/dashboard/expenses']);
  
  handleFormSubmitted(expense: Partial<Expense>) {
    this.store.dispatch(createExpense({ expense }));
    this.handleBack();
  }
}
