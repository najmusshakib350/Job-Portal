import { Router } from "express";
import { JobsController } from "./jobs.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createJobSchema } from "./jobs.validation";

const router: Router = Router();

router.get("/", JobsController.getAll);
router.get("/:id", JobsController.getOne);
router.post("/", validateRequest(createJobSchema), JobsController.create);
router.delete("/:id", JobsController.remove);

export default router;
