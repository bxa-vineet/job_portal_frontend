import { Component, OnInit, signal } from '@angular/core';
import { JobService } from '../../employer/job.service';
import { ApplicationService } from '../application.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Job } from '../../employer/job.model';
import { finalize } from 'rxjs/operators';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-list.html',
  styleUrls: ['./job-list.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('0.5s ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class JobList implements OnInit {

  jobs = signal<Job[]>([]);
  filteredJobs = signal<Job[]>([]);
  loading = signal(false);
  search = signal('');

  selectedJob = signal<Job | null>(null);
  selectedFile: File | null = null;

  constructor(
    private jobService: JobService,
    private applicationService: ApplicationService
  ) {}

  ngOnInit() {
    this.getJobs();
  }

  getJobs() {
    this.loading.set(true);

    this.jobService.getAllJobs()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: res => {
          this.jobs.set(res);
          this.filteredJobs.set(res);
        },
        error: err => {
          console.error(err);
          alert('Failed to load jobs');
        }
      });
  }

  selectJob(job: Job) {
    this.selectedJob.set(job);
  }

  close() {
    this.selectedJob.set(null);
    this.selectedFile = null;
  }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }

  apply() {
    const job = this.selectedJob();

    if (!this.selectedFile || !job || !job.id) {
      alert('Please select a resume');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.applicationService.applyForJob(job.id, formData)
      .subscribe({
        next: () => {
          alert('Applied successfully ✅');
          this.close();
        },
        error: () => {
          alert('Apply failed ');
        }
      });
  }

  filterJobs() {
    const q = this.search().trim().toLowerCase();

    this.filteredJobs.set(
      this.jobs().filter(job =>
        job.title.toLowerCase().includes(q) ||
        job.companyName?.toLowerCase().includes(q) ||
        job.location?.toLowerCase().includes(q)
      )
    );
  }

  trackByJobId(index: number, job: Job) {
    return job.id;
  }
}