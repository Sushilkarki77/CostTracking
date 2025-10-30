import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ArrowRight } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular/src/icons';

@Component({
  selector: 'app-login',
  imports: [LucideAngularModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  readonly chevronRight = ArrowRight;

  private router = inject(Router);

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }

}
