import { Component, inject, output } from '@angular/core';
import { selectAllCategories } from '../../../store/category/category.selectors';
import { Store } from '@ngrx/store';
import { loadCategories } from '../../../store/category/category.actions';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { FilterState } from '../expenses.interfaces';

@Component({
  selector: 'app-expenses-filter',
  imports: [ ReactiveFormsModule],
  templateUrl: './expenses-filter.html',
  styleUrl: './expenses-filter.scss',
})
export class ExpensesFilter {

  private store = inject(Store);

  protected filterStateChanged = output<Partial<FilterState>>();

  private componentDestroyed = new Subject<boolean>()

  categories$ = this.store.select(selectAllCategories);

  filterForm = inject(FormBuilder).nonNullable.group({
    name: [''],
    startDate: [''],
    endDate: [''],
   
  });

  ngOnDestroy(): void {
    this.componentDestroyed.next(true);
  }

  constructor() {
    this.store.dispatch(loadCategories());
    this.filterForm.valueChanges.pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.componentDestroyed)).subscribe(res => {
      this.filterStateChanged.emit(res);
    });
  }

  handleClear = () => this.filterForm.reset();
}
