import { Component, OnInit, signal } from '@angular/core';
import { ApplicationService } from '../../user/application.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Application } from '../../user/application.model';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './applicants.html',
  styleUrls: ['./applicants.css']
})
export class Applicants implements OnInit {

  // ✅ Signals
  applications = signal<Application[]>([]);
  jobId = signal<number | null>(null);
  loading = signal<boolean>(true);

  constructor(
    private applicationService: ApplicationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['jobId']);
    this.jobId.set(id);

    console.log('Job ID:', this.jobId());

    this.loadApplicants(id);
  }

  loadApplicants(jobId: number) {
    this.loading.set(true);

    this.applicationService.getApplicationsForJob(jobId)
      .subscribe({
        next: (res) => {
          this.applications.set(res);
          console.log('Applications:', this.applications());
          this.loading.set(false);
        },
        error: (err) => {
          console.log('Error:', err);
          this.loading.set(false);
        }
      });
  }

  updateStatus(id: number, status: string) {
    this.applicationService.updateApplicationStatus(id, status)
      .subscribe({
        next: () => {
          alert('Updated ✅');

          // ✅ reload using signal value
          const currentJobId = this.jobId();
          if (currentJobId !== null) {
            this.loadApplicants(currentJobId);
          }
        },
        error: (err) => {
          console.log(err);
          alert('Update failed ❌');
        }
      });
  }
}