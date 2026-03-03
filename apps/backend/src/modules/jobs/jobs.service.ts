import { prisma } from "../../config/prisma";
import { buildQuery } from "../../utils/apiFeatures";
import { AppError } from "../../utils/appError";
import {
  CreateJobInput,
  JobQuery,
  JobResponse,
} from "./../../types/jobs.types";

export const JobsService = {
  getAll: async (query: JobQuery) => {
    const { where, skip, take, orderBy } = buildQuery(query);
    const [jobs, total] = await prisma.$transaction([
      prisma.job.findMany({ where, skip, take, orderBy }),
      prisma.job.count({ where }),
    ]);
    const currentPage = Number(query.page) || 1;
    const totalPages = Math.ceil(total / take);

    return { jobs, total, currentPage, totalPages };
  },

  getOne: async (id: string): Promise<JobResponse> => {
    const job = await prisma.job.findUnique({ where: { id } });

    if (!job) {
      throw new AppError(`Job not found with ID: ${id}`, 404);
    }

    return job;
  },

  create: async (data: CreateJobInput): Promise<JobResponse> => {
    const job = await prisma.job.create({ data });
    return job;
  },

  remove: async (id: string): Promise<void> => {
    const job = await prisma.job.findUnique({ where: { id } });

    if (!job) {
      throw new AppError(`Job not found with ID: ${id}`, 404);
    }

    await prisma.job.delete({ where: { id } });
  },
};
