import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { filteredIncome, selectIncomeItem } from '../../../store/income/incomeselectors';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { createIncome, deleteIncome, loadIncome, updateIncome } from '../../../store/income/income.actions';
import { Income } from '../../../common/interfaces/app.interface';
import { AddIncome } from '../add-income/add-income';
import { OverlayComponent } from '../../../common/components/overlay-component/overlay-component';
import { LucideAngularModule, X } from 'lucide-angular';
import { PaginationComponent } from '../../../common/components/pagination-component/pagination-component';

interface Field {
  name: keyof Income;
  label: string;
  type: string;
}

type OverlayType = 'add' | 'edit' | null;

@Component({
  selector: 'app-incomes-list-component',
  imports: [DatePipe, AsyncPipe, AddIncome, OverlayComponent, LucideAngularModule, CurrencyPipe, PaginationComponent],
  templateUrl: './incomes-list-component.html',
  styleUrl: './incomes-list-component.scss',
})
export class IncomesListComponent {

  private store = inject(Store);

  protected currentPage = signal(0);
  protected pageSize = signal(10);

  protected overlayState = signal<OverlayType>(null);
  protected selectedItem = signal<string | null>(null);

  @ViewChild('addIncome') addIncome!: AddIncome;
  @ViewChild('editIncome') editIncome!: AddIncome;

  protected cross = X;

  protected incomes$ = computed(() =>
    this.store.select(filteredIncome(this.currentPage(), this.pageSize()))
  );

  protected incomeItemSelected$ = computed(() => {
    const id = this.selectedItem();
    return id ? this.store.select(selectIncomeItem(id)) : null;
  });

  constructor() {
    this.store.dispatch(loadIncome());
  }

  protected fields: Field[] = [
    { label: 'Name', name: 'name', type: 'string' },
    { label: 'Date', name: 'date', type: 'date' },
    { label: 'Amount', name: 'amount', type: 'currency' },
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
