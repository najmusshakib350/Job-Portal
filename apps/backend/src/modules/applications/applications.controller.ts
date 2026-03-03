import { Request, Response } from "express";
import { ApplicationsService } from "./applications.service";
import { catchAsync } from "../../utils/catchAsync";
import { AppError } from "../../utils/appError";
import { logger } from "../../utils/logger";
import { CreateApplicationInput } from "./../../types/applications.types";

export const ApplicationsController = {
  create: catchAsync(async (req: Request, res: Response) => {
    const data = req.body as CreateApplicationInput;

    const application = await ApplicationsService.create(data);

    logger.info(
      `Application submitted - Job ID: ${application.jobId}, Applicant: ${application.name}`,
    );

    res.status(201).json({ success: true, data: application });
  }),

  getAllByJob: catchAsync(async (req: Request, res: Response) => {
    const jobId = req.params.jobId as string;

    if (!jobId) {
      throw new AppError("Job ID is required", 400);
    }

    const applications = await ApplicationsService.getAllByJob(jobId);

    logger.info(
      `Applications fetched - Job ID: ${jobId}, Count: ${applications.length}`,
    );

    res.status(200).json({ success: true, data: applications });
  }),
};
