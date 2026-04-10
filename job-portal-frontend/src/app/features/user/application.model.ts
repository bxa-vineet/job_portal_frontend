export interface Application {
  id: number;
  jobTitle: string;
  companyName: string;
  status: string;
  resumeFilePath: string;
  candidateName?: string;
  candidateEmail?: string;
  appliedDate?: string;
}

export interface ApplyRequest {
  
}