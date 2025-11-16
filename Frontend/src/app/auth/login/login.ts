import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArrowRight } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular/src/icons';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-login',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  readonly chevronRight = ArrowRight;

  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  loginForm = this.fb.nonNullable.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]]
  });


  formControl(control: 'email' | 'password') {
    return this.loginForm.controls[control]
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }

  handleLoginSubmit() {
    if (!this.loginForm.valid) return;

    const { email = '', password = '' } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({
      next: (res) => {
        const { accessToken, refreshToken } = res.data;
        this.authService.setTokens(accessToken, refreshToken);
        window.alert("Login successful!")
        this.router.navigate(['dashboard']);
      },
      error: (e: HttpErrorResponse) => {
        window.alert(e.message);
      }
    });
  }
}
