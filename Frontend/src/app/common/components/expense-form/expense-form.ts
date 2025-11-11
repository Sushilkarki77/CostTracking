import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Plus, Minus, LucideAngularModule } from 'lucide-angular';
import { Category } from '../../interfaces/app.interface';

const paymentOptions = [
  { name: 'Credit Card', value: 'credit-card' },
  { name: 'Cash', value: 'cash' },
  { name: 'Debit Card', value: 'debit-card' },
  { name: 'PayPal', value: 'PayPal' },
]

const Currencies = ['USD']

@Component({
  selector: 'app-expense-form',
  imports: [ReactiveFormsModule, LucideAngularModule, CommonModule],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.scss',
})
export class ExpenseForm {

  paymentOptions = paymentOptions;
  private fb = inject(FormBuilder);
  add = Plus;
  minus = Minus;

  currencies = Currencies;

  categories = input<Category[]>();


  expenseForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    transactionDate: ['', Validators.required],
    method: ['selected', Validators.required],
    note: ['', Validators.required],
    items: this.fb.array([this.createItem()])
  });


  get items(): FormArray {
    return this.expenseForm.controls['items'] as FormArray;
  }

  addItem(): void {
    this.items?.push(this.createItem());
  }

  createItem(): FormGroup {
    return this.fb.group({
      itemName: ['', Validators.required],
      category: ['selected', Validators.required],
      price: ['', Validators.required],
      // quantity: [0, Validators.required],
      currency: [this.currencies[0], Validators.required]
    });
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  handleSubmit() {
    console.log(this.expenseForm)
  }


  constructor() {

  }

}
