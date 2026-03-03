import { Request, Response } from "express";
import { JobsService } from "./jobs.service";
import { catchAsync } from "../../utils/catchAsync";
import { logger } from "../../utils/logger";
import { CreateJobInput, JobQuery } from "./../../types/jobs.types";

export const JobsController = {
  getAll: catchAsync(async (req: Request, res: Response) => {
    const result = await JobsService.getAll(req.query as JobQuery);
    logger.info(`Jobs fetched - Count: ${result.jobs.length}`);
    res.status(200).json({
      success: true,
      data: result.jobs,
      currentPage: result.currentPage,
      totalPages: result.totalPages,
      total: result.total,
    });
  }),

  getOne: catchAsync(async (req: Request, res: Response) => {
    const job = await JobsService.getOne(req.params.id as string);
    logger.info(`Job fetched - ID: ${req.params.id}`);
    res.status(200).json({ success: true, data: job });
  }),

  create: catchAsync(async (req: Request, res: Response) => {
    const data = req.body as CreateJobInput;
    const job = await JobsService.create(data);
    logger.info(`Job created - ID: ${job.id}`);
    res.status(201).json({ success: true, data: job });
  }),

  remove: catchAsync(async (req: Request, res: Response) => {
    await JobsService.remove(req.params.id as string);
    logger.info(`Job deleted - ID: ${req.params.id}`);
    res
      .status(200)
      .json({ success: true, message: "Job deleted successfully" });
  }),
};
