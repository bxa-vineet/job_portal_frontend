import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../company.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-company.html',
  styleUrls: ['./create-company.css']
})
export class CreateCompany {

  name = '';
  description = '';
  location = '';
  loading = false;
  successMessage = '';
  errorMessage = '';
  showSuccessModal = false;
  showErrorModal = false;
  successTitle = '';
  errorTitle = '';

  constructor(private companyService: CompanyService, private router: Router) {}

  createCompany() {
    if (!this.name || !this.description || !this.location) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    const data = {
      name: this.name,
      description: this.description,
      location: this.location
    };

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    // API Call
    this.companyService.createCompany(data)
      .subscribe({
        next: (response) => {
          this.loading = false;
          // Store company ID in local storage
          if (response && response.id) {
            localStorage.setItem('companyId', response.id.toString());
          }
          this.successTitle = this.name;
          this.successMessage = `Company successfully created in ${this.location}.`;
          this.showSuccessModal = true;
          // Clear form
          this.name = '';
          this.description = '';
          this.location = '';
        },
        error: (err) => {
          this.loading = false;
          this.errorTitle = 'Failed to Create Company';
          this.errorMessage = err?.error?.message || 'Failed to create company. Please try again.';
          this.showErrorModal = true;
        }
      });
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
    // Redirect after closing
    setTimeout(() => {
      this.router.navigate(['/employer']);
    }, 300);
  }

  closeErrorModal() {
    this.showErrorModal = false;
  }

  retryCreateCompany() {
    this.closeErrorModal();
  }
}