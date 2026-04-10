import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job, CreateJobRequest, JobFilter } from './job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private baseUrl = 'http://localhost:8080/api/jobs';

  constructor(private http: HttpClient) {}

  createJob(job: CreateJobRequest): Observable<Job> {
    return this.http.post<Job>(this.baseUrl, job);
  }

  getMyJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.baseUrl);
  }

  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.baseUrl}/${id}`);
  }

  filterJobs(filter: JobFilter): Observable<Job[]> {
    return this.http.post<Job[]>(`${this.baseUrl}/filter`, filter);
  }

  getAllJobs(): Observable<Job[]> {
    return this.filterJobs({});
  }
}