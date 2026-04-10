export interface Company {
  id?: number;
  name: string;
  description: string;
  location: string;
}

export interface CreateCompanyRequest {
  name: string;
  description: string;
  location: string;
}