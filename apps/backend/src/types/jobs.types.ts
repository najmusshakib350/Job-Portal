export interface CreateJobInput {
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
}

export interface JobQuery {
  search?: string;
  category?: string;
  location?: string;
  sort?: string;
  page?: string;
  limit?: string;
}

export interface JobResponse {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  createdAt: Date;
}
