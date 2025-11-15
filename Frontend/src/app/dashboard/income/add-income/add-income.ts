import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Income } from '../../../common/interfaces/app.interface';

@Component({
  selector: 'app-add-income',
  imports: [ReactiveFormsModule],
  templateUrl: './add-income.html',
  styleUrl: './add-income.scss',
})
export class AddIncome {

  private fb = inject(FormBuilder);

  income = input<Income | null>();

  formSubmitted = output<Partial<Income>>()

  incomeForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    amount: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
    date: ['', Validators.required],
    currency: ['USD'],
    note: ['']
  });

  e = effect(() => {
    let income = this.income()
    if (income != undefined) {
      const { name, date, amount, note, currency } = income;
      this.incomeForm.patchValue({ name, date, note, currency, amount });
    }
  })


  submit() {
    if (this.incomeForm.invalid) {
      this.incomeForm.markAllAsTouched();
      return;
    }
    this.formSubmitted.emit(this.incomeForm.value);
    this.incomeForm.reset();
  }
}
