import { Component, signal } from '@angular/core';
import { EmployerService } from '../employer.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Job } from '../job.model';

@Component({
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './my-jobs.html',
  styleUrls: ['./my-jobs.css']
})
export class MyJobs {

  jobs = signal<Job[] | null>(null);

  constructor(private employerService: EmployerService) {
    this.getJobs();
    console.log("Mr vinit")
  }

  getJobs() {
    this.employerService.getEmployerJobs()
      .subscribe({
        next: (res) => {
          this.jobs.set(res);
        },
        error: () => {
          alert('Failed to load jobs');
        }
      });
  }
}