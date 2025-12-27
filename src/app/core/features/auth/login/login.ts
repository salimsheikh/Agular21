import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private authService = inject(AuthService);

  login: any = {
    email: 'admin@test.com',
    password: '123456'
  };

  public loginError: string | null = null;
  public successLogin: string | null = null;
  onLogin() {
    this.loginError = null;
    this.successLogin = null;

    this.authService.login(this.login).subscribe({
      next: () => {
        this.successLogin = 'Successfully logged in.';
        this.router.navigateByUrl('/dashboard');
        this.cdr.markForCheck();
      },
      error: err => {
        this.loginError =
          err.status === 401 && err.error?.message
            ? err.error.message
            : 'Something went wrong. Please try again.';
        this.cdr.markForCheck();
      }
    });
  }
}
