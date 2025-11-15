import { Component, computed, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { filteredIncome, selectAllIncome, selectIncomeItem } from '../../../store/income/incomeselectors';
import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
import { addIncome, createIncome, deleteIncome, loadIncome, updateIncome } from '../../../store/income/income.actions';
import { Income } from '../../../common/interfaces/app.interface';
import { AddIncome } from '../add-income/add-income';
import { OverlayComponent } from '../../../common/components/overlay-component/overlay-component';
import { LucideAngularModule, X } from 'lucide-angular';
import { PaginationComponent } from '../../../common/components/pagination-component/pagination-component';


interface Field {
  name: keyof Income;
  label: string;
  type: string
}

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
  protected incomes$ = computed(() => this.store.select(filteredIncome(this.currentPage(), this.pageSize())));
  protected overlayVisibility = signal<boolean>(false);
  protected cross = X;
  private selectedItem = signal<string | null>(null);

  incomeItemSelected$ = computed(() => {
    const selectedItem = this.selectedItem();
    if (!selectedItem) return null;
    return this.store.select(selectIncomeItem(selectedItem))
  })

  constructor() { this.store.dispatch(loadIncome()) }

  fields: Field[] = [
    { label: "Name", name: "name", type: "string" },
    { label: "Date", name: "date", type: "date" },
    { label: "Amount", name: "amount", type: "curency" },
  ]

  fieldNames = this.fields.map(x => x.name);

  actions = [
    {
      name: "delete",
      class: "btn-danger",
      label: '✖',
      function: (_id: string) => this.handleDelete(_id)
    },
    {
      name: "edit",
      class: 'btn-outlined',
      label: '✏️',
      function: (_id: string) => this.handleEdit(_id)
    }
  ]

  handleDelete = (_id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this expense?');
    if (confirmed) {
      this.store.dispatch(deleteIncome({ _id }));
    }
  }

  handleEdit = (_id: string) => {
    this.overlayVisibility.update(x => !x);
    this.selectedItem.set(_id);
  }

  handleAdd = () => this.overlayVisibility.update(prev => !prev)

  handleClose = () => this.overlayVisibility.update(prev => !prev)

  setCurrentPage = (page: number) => this.currentPage.set(page);

  formSubmitted = (income: Partial<Income>) => {
    this.overlayVisibility.update(x => !x);

    const selectedItem = this.selectedItem();

    if (selectedItem) {
      this.store.dispatch(
        updateIncome({ _id: selectedItem, income })
      );
      this.selectedItem.set(null);
    } else {
      this.store.dispatch(
        createIncome({ income })
      );
    }
  };

}
