import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllIncome } from '../../../store/income/incomeselectors';
import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
import { loadIncome } from '../../../store/income/income.actions';
import { Income } from '../../../common/interfaces/app.interface';
import { AddIncome } from '../add-income/add-income';
import { OverlayComponent } from '../../../common/components/overlay-component/overlay-component';
import { LucideAngularModule, X } from 'lucide-angular';


interface Field {
  name: keyof Income;
  label: string;
  type: string
}

@Component({
  selector: 'app-incomes-list-component',
  imports: [DatePipe, AsyncPipe, AddIncome, OverlayComponent, LucideAngularModule, CurrencyPipe],
  templateUrl: './incomes-list-component.html',
  styleUrl: './incomes-list-component.scss',
})
export class IncomesListComponent {

  private store = inject(Store);
  protected incomes$ = this.store.select(selectAllIncome);
  protected overlayVisibility = signal<boolean>(false);
  protected cross = X;


  constructor() {
    this.store.dispatch(loadIncome())
  }


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

  }

  handleEdit = (_id: string) => {

  }

  handleAdd = () => {
    this.overlayVisibility.update(prev => !prev)
  }

  handleClose = () => {
    this.overlayVisibility.update(prev => !prev)
  }


}
