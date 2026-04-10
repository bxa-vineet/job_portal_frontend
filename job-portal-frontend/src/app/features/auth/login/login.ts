import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  username = '';
  password = '';
  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    if (!this.username || !this.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.loading = true;
    this.error = '';

    this.auth.login({ username: this.username, password: this.password })
      .subscribe({
        next: (res) => {
          this.auth.saveToken(res.token);
       
          const role = localStorage.getItem("role");

          this.loading = false;

          if (role === 'EMPLOYER') {
            this.router.navigate(['/employer']);
          } else if (role === 'USER') {
            this.router.navigate(['/user']);
          } else {
            this.router.navigate(['/user']); 
          }
        },
        error: () => {
          this.error = 'Invalid username or password';
          this.loading = false;
        }
      });
  }
}