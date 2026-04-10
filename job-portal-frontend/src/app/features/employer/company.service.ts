import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company, CreateCompanyRequest } from './company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseUrl = 'http://localhost:8080/api/company';

  constructor(private http: HttpClient) {}

  createCompany(company: CreateCompanyRequest): Observable<Company> {
    return this.http.post<Company>(this.baseUrl, company);
  }

  getMyCompany(): Observable<Company> {
    console.log('Fetching company info from API...');
    return this.http.get<Company>(`${this.baseUrl}/my`);
  }
}