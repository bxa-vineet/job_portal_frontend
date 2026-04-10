import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../application.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Application } from '../application.model';
import { finalize } from 'rxjs/operators';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-applications.html',
  styleUrls: ['./my-applications.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('0.5s ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class MyApplications implements OnInit {

  applications = signal<Application[]>([]);
  loading = signal(false);

  constructor(private applicationService: ApplicationService) {}

  ngOnInit() {
    this.getApplications();
  }

  getApplications() {
    this.loading.set(true);

    this.applicationService.getMyApplications()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: res => {
          this.applications.set(res);
        },
        error: err => {
          console.error(err);
          alert('Failed to load applications');
        }
      });
  }

  trackByAppId(index: number, app: Application): any {
    return app.id;
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'applied': return 'bg-primary';
      case 'shortlisted': return 'bg-warning';
      case 'rejected': return 'bg-danger';
      case 'accepted': return 'bg-success';
      default: return 'bg-secondary';
    }
  }
}