import { Component, inject, output } from '@angular/core';
import { loadCategories } from '../../../store/category/category.actions';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { selectAllCategories } from '../../../store/category/category.selectors';
import { FilterState } from '../../expenses/expenses.interfaces';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-income-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './income-filter.html',
  styleUrl: './income-filter.scss',
})
export class IncomeFIlter {

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
