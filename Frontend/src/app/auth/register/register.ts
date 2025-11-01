import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArrowLeft, ArrowRight } from 'lucide-angular';
import { ChevronLeft, LucideAngularModule } from 'lucide-angular/src/icons';

@Component({
  selector: 'app-register',
  imports: [LucideAngularModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  readonly chevronLeft = ArrowLeft;

  private router = inject(Router);
  private fb = inject(FormBuilder);

  registerForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    confirmPassword: ["", [Validators.required]]
  }, { validators: passwordMatchValidator });


  get emailControl() { return this.registerForm.get('email'); }
  get passwordControl() { return this.registerForm.get('password'); }
  get confirmPasswordControl() { return this.registerForm.get('confirmPassword'); }


  navigateToLogin() {
    this.router.navigate(['/auth/login'])
  }

  handleSubmit() {
    if (!this.registerForm.valid) return;
  }
}


const passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const passowrd = group.get('password');
  const confirmPassword = group.get('confirmPassword');

  if (!passowrd?.value || !confirmPassword?.value) {
    return null;
  }

  if (confirmPassword.errors && !confirmPassword.errors['mismatch']) {
    return null;
  }


  if (passowrd.value !== confirmPassword.value) {
    confirmPassword.setErrors({ mismatch: true });

  } else {
    confirmPassword.setErrors(null);

  }

  return null;
}
