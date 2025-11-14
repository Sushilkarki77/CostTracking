import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Plus, Minus, LucideAngularModule } from 'lucide-angular';
import { Category, Expense, Item } from '../../interfaces/app.interface';

const paymentOptions = [
  { name: 'Credit Card', value: 'credit-card' },
  { name: 'Cash', value: 'cash' },
  { name: 'Debit Card', value: 'debit-card' },
  { name: 'PayPal', value: 'PayPal' },
]

const Currencies = ['USD'];
interface ExpenseFormModel {
  name: FormControl<string>;
  date: FormControl<string>;
  paymentMethod: FormControl<string>;
  note: FormControl<string>;
  items: FormArray<FormGroup<{
    name: FormControl<string>;
    category: FormControl<string>;
    price: FormControl<string>;
    currency: FormControl<string>;
  }>>
}


@Component({
  selector: 'app-expense-form',
  imports: [ReactiveFormsModule, LucideAngularModule, CommonModule],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.scss',
})
export class ExpenseForm {

  expenseItem = input<Expense>();

  e = effect(() => {
    let expenseItem = this.expenseItem()
    if (expenseItem != undefined) {
      const { name, date, paymentMethod, note, items } = expenseItem;
      this.expenseForm.patchValue({ name, date, paymentMethod, note });
       this.expenseForm.controls.items.clear();
      items.forEach(x => this.expenseForm.controls.items.push(this.createItem(x)))
    }
  })

  paymentOptions = paymentOptions;
  private fb = inject(NonNullableFormBuilder);
  add = Plus;
  minus = Minus;

  currencies = Currencies;
  categories = input.required<Category[]>();
  formSubmitted = output<Partial<Expense>>();


  expenseForm!: FormGroup<ExpenseFormModel>;

  constructor() {
    this.expenseForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      date: this.fb.control('', Validators.required),
      paymentMethod: this.fb.control('', Validators.required),
      note: this.fb.control('', Validators.required),
      items: this.fb.array([this.createItem()])
    });
  }


  createItem(item?: Item): FormGroup<{
    name: FormControl<string>;
    category: FormControl<string>;
    price: FormControl<string>;
    currency: FormControl<string>;
  }> {
    return this.fb.group({
      name: this.fb.control(item?.name || '', Validators.required),
      category: this.fb.control(item?.category._id || '', Validators.required),
      price: this.fb.control(item?.price.toString() || '', Validators.required),
      currency: this.fb.control(this.currencies[0], Validators.required)
    });
  }


  get items(): FormArray {
    return this.expenseForm.controls['items'] as FormArray;
  }

  addItem(): void {
    this.items?.push(this.createItem());
  }


  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  handleSubmit() {
    if (!this.expenseForm.value) return;
    const expenseFormValue = { ...this.expenseForm.value };
    const expenseItem = { ...expenseFormValue, items: expenseFormValue?.items?.map(x => ({ ...x, category: this.categories().find(y => y._id === x.category) })) } as Partial<Expense>;
    this.formSubmitted.emit(expenseItem);
    this.expenseForm.reset();
  }

}
