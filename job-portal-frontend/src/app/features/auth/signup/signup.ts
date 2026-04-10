import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {

  name = '';
  username = '';
  email = '';
  password = '';
  role = 'USER';
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    if (!this.name || !this.username || !this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long';
      return;
    }

    const payload = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      roles: [this.role]
    };

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.auth.register(payload).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = ' Account created successfully! Redirecting to login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'Registration failed. Please try again.';
      }
    });
  }

  clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }
}