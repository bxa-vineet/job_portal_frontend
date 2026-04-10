
import { Component, OnInit, signal, computed } from '@angular/core';
import { EmployerService } from '../employer.service';
import { CompanyService } from '../company.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Job } from '../job.model';
import { Company } from '../company.model';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employer-dashboard.html',
  styleUrls: ['./employer-dashboard.css']
})
export class EmployerDashboard implements OnInit {

  jobs = signal<Job[]>([]);
  company = signal<Company | null>(null);
  totalApplications = signal<number>(0);
  loading = signal<boolean>(true);

  recentJobs = computed(() => this.jobs().slice(0, 5));
  hasCompany = computed(() => !!this.company());

  constructor(
    private employerService: EmployerService,
    private companyService: CompanyService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loading.set(true);

    this.companyService.getMyCompany().subscribe({
      next: (company) => {
        this.company.set(company);
        console.log('Company info loaded:', this.company());

        this.loadJobs();
      },
      error: () => {
        this.company.set(null);
        this.loading.set(false);
      }
    });
  }

  loadJobs() {
    this.employerService.getEmployerJobs().subscribe({
      next: (jobs) => {
        this.jobs.set(jobs);
        this.totalApplications.set(jobs.length * 5); // placeholder logic
        this.loading.set(false);
      },
      error: () => {
        this.jobs.set([]); // ✅ fallback
        this.loading.set(false);
      }
    });
  }
}