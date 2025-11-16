import { Component, input } from '@angular/core';
import { Expense, ExpenseSummary } from '../../../core/interfaces/app.interface';
import { DatePipe, DecimalPipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-expense-details',
  imports: [DecimalPipe, DatePipe, UpperCasePipe],
  templateUrl: './expense-details.html',
  styleUrl: './expense-details.scss',
})
export class ExpenseDetails {


  expSummary$ = input.required<ExpenseSummary>();
  expenseItem$ = input.required<Expense>()


}
