import { CommonModule, JsonPipe } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { EChartsOption } from 'echarts/types/dist/shared';
import { NgxEchartsDirective } from 'ngx-echarts';
import { getPast12MonthsIncome } from '../../../store/income/incomeselectors';
import { getPast12MonthsExpense } from '../../../store/expenses/expenses.selectors';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-monthly-expenses',
  imports: [CommonModule, NgxEchartsDirective, JsonPipe],
  templateUrl: './monthly-expenses.html',
  styleUrl: './monthly-expenses.scss',
})
export class MonthlyExpenses {
  store = inject(Store);
  past12MonthsIncome$ = this.store.select(getPast12MonthsIncome);
  past12monthsExpenses$ = this.store.select(getPast12MonthsExpense);
  loading = signal<boolean>(true);
  error = signal<Error | null>(null);

  constructor() {

    combineLatest([this.past12MonthsIncome$, this.past12monthsExpenses$]).subscribe({
      next: ([income, expense]) => {
        const [incomesMonths, months] = income;
        const [expenses, _] = expense;

        this.incomes.set(Array.from(incomesMonths.values()));
        this.months.set(months);
        this.expenses.set(Array.from(expenses.values()));
        this.loading.set(false);
      },
      error: (err) => {
        console.error("Error occurred:", err);
        this.loading.set(false);
        this.error.set(err)
      }
    });


  }

  months = signal<string[]>([]);
  expenses = signal<number[]>([]);
  incomes = signal<number[]>([]);


  lineChartOptions$ = computed(() => {
    const lineChartOptions: EChartsOption = {
      color: ['#EF4444', '#10B981'],
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        bottom: 0,
        left: 'center',
        textStyle: {
          fontSize: 10,
          color: '#374151'
        },
        data: ['Expenses', 'Incomes']
      },
      xAxis: {
        type: 'category',
        data: this.months(),
        name: 'Month',
        axisLabel: { fontSize: 12 }

      },
      yAxis: {
        type: 'value',
        name: 'Amount ($)',
        axisLabel: { fontSize: 12 }
      },
      series: [
        {
          name: 'Expenses',
          type: 'line',
          smooth: true,
          data: this.expenses(),
          label: {
            show: true,
            formatter: '${c}'
          },
          itemStyle: {
            color: '#EF4444'
          }
        },
        {
          name: 'Incomes',
          type: 'line',
          smooth: true,
          data: this.incomes(),
          label: {
            show: true,
            formatter: '${c}'
          },
          itemStyle: {
            color: '#10B981'
          }
        }
      ]
    };
    return lineChartOptions;
  })

}
