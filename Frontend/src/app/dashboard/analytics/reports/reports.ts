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

const chartPalette = [
  '#6366F1', // indigo (brand)
  '#10B981', // emerald
  '#F59E0B', // amber
  '#EF4444', // red
  '#0EA5E9', // sky
  '#8B5CF6', // violet
  '#EC4899', // pink
  '#14B8A6', // teal
];

const chartOptions: EChartsOption = {
  color: chartPalette,
  textStyle: {
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  tooltip: {
    trigger: 'item',
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    padding: [8, 12],
    textStyle: { color: '#111827', fontSize: 12 },
    extraCssText: 'box-shadow: 0 8px 24px rgba(16,24,40,0.12); border-radius: 8px;',
    formatter: (params: any) => {
      const value = Number(params.value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      const percent = Number(params.percent).toFixed(2);
      return `${params.name}<br/>$${value} (${percent}%)`;
    },
  },
  legend: {
    type: 'scroll',
    orient: 'vertical',
    right: 8,
    top: 'middle',
    icon: 'circle',
    itemWidth: 8,
    itemHeight: 8,
    itemGap: 10,
    textStyle: { color: '#6b7280', fontSize: 12 },
    pageIconColor: '#6366F1',
    pageTextStyle: { color: '#6b7280' },
  },
  series: [

  ]
};
const seriesOption: PieSeriesOption = {
  name: 'Expenses',
  type: 'pie',
  radius: ['45%', '72%'],
  center: ['32%', '50%'],
  avoidLabelOverlap: true,
  itemStyle: {
    borderColor: '#ffffff',
    borderWidth: 2,
    borderRadius: 6,
  },
  data: [
  ],
  emphasis: {
    label: {
      show: false,
    },
    itemStyle: {
      shadowBlur: 12,
      shadowOffsetX: 0,
      shadowColor: 'rgba(16, 24, 40, 0.18)',
    }
  },
  label: {
    show: false,
  },
  labelLine: {
    show: false,
  },
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
