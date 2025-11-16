import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { filteredIncome, selectIncomeError, selectIncomeItem, selectIncomeLoading } from '../../../store/income/incomeselectors';
import { AsyncPipe, CommonModule, CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
import { createIncome, deleteIncome, loadIncome, updateIncome } from '../../../store/income/income.actions';
import { Income } from '../../../core/interfaces/app.interface';
import { AddIncome } from '../add-income/add-income';
import { OverlayComponent } from '../../../common/components/overlay-component/overlay-component';
import { ArrowDown, ArrowUp, LucideAngularModule, X } from 'lucide-angular';
import { PaginationComponent } from '../../../common/components/pagination-component/pagination-component';
import { IncomeFIlter } from '../income-filter/income-filter';
import { FilterState } from '../income.interface';
import { IsItemActive } from '../../../common/directives/is-item-active';

interface Field {
  name: keyof Income;
  label: string;
  sortable?: boolean;
  type: string;
}

type OverlayType = 'add' | 'edit' | null;

export type SortValues = '-1' | '1';


@Component({
  selector: 'app-incomes-list-component',
  imports: [DatePipe, AsyncPipe, AddIncome, OverlayComponent, LucideAngularModule, CurrencyPipe, PaginationComponent, JsonPipe, CommonModule, IncomeFIlter, IsItemActive],
  templateUrl: './incomes-list-component.html',
  styleUrl: './incomes-list-component.scss',
})
export class IncomesListComponent {

  private store = inject(Store);

  protected currentPage = signal(0);
  protected pageSize = signal(20);

  protected overlayState = signal<OverlayType>(null);
  protected selectedItem = signal<string | null>(null);
  protected error$ = this.store.select(selectIncomeError);
  protected loading$ = this.store.select(selectIncomeLoading);

  protected  sortState = signal<Partial<Record<keyof Income, SortValues>>>({ date: '-1' });
  
  @ViewChild('addIncome') addIncome!: AddIncome;
  @ViewChild('editIncome') editIncome!: AddIncome;

  protected cross = X;
  protected arrowUp = ArrowUp;
  protected arrowDown = ArrowDown;

  protected incomes$ = computed(() =>
    this.store.select(filteredIncome(this.currentPage(), this.pageSize(), this.filterState(), this.sortState()))
  );

  updateSortState = (key: keyof Income, value: '1' | '-1') => {
    const newSortState = { [key]: value }
    this.sortState.update(_ => newSortState)
  }

  protected incomeItemSelected$ = computed(() => {
    const id = this.selectedItem();
    return id ? this.store.select(selectIncomeItem(id)) : null;
  });

  constructor() {
    this.store.dispatch(loadIncome());
  }

  protected fields: Field[] = [
    { label: 'Name', name: 'name', type: 'string' },
    { label: 'Date', name: 'date', type: 'date', sortable: true },
    { label: 'Amount', name: 'amount', type: 'currency', sortable: true },
  ];

  protected fieldNames = this.fields.map(f => f.name);

  protected actions = [
    { name: 'delete', class: 'btn-danger', label: '✖', function: (_id: string) => this.handleDelete(_id) },
    { name: 'edit', class: 'btn-outlined', label: '✏️', function: (_id: string) => this.handleEdit(_id) },
  ];

  protected handleDelete = (_id: string) => {
    if (window.confirm('Are you sure you want to delete this income?')) {
      this.store.dispatch(deleteIncome({ _id }));
    }
  };

  private filterState = signal<Partial<FilterState>>({ name: '', startDate: '', endDate: '' });


  protected filterChanged = (filterState: Partial<FilterState>) => {
    this.currentPage.update(_ => 0);
    this.filterState.update(_ => filterState);
  };

  protected setCurrentPage = (page: number) => this.currentPage.set(page);

  protected handleAdd = () => this.openOverlay('add');

  protected handleEdit = (_id: string) => this.openOverlay('edit', _id);

  protected closeOverlay = () => {
    const activeOverlay = this.overlayState() === 'edit' ? this.editIncome : this.addIncome;

    if (activeOverlay.isTouched() && !activeOverlay.isValid()) {
      if (!window.confirm('Are you sure you want to leave?')) return;
    }

    this.selectedItem.set(null);
    this.overlayState.set(null);
    activeOverlay.reset();
  };

  protected addFormSubmitted = (income: Partial<Income>) => {
    this.closeOverlay();
    this.store.dispatch(createIncome({ income }));
  };

  protected editFormSubmitted = (income: Partial<Income>) => {
    const id = this.selectedItem();
    this.closeOverlay();
    if (id) this.store.dispatch(updateIncome({ _id: id, income }));
  };

  private openOverlay(type: OverlayType, id: string | null = null) {
    this.overlayState.set(type);
    this.selectedItem.set(id);
  }
}
