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
import { averageDailyExpenses, expensesByCategories, getPast12MonthsExpense, totalExpenses } from '../../../store/expenses/expenses.selectors';
import { getPast12MonthsIncome, totalIncome } from '../../../store/income/incomeselectors';
import { loadIncome } from '../../../store/income/income.actions';
import { AuthService } from '../../../core/services/auth-service';
import { NgxEchartsDirective, NgxEchartsModule, provideEchartsCore } from 'ngx-echarts';
import { EChartsOption, PieSeriesOption, SeriesOption } from 'echarts/types/dist/shared';
import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { filter, map, Observable, tap } from 'rxjs';


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
  imports: [LucideAngularModule, AsyncPipe, CurrencyPipe, CommonModule, NgxEchartsDirective],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
  providers: [provideEchartsCore({ echarts })]
})
export class Reports {

  store = inject(Store);

  protected authService = inject(AuthService);

  protected pieChartVisibility = signal<boolean>(false);


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

  past12MonthsIncome$ = this.store.select(getPast12MonthsIncome);
  past12monthsExpenses$ = this.store.select(getPast12MonthsExpense);


  wallet = Wallet;
  receipt = Receipt;
  piggyBank = PiggyBank;
  activity = Activity;

  constructor() {
    this.store.dispatch(loadExpenses());
    this.store.dispatch(loadIncome());
    this.past12MonthsIncome$.subscribe(([x, y]) => {
      this.incomes.set(Array.from(x.values()))
      this.months.set(y)
    }
    );
    this.past12monthsExpenses$.subscribe(([x, _]) => {
      this.expenses.set(Array.from(x.values()))
    }
    );
  }

  months = signal<string[]>(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']);
  expenses = signal<number[]>([5000, 4500, 6000, 5500, 7000, 6500, 7000, 8000, 9000, 6000, 7000, 6000]);
  incomes = signal<number[]>([8000, 5000, 9000, 8500, 8000, 7500, 6000, 7000, 8000, 9000, 4000, 12000]);


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
  }




  )


}
