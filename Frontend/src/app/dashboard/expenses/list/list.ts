import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllExpenses } from '../../../store/expenses/expenses.selectors';
import { loadExpenses } from '../../../store/expenses/expenses.actions';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {

  private store = inject(Store);
  expenses$ = this.store.select(selectAllExpenses);

  constructor(){
     this.store.dispatch(loadExpenses())
     this.store.select(selectAllExpenses).subscribe(console.log)
  }
}
