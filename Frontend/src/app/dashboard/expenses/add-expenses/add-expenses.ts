import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule, Plus } from 'lucide-angular/src/icons';
import { ExpenseForm } from '../../../common/components/expense-form/expense-form';
import { Store } from '@ngrx/store';
import { selectAllCategories } from '../../../store/category/category.selectors';
import { CanComponentDeactivate, Category, Expense } from '../../../core/interfaces/app.interface';
import { loadCategories } from '../../../store/category/category.actions';
import { createExpense } from '../../../store/expenses/expenses.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-expenses',
  imports: [ReactiveFormsModule, LucideAngularModule, CommonModule, ExpenseForm, AsyncPipe],
  templateUrl: './add-expenses.html',
  styleUrl: './add-expenses.scss',
})
export class AddExpenses implements CanComponentDeactivate {
  private store = inject(Store);
  categories$ = this.store.select(selectAllCategories);

  categories: Array<Category> = [];
  private router = inject(Router);

  constructor() {
    this.store.dispatch(loadCategories());
  }

  @ViewChild('formComponent') form!: ExpenseForm;

  canDeactivate(): boolean {
    const formStatus = this.form.expenseForm.valid;
    const formTouched = this.form.expenseForm.touched;
    if (formTouched && !formStatus) {
      return confirm('You have unsaved changes! Do you really want to leave?');
    }
    return true;
  }

  handleBack = () => this.router.navigate(['/dashboard/expenses']);

  handleFormSubmitted(expense: Partial<Expense>) {
    this.store.dispatch(createExpense({ expense }));
    this.handleBack();
  }
}
