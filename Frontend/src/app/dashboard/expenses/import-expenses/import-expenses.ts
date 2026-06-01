import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { LucideAngularModule, Upload, Download, FileText } from 'lucide-angular';
import * as Papa from 'papaparse';
import { selectAllCategories } from '../../../store/category/category.selectors';
import { loadCategories } from '../../../store/category/category.actions';
import { bulkImportExpenses } from '../../../store/expenses/expenses.actions';
import { Category, Expense } from '../../../core/interfaces/app.interface';

const PAYMENT_METHODS = ['credit-card', 'cash', 'debit-card', 'PayPal'];
const DEFAULT_CURRENCY = 'USD';

const TEMPLATE_HEADERS = ['date', 'name', 'paymentMethod', 'note', 'category', 'itemName', 'price', 'currency'];

interface ParsedRow {
  rowNumber: number;
  raw: Record<string, string>;
  expense?: Partial<Expense>;
  errors: string[];
}

interface ImportSummary {
  imported: number;
}

@Component({
  selector: 'app-import-expenses',
  imports: [LucideAngularModule],
  templateUrl: './import-expenses.html',
  styleUrl: './import-expenses.scss',
})
export class ImportExpenses {
  private store = inject(Store);
  private router = inject(Router);

  protected upload = Upload;
  protected download = Download;
  protected fileIcon = FileText;

  readonly paymentMethods = PAYMENT_METHODS;

  private categories = toSignal(this.store.select(selectAllCategories), { initialValue: [] as Category[] });

  fileName = signal<string>('');
  parseError = signal<string>('');
  rows = signal<ParsedRow[]>([]);
  summary = signal<ImportSummary | null>(null);

  validRows = computed(() => this.rows().filter(r => r.errors.length === 0));
  invalidRows = computed(() => this.rows().filter(r => r.errors.length > 0));
  hasRows = computed(() => this.rows().length > 0);

  constructor() {
    this.store.dispatch(loadCategories());
  }

  private categoryByName = computed(() => {
    const map = new Map<string, Category>();
    for (const c of this.categories()) {
      map.set(c.name.trim().toLowerCase(), c);
    }
    return map;
  });

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.reset();
    this.fileName.set(file.name);

    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
      complete: (result) => {
        if (result.errors?.length) {
          this.parseError.set(result.errors[0].message);
        }
        this.rows.set(result.data.map((raw, i) => this.validateRow(raw, i + 2)));
      },
      error: (err) => this.parseError.set(err.message),
    });

    input.value = '';
  }

  private validateRow(raw: Record<string, string>, rowNumber: number): ParsedRow {
    const errors: string[] = [];
    const get = (key: string) => (raw[key] ?? '').trim();

    const date = get('date');
    const name = get('name');
    const paymentMethod = get('paymentMethod');
    const note = get('note');
    const categoryName = get('category');
    const itemName = get('itemName');
    const priceRaw = get('price');
    const currency = get('currency') || DEFAULT_CURRENCY;

    if (!date) errors.push('date is required');
    if (!name) errors.push('name is required');
    if (!paymentMethod) {
      errors.push('paymentMethod is required');
    } else if (!PAYMENT_METHODS.includes(paymentMethod)) {
      errors.push(`paymentMethod must be one of: ${PAYMENT_METHODS.join(', ')}`);
    }
    if (!itemName) errors.push('itemName is required');

    const price = Number(priceRaw);
    if (!priceRaw) {
      errors.push('price is required');
    } else if (Number.isNaN(price)) {
      errors.push('price must be a number');
    }

    let category: Category | undefined;
    if (!categoryName) {
      errors.push('category is required');
    } else {
      category = this.categoryByName().get(categoryName.toLowerCase());
      if (!category) errors.push(`category "${categoryName}" does not exist`);
    }

    const row: ParsedRow = { rowNumber, raw, errors };

    if (errors.length === 0 && category) {
      row.expense = {
        name,
        date,
        paymentMethod,
        note,
        items: [
          {
            name: itemName,
            price,
            currency,
            category: { _id: category._id, name: category.name },
          },
        ],
      };
    }

    return row;
  }

  handleImport(): void {
    const expenses = this.validRows().map(r => r.expense as Partial<Expense>);
    if (!expenses.length) return;
    this.store.dispatch(bulkImportExpenses({ expenses }));
    this.summary.set({ imported: expenses.length });
    this.rows.set([]);
    this.fileName.set('');
  }

  downloadTemplate(): void {
    const sample = [
      TEMPLATE_HEADERS.join(','),
      ['2026-05-31', 'Groceries', 'debit-card', 'Weekly shop', 'Food', 'Supermarket run', '54.20', 'USD'].join(','),
    ].join('\n');

    const blob = new Blob([sample], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'expenses-import-template.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  private reset(): void {
    this.rows.set([]);
    this.parseError.set('');
    this.summary.set(null);
  }

  handleBack = () => this.router.navigate(['/dashboard/expenses']);
}
