import { Component, computed, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Wallet,
  Receipt,
  PiggyBank,
  Activity,
  LucideAngularModule,
} from 'lucide-angular';
import { loadExpenses } from '../../../store/expenses/expenses.actions';
import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common';
import { averageDailyExpenses, expensesByCategories, getPast12MonthsExpense, selectExpenseLoading, totalExpenses } from '../../../store/expenses/expenses.selectors';
import { getPast12MonthsIncome, selectIncomeLoading, totalIncome } from '../../../store/income/incomeselectors';
import { loadIncome } from '../../../store/income/income.actions';
import { AuthService } from '../../../core/services/auth-service';
import { NgxEchartsDirective, NgxEchartsModule, provideEchartsCore } from 'ngx-echarts';
import { EChartsOption, PieSeriesOption, SeriesOption } from 'echarts/types/dist/shared';
import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { filter, map, Observable, tap } from 'rxjs';
import { MonthlyExpenses } from '../monthly-expenses/monthly-expenses';


echarts.use([BarChart, GridComponent, CanvasRenderer, PieChart, LegendComponent, TooltipComponent, LineChart]);

const chartOptions: EChartsOption = {
  color: [

    "#EF4444",
    "#2563EB",
    "#B7791F",
    "#10B981",
    "#059669",
    "#F87171",
    "#D69E2E",
    "#CBD5E1"
  ],

  legend: {
    bottom: 0
  },
  series: [

  ]
};
const seriesOption: PieSeriesOption = {
  name: 'Expenses',
  type: 'pie',
  radius: '50%',
  data: [
  ],
  emphasis: {
    itemStyle: {
      shadowBlur: 5,
      shadowOffsetX: 0,
      shadowColor: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }
  },
  label: {
    show: true,
    formatter: '{b}: {d}%'
  }
}



@Component({
  selector: 'app-reports',
  imports: [LucideAngularModule, AsyncPipe, CurrencyPipe, CommonModule, NgxEchartsDirective, MonthlyExpenses],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
  providers: [provideEchartsCore({ echarts })]
})
export class Reports {

  store = inject(Store);

  protected authService = inject(AuthService);

  protected pieChartVisibility = signal<boolean>(false);

  expensesLoading$ = this.store.select(selectExpenseLoading);
  incomeLoading$ = this.store.select(selectIncomeLoading);

  totalExpense$ = this.store.select(totalExpenses);
  totalIncome$ = this.store.select(totalIncome);
  averageDailyExpenses$ = this.store.select(averageDailyExpenses);

  categorizedExpenses$: Observable<{ name: string; value: number; }[]> = this.store.select(expensesByCategories);
  formattedDataForCatChart$: Observable<EChartsOption> = this.categorizedExpenses$.pipe(
    tap(x => this.pieChartVisibility.set(!(x.length === 0))),
    map(x => ({
      ...chartOptions,
      series: [{ ...seriesOption, data: x }]
    }))
  );


  wallet = Wallet;
  receipt = Receipt;
  piggyBank = PiggyBank;
  activity = Activity;

  constructor() {
    this.store.dispatch(loadExpenses());
    this.store.dispatch(loadIncome());
  }

}
