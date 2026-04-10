import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from './application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private baseUrl = 'http://localhost:8080/api/applications';

  constructor(private http: HttpClient) {}

  applyForJob(jobId: number, formData: FormData): Observable<Application> {
    return this.http.post<Application>(`${this.baseUrl}/apply/${jobId}`, formData);
  }

  getMyApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.baseUrl}/my`);
  }

  getApplicationsForJob(jobId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.baseUrl}/job/${jobId}`);
  }

  updateApplicationStatus(id: number, status: string): Observable<Application> {
    return this.http.put<Application>(`${this.baseUrl}/${id}/status?status=${status}`, {});
  }
}