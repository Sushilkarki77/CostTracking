import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Wallet,
  Receipt,
  PiggyBank,
  Activity,
  LucideAngularModule
} from 'lucide-angular';
import { loadExpenses } from '../../../store/expenses/expenses.actions';
import { AsyncPipe, CurrencyPipe, JsonPipe } from '@angular/common';
import { avarageDailyExpenses, totalExpenses } from '../../../store/expenses/expenses.selectors';
import { totalIncome } from '../../../store/income/incomeselectors';
import { loadIncome } from '../../../store/income/income.actions';




@Component({
  selector: 'app-reports',
  imports: [LucideAngularModule, AsyncPipe, CurrencyPipe],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
  providers: []
})
export class Reports {

  store = inject(Store);


  totalExpense$ = this.store.select(totalExpenses);
  totalIncome$ = this.store.select(totalIncome);
  avarageDailyExpenses$ = this.store.select(avarageDailyExpenses);


  wallet = Wallet;
  receipt = Receipt;
  piggyBank = PiggyBank;
  activity = Activity;


  constructor() {
    this.store.dispatch(loadExpenses());
    this.store.dispatch(loadIncome());
  }

}
