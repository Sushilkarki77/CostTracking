import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ArrowLeft, ArrowRight } from 'lucide-angular';
import { ChevronLeft, LucideAngularModule } from 'lucide-angular/src/icons';

@Component({
  selector: 'app-register',
  imports: [LucideAngularModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  readonly chevronLeft = ArrowLeft;

  private router = inject(Router)

  navigateToLogin(){
    this.router.navigate(['/auth/login'])
  }

}
