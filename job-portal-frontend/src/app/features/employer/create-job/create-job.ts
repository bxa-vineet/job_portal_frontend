import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JobService } from '../job.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-job.html',
  styleUrls: ['./create-job.css']
})
export class CreateJob implements OnInit {

  title = '';
  description = '';
  location = '';
  salary = 0;
  experience = 0;
  isFresher = true;
  companyId = 0;
  loading = false;
  successMessage = '';
  errorMessage = '';
  companyLoading = false;
  showSuccessModal = false;
  showErrorModal = false;
  successTitle = '';
  errorTitle = '';

  constructor(private jobService: JobService, private router: Router) {}

  ngOnInit() {
    // Get company ID from local storage
    const storedCompanyId = localStorage.getItem('companyId');
    if (storedCompanyId) {
      this.companyId = parseInt(storedCompanyId);
    } else {
      this.errorMessage = 'Please create a company first.';
    }
    this.companyLoading = false;
  }

  createJob() {
    if (!this.title || !this.description || !this.location || !this.salary) {
      this.errorMessage = 'Please fill in all required fields';
      return;
    }

    if (this.companyId === 0) {
      this.errorMessage = 'Company not found. Please create a company first.';
      return;
    }

    const data = {
      title: this.title,
      description: this.description,
      location: this.location,
      salary: this.salary,
      experience: this.experience,
      isFresher: this.isFresher,
      companyId: this.companyId
    };

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.jobService.createJob(data)
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.successTitle = this.title;
          this.successMessage = `Job successfully posted at ${this.location} with ₹${this.salary} salary.`;
          this.showSuccessModal = true;
          // Clear form
          this.title = '';
          this.description = '';
          this.location = '';
          this.salary = 0;
          this.experience = 0;
          this.isFresher = true;
        },
        error: (err) => {
          this.loading = false;
          this.errorTitle = 'Failed to Create Job';
          this.errorMessage = err?.error?.message || 'Failed to create job. Please try again.';
          this.showErrorModal = true;
        }
      });
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
    // Redirect after closing
    setTimeout(() => {
      this.router.navigate(['/employer/jobs']);
    }, 300);
  }

  closeErrorModal() {
    this.showErrorModal = false;
  }

  clearMessages() {
    this.successMessage = '';
    this.errorMessage = '';
  }

  retryCreateJob() {
    this.closeErrorModal();
  }
}