import { Router } from "express";
import { ApplicationsController } from "./applications.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createApplicationSchema } from "./applications.validation";

const router: Router = Router();

router.post(
  "/",
  validateRequest(createApplicationSchema),
  ApplicationsController.create,
);

router.get("/:jobId", ApplicationsController.getAllByJob);

export default router;
