import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/appError";
import {
  CreateApplicationInput,
  ApplicationResponse,
} from "./../../types/applications.types";

export const ApplicationsService = {
  create: async (
    data: CreateApplicationInput,
  ): Promise<ApplicationResponse> => {
    const job = await prisma.job.findUnique({
      where: { id: data.jobId },
    });

    if (!job) {
      throw new AppError(`Job not found with ID: ${data.jobId}`, 404);
    }

    const existingApplication = await prisma.application.findFirst({
      where: {
        jobId: data.jobId,
        email: data.email,
      },
    });

    if (existingApplication) {
      throw new AppError("You have already applied for this job", 409);
    }

    const application = await prisma.application.create({ data });

    return application;
  },

  getAllByJob: async (jobId: string): Promise<ApplicationResponse[]> => {
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      throw new AppError(`Job not found with ID: ${jobId}`, 404);
    }

    const applications = await prisma.application.findMany({
      where: { jobId },
      orderBy: { createdAt: "desc" },
      include: { job: true },
    });

    return applications;
  },
};
