import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Minus } from 'lucide-angular';
import { LucideAngularModule, Plus } from 'lucide-angular/src/icons';
import { ExpenseForm } from '../../../common/components/expense-form/expense-form';
import { Store } from '@ngrx/store';
import { selectAllCategories, selectCategoryInitialized } from '../../../store/category/category.selectors';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../../common/interfaces/app.interface';
import { loadCategories } from '../../../store/category/category.actions';

@Component({
  selector: 'app-add-expenses',
  imports: [ReactiveFormsModule, LucideAngularModule, CommonModule, ExpenseForm, AsyncPipe],
  templateUrl: './add-expenses.html',
  styleUrl: './add-expenses.scss',
})
export class AddExpenses {
  private store = inject(Store);

  categories: Array<Category> = []; 

  private componentDemounted = new Subject<boolean>();

  categories$ = this.store.select(selectAllCategories)


  private router = inject(Router);

  constructor(){
    this.store.dispatch(loadCategories());
  }


  handleBack() {
    this.router.navigate(['/dashboard/expenses'])
  }

  ngOnDestroy(): void {
    this.componentDemounted.next(true);
    
  }


}
