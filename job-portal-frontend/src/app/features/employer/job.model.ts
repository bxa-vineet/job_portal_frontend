export interface Job {
  id?: number;
  title: string;
  description: string;
  location: string;
  salary: number;
  experience: number;
  isFresher: boolean;
  companyId?: number;
  companyName?: string;
  isOpen?: boolean;
}

export interface JobFilter {
  minSalary?: number;
  maxSalary?: number;
}

export interface CreateJobRequest {
  title: string;
  description: string;
  location: string;
  salary: number;
  experience: number;
  isFresher: boolean;
  companyId: number;
}