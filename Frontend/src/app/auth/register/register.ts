import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArrowLeft } from 'lucide-angular';
import {  LucideAngularModule } from 'lucide-angular/src/icons';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../core/services/auth-service';

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
  private authService = inject(AuthService);

  registerForm = this.fb.nonNullable.group({
    fullname: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    confirmPassword: ["", [Validators.required]]
  }, { validators: passwordMatchValidator });


  get emailControl() { return this.registerForm.get('email'); }
  get passwordControl() { return this.registerForm.get('password'); }
  get confirmPasswordControl() { return this.registerForm.get('confirmPassword'); }
  get fullnameControl() { return this.registerForm.get('fullname'); }


  navigateToLogin() {
    this.router.navigate(['/auth/login'])
  }

  handleSubmit() {
    if (!this.registerForm.valid) return;
    const { fullname = '', email = '', password = '' } = this.registerForm.value;
    this.authService.register({ fullname, email, password }).subscribe({
      next: () => {
        window.alert("Registration successful!")
        this.navigateToLogin()
      },
      error: (e: HttpErrorResponse) => { window.alert(e.message) }
    })
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
