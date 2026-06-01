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
      textStyle: {
        fontFamily: 'Inter, system-ui, sans-serif',
      },
      grid: {
        top: 24,
        left: 12,
        right: 16,
        bottom: 40,
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#ffffff',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: [8, 12],
        textStyle: { color: '#111827', fontSize: 12 },
        extraCssText: 'box-shadow: 0 8px 24px rgba(16,24,40,0.12); border-radius: 8px;',
        formatter: (params: any) => {
          const rows = params.map((p: any) => {
            const value = Number(p.value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            return `${p.marker} ${p.seriesName}: $${value}`;
          });
          return `${params[0].axisValue}<br/>${rows.join('<br/>')}`;
        },
      },
      legend: {
        bottom: 0,
        left: 'center',
        icon: 'circle',
        itemWidth: 8,
        itemHeight: 8,
        textStyle: {
          fontSize: 11,
          color: '#6b7280'
        },
        data: ['Expenses', 'Incomes']
      },
      xAxis: {
        type: 'category',
        data: this.months(),
        boundaryGap: false,
        axisLine: { lineStyle: { color: '#e5e7eb' } },
        axisTick: { show: false },
        axisLabel: { fontSize: 11, color: '#6b7280' }
      },
      yAxis: {
        type: 'value',
        name: 'Amount ($)',
        nameTextStyle: { color: '#9ca3af', fontSize: 11 },
        axisLabel: { fontSize: 11, color: '#6b7280' },
        splitLine: { lineStyle: { color: '#f3f4f6' } }
      },
      series: [
        {
          name: 'Expenses',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          showSymbol: false,
          data: this.expenses(),
          lineStyle: { width: 2.5 },
          areaStyle: { color: 'rgba(239, 68, 68, 0.08)' },
          label: {
            show: true,
            color: '#6b7280',
            fontSize: 10,
            formatter: (p: any) => '$' + Number(p.value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          },
          itemStyle: {
            color: '#EF4444'
          }
        },
        {
          name: 'Incomes',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          showSymbol: false,
          data: this.incomes(),
          lineStyle: { width: 2.5 },
          areaStyle: { color: 'rgba(16, 185, 129, 0.08)' },
          label: {
            show: true,
            color: '#6b7280',
            fontSize: 10,
            formatter: (p: any) => '$' + Number(p.value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
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
