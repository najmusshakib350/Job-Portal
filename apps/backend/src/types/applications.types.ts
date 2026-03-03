export interface CreateApplicationInput {
  jobId: string;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
}

export interface ApplicationResponse {
  id: string;
  jobId: string;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
  createdAt: Date;
}
