import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArrowRight } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular/src/icons';

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

  loginForm = this.fb.group({
    email: ["",[ Validators.required, Validators.email]],
    password: ["", [Validators.required]]
  });


  formControl(control: 'email' | 'password'){
    return this.loginForm.controls[control]
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }

  handleLoginSubmit(){
    if(!this.loginForm.valid) return;
    
     console.log(this.loginForm.value)
  }

  

}
