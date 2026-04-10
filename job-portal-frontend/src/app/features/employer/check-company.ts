import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  template: `<p>Checking company...</p>`
})
export class CheckCompany {

  constructor(private http: HttpClient, private router: Router) {
    this.checkCompany();
  }

  checkCompany() {
    this.http.get('http://localhost:8080/api/company/my').subscribe({
      next: () => {
        this.router.navigate(['/employer/jobs']);
      },
      error: () => {
        this.router.navigate(['/employer/create-company']);
      }
    });
  }
}