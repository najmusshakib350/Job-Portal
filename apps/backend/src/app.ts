import express, { Express } from "express";
import cors from "cors";
import jobsRoutes from "./modules/jobs/jobs.route";
import applicationsRoutes from "./modules/applications/applications.route";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

const app: Express = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/jobs", jobsRoutes);
app.use("/api/applications", applicationsRoutes);

// Global error handler
app.use(globalErrorHandler);

export default app;
