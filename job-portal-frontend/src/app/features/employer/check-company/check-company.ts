import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Company } from '../company.model';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './check-company.html',
  styleUrls: ['./check-company.css']
})
export class CheckCompany implements OnInit {

  loading = true;
  message = '';

  constructor(private companyService: CompanyService, private router: Router) {}

  ngOnInit() {
    this.checkCompany();
  }

  checkCompany() {
    this.companyService.getMyCompany().subscribe({
      next: (company: Company) => {
        this.loading = false;
        this.message = `Welcome to ${company.name}!`;
        setTimeout(() => {
          this.router.navigate(['/employer/jobs']);
        }, 2000);
      },
      error: () => {
        this.loading = false;
        this.message = 'No company found. Please create one.';
        setTimeout(() => {
          this.router.navigate(['/employer/create-company']);
        }, 2000);
      }
    });
  }
}