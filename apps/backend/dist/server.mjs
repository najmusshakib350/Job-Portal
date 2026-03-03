// src/app.ts
import express from "express";
import cors from "cors";

// src/modules/jobs/jobs.route.ts
import { Router } from "express";

// src/config/prisma.ts
import "dotenv/config";

// src/generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.4.2",
  "engineVersion": "94a226be1cf2967af2541cca5529f0f7ba866919",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Job {\n  id           String        @id @default(uuid())\n  title        String\n  company      String\n  location     String\n  category     String\n  description  String\n  createdAt    DateTime      @default(now())\n  applications Application[]\n}\n\nmodel Application {\n  id         String   @id @default(uuid())\n  jobId      String\n  name       String\n  email      String\n  resumeLink String\n  coverNote  String\n  createdAt  DateTime @default(now())\n\n  job Job @relation(fields: [jobId], references: [id], onDelete: Cascade)\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Job":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"company","kind":"scalar","type":"String"},{"name":"location","kind":"scalar","type":"String"},{"name":"category","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"applications","kind":"object","type":"Application","relationName":"ApplicationToJob"}],"dbName":null},"Application":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"jobId","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"resumeLink","kind":"scalar","type":"String"},{"name":"coverNote","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"job","kind":"object","type":"Job","relationName":"ApplicationToJob"}],"dbName":null}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","job","applications","_count","Job.findUnique","Job.findUniqueOrThrow","Job.findFirst","Job.findFirstOrThrow","Job.findMany","data","Job.createOne","Job.createMany","Job.createManyAndReturn","Job.updateOne","Job.updateMany","Job.updateManyAndReturn","create","update","Job.upsertOne","Job.deleteOne","Job.deleteMany","having","_min","_max","Job.groupBy","Job.aggregate","Application.findUnique","Application.findUniqueOrThrow","Application.findFirst","Application.findFirstOrThrow","Application.findMany","Application.createOne","Application.createMany","Application.createManyAndReturn","Application.updateOne","Application.updateMany","Application.updateManyAndReturn","Application.upsertOne","Application.deleteOne","Application.deleteMany","Application.groupBy","Application.aggregate","AND","OR","NOT","id","jobId","name","email","resumeLink","coverNote","createdAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","title","company","location","category","description","every","some","none","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany"]'),
  graph: "YxIgCwQAAEEAICwAAD4AMC0AAAkAEC4AAD4AMC8BAAAAATVAAEAAIUEBAD8AIUIBAD8AIUMBAD8AIUQBAD8AIUUBAD8AIQEAAAABACALAwAAQwAgLAAAQgAwLQAAAwAQLgAAQgAwLwEAPwAhMAEAPwAhMQEAPwAhMgEAPwAhMwEAPwAhNAEAPwAhNUAAQAAhAQMAAF0AIAsDAABDACAsAABCADAtAAADABAuAABCADAvAQAAAAEwAQA_ACExAQA_ACEyAQA_ACEzAQA_ACE0AQA_ACE1QABAACEDAAAAAwAgAQAABAAwAgAABQAgAQAAAAMAIAEAAAABACALBAAAQQAgLAAAPgAwLQAACQAQLgAAPgAwLwEAPwAhNUAAQAAhQQEAPwAhQgEAPwAhQwEAPwAhRAEAPwAhRQEAPwAhAQQAAFwAIAMAAAAJACABAAAKADACAAABACADAAAACQAgAQAACgAwAgAAAQAgAwAAAAkAIAEAAAoAMAIAAAEAIAgEAABbACAvAQAAAAE1QAAAAAFBAQAAAAFCAQAAAAFDAQAAAAFEAQAAAAFFAQAAAAEBCwAADgAgBy8BAAAAATVAAAAAAUEBAAAAAUIBAAAAAUMBAAAAAUQBAAAAAUUBAAAAAQELAAAQADABCwAAEAAwCAQAAE4AIC8BAEcAITVAAEgAIUEBAEcAIUIBAEcAIUMBAEcAIUQBAEcAIUUBAEcAIQIAAAABACALAAATACAHLwEARwAhNUAASAAhQQEARwAhQgEARwAhQwEARwAhRAEARwAhRQEARwAhAgAAAAkAIAsAABUAIAIAAAAJACALAAAVACADAAAAAQAgEgAADgAgEwAAEwAgAQAAAAEAIAEAAAAJACADBQAASwAgGAAATQAgGQAATAAgCiwAAD0AMC0AABwAEC4AAD0AMC8BADYAITVAADcAIUEBADYAIUIBADYAIUMBADYAIUQBADYAIUUBADYAIQMAAAAJACABAAAbADAXAAAcACADAAAACQAgAQAACgAwAgAAAQAgAQAAAAUAIAEAAAAFACADAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAMAAAADACABAAAEADACAAAFACAIAwAASgAgLwEAAAABMAEAAAABMQEAAAABMgEAAAABMwEAAAABNAEAAAABNUAAAAABAQsAACQAIAcvAQAAAAEwAQAAAAExAQAAAAEyAQAAAAEzAQAAAAE0AQAAAAE1QAAAAAEBCwAAJgAwAQsAACYAMAgDAABJACAvAQBHACEwAQBHACExAQBHACEyAQBHACEzAQBHACE0AQBHACE1QABIACECAAAABQAgCwAAKQAgBy8BAEcAITABAEcAITEBAEcAITIBAEcAITMBAEcAITQBAEcAITVAAEgAIQIAAAADACALAAArACACAAAAAwAgCwAAKwAgAwAAAAUAIBIAACQAIBMAACkAIAEAAAAFACABAAAAAwAgAwUAAEQAIBgAAEYAIBkAAEUAIAosAAA1ADAtAAAyABAuAAA1ADAvAQA2ACEwAQA2ACExAQA2ACEyAQA2ACEzAQA2ACE0AQA2ACE1QAA3ACEDAAAAAwAgAQAAMQAwFwAAMgAgAwAAAAMAIAEAAAQAMAIAAAUAIAosAAA1ADAtAAAyABAuAAA1ADAvAQA2ACEwAQA2ACExAQA2ACEyAQA2ACEzAQA2ACE0AQA2ACE1QAA3ACEOBQAAOQAgGAAAPAAgGQAAPAAgNgEAAAABNwEAAAAEOAEAAAAEOQEAAAABOgEAAAABOwEAAAABPAEAAAABPQEAOwAhPgEAAAABPwEAAAABQAEAAAABCwUAADkAIBgAADoAIBkAADoAIDZAAAAAATdAAAAABDhAAAAABDlAAAAAATpAAAAAATtAAAAAATxAAAAAAT1AADgAIQsFAAA5ACAYAAA6ACAZAAA6ACA2QAAAAAE3QAAAAAQ4QAAAAAQ5QAAAAAE6QAAAAAE7QAAAAAE8QAAAAAE9QAA4ACEINgIAAAABNwIAAAAEOAIAAAAEOQIAAAABOgIAAAABOwIAAAABPAIAAAABPQIAOQAhCDZAAAAAATdAAAAABDhAAAAABDlAAAAAATpAAAAAATtAAAAAATxAAAAAAT1AADoAIQ4FAAA5ACAYAAA8ACAZAAA8ACA2AQAAAAE3AQAAAAQ4AQAAAAQ5AQAAAAE6AQAAAAE7AQAAAAE8AQAAAAE9AQA7ACE-AQAAAAE_AQAAAAFAAQAAAAELNgEAAAABNwEAAAAEOAEAAAAEOQEAAAABOgEAAAABOwEAAAABPAEAAAABPQEAPAAhPgEAAAABPwEAAAABQAEAAAABCiwAAD0AMC0AABwAEC4AAD0AMC8BADYAITVAADcAIUEBADYAIUIBADYAIUMBADYAIUQBADYAIUUBADYAIQsEAABBACAsAAA-ADAtAAAJABAuAAA-ADAvAQA_ACE1QABAACFBAQA_ACFCAQA_ACFDAQA_ACFEAQA_ACFFAQA_ACELNgEAAAABNwEAAAAEOAEAAAAEOQEAAAABOgEAAAABOwEAAAABPAEAAAABPQEAPAAhPgEAAAABPwEAAAABQAEAAAABCDZAAAAAATdAAAAABDhAAAAABDlAAAAAATpAAAAAATtAAAAAATxAAAAAAT1AADoAIQNGAAADACBHAAADACBIAAADACALAwAAQwAgLAAAQgAwLQAAAwAQLgAAQgAwLwEAPwAhMAEAPwAhMQEAPwAhMgEAPwAhMwEAPwAhNAEAPwAhNUAAQAAhDQQAAEEAICwAAD4AMC0AAAkAEC4AAD4AMC8BAD8AITVAAEAAIUEBAD8AIUIBAD8AIUMBAD8AIUQBAD8AIUUBAD8AIUkAAAkAIEoAAAkAIAAAAAFOAQAAAAEBTkAAAAABBRIAAF8AIBMAAGIAIEsAAGAAIEwAAGEAIFEAAAEAIAMSAABfACBLAABgACBRAAABACAAAAALEgAATwAwEwAAVAAwSwAAUAAwTAAAUQAwTQAAUgAgTgAAUwAwTwAAUwAwUAAAUwAwUQAAUwAwUgAAVQAwUwAAVgAwBi8BAAAAATEBAAAAATIBAAAAATMBAAAAATQBAAAAATVAAAAAAQIAAAAFACASAABaACADAAAABQAgEgAAWgAgEwAAWQAgAQsAAF4AMAsDAABDACAsAABCADAtAAADABAuAABCADAvAQAAAAEwAQA_ACExAQA_ACEyAQA_ACEzAQA_ACE0AQA_ACE1QABAACECAAAABQAgCwAAWQAgAgAAAFcAIAsAAFgAIAosAABWADAtAABXABAuAABWADAvAQA_ACEwAQA_ACExAQA_ACEyAQA_ACEzAQA_ACE0AQA_ACE1QABAACEKLAAAVgAwLQAAVwAQLgAAVgAwLwEAPwAhMAEAPwAhMQEAPwAhMgEAPwAhMwEAPwAhNAEAPwAhNUAAQAAhBi8BAEcAITEBAEcAITIBAEcAITMBAEcAITQBAEcAITVAAEgAIQYvAQBHACExAQBHACEyAQBHACEzAQBHACE0AQBHACE1QABIACEGLwEAAAABMQEAAAABMgEAAAABMwEAAAABNAEAAAABNUAAAAABBBIAAE8AMEsAAFAAME0AAFIAIFEAAFMAMAABBAAAXAAgBi8BAAAAATEBAAAAATIBAAAAATMBAAAAATQBAAAAATVAAAAAAQcvAQAAAAE1QAAAAAFBAQAAAAFCAQAAAAFDAQAAAAFEAQAAAAFFAQAAAAECAAAAAQAgEgAAXwAgAwAAAAkAIBIAAF8AIBMAAGMAIAkAAAAJACALAABjACAvAQBHACE1QABIACFBAQBHACFCAQBHACFDAQBHACFEAQBHACFFAQBHACEHLwEARwAhNUAASAAhQQEARwAhQgEARwAhQwEARwAhRAEARwAhRQEARwAhAgQGAgUAAwEDAAEBBAcAAAAAAwUACBgACRkACgAAAAMFAAgYAAkZAAoBAwABAQMAAQMFAA8YABAZABEAAAADBQAPGAAQGQARBgIBBwgBCAsBCQwBCg0BDA8BDREEDhIFDxQBEBYEERcGFBgBFRkBFhoEGh0HGx4LHB8CHSACHiECHyICICMCISUCIicEIygMJCoCJSwEJi0NJy4CKC8CKTAEKjMOKzQS"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/config/prisma.ts
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
var connectionString = process.env.DATABASE_URL;
var pool = new pg.Pool({ connectionString });
var adapter = new PrismaPg(pool);
var globalForPrisma = globalThis;
var prisma = globalForPrisma.prisma ?? new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
});
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
var cleanup = async () => {
  await prisma.$disconnect();
};
process.on("beforeExit", cleanup);
process.on("exit", cleanup);

// src/utils/apiFeatures.ts
var buildQuery = (query) => {
  const where = {};
  if (query.search) {
    where.OR = [
      { title: { contains: query.search, mode: "insensitive" } },
      { company: { contains: query.search, mode: "insensitive" } }
    ];
  }
  if (query.location) where.location = query.location;
  if (query.category) where.category = query.category;
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  const orderBy = query.sortBy ? { [query.sortBy]: query.order === "asc" ? "asc" : "desc" } : { createdAt: "desc" };
  return { where, skip, take: limit, orderBy };
};

// src/utils/appError.ts
var AppError = class extends Error {
  statusCode;
  isOperational;
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
};

// src/modules/jobs/jobs.service.ts
var JobsService = {
  getAll: async (query) => {
    const jobs = await prisma.job.findMany(buildQuery(query));
    return jobs;
  },
  getOne: async (id) => {
    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
      throw new AppError(`Job not found with ID: ${id}`, 404);
    }
    return job;
  },
  create: async (data) => {
    const job = await prisma.job.create({ data });
    return job;
  },
  remove: async (id) => {
    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
      throw new AppError(`Job not found with ID: ${id}`, 404);
    }
    await prisma.job.delete({ where: { id } });
  }
};

// src/utils/catchAsync.ts
var catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// src/utils/logger.ts
import fs from "fs";
import path2 from "path";
var logDir = path2.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
var errorLogFile = path2.join(logDir, "error.log");
var accessLogFile = path2.join(logDir, "access.log");
var timestamp = () => (/* @__PURE__ */ new Date()).toISOString();
var logger = {
  error: (message, extra) => {
    let logMessage = message;
    if (extra) logMessage += " | " + JSON.stringify(extra);
    const log = `[${timestamp()}] ERROR: ${logMessage}
`;
    fs.appendFileSync(errorLogFile, log);
    console.error(log);
  },
  info: (message, extra) => {
    let logMessage = message;
    if (extra) logMessage += " | " + JSON.stringify(extra);
    const log = `[${timestamp()}] INFO: ${logMessage}
`;
    fs.appendFileSync(accessLogFile, log);
    console.log(log);
  }
};

// src/modules/jobs/jobs.controller.ts
var JobsController = {
  getAll: catchAsync(async (req, res) => {
    const jobs = await JobsService.getAll(req.query);
    logger.info(`Jobs fetched - Count: ${jobs.length}`);
    res.status(200).json({ success: true, data: jobs });
  }),
  getOne: catchAsync(async (req, res) => {
    const job = await JobsService.getOne(req.params.id);
    logger.info(`Job fetched - ID: ${req.params.id}`);
    res.status(200).json({ success: true, data: job });
  }),
  create: catchAsync(async (req, res) => {
    const data = req.body;
    const job = await JobsService.create(data);
    logger.info(`Job created - ID: ${job.id}`);
    res.status(201).json({ success: true, data: job });
  }),
  remove: catchAsync(async (req, res) => {
    await JobsService.remove(req.params.id);
    logger.info(`Job deleted - ID: ${req.params.id}`);
    res.status(200).json({ success: true, message: "Job deleted successfully" });
  })
};

// src/middlewares/validateRequest.ts
var validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query
    });
    if (!result.success) {
      const message = result.error.issues.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ");
      return next(new AppError(`Validation failed: ${message}`, 400));
    }
    next();
  };
};

// src/modules/jobs/jobs.validation.ts
import { z } from "zod";
var createJobSchema = z.object({
  body: z.object({
    title: z.string({ error: "Title is required" }).min(3, "Title should be at least 3 characters"),
    company: z.string({ error: "Company is required" }).min(2, "Company required"),
    location: z.string({ error: "Location is required" }).min(2, "Location required"),
    category: z.string({ error: "Category is required" }).min(2, "Category required"),
    description: z.string({ error: "Description is required" }).min(10, "Description should be at least 10 characters")
  })
});

// src/modules/jobs/jobs.route.ts
var router = Router();
router.get("/", JobsController.getAll);
router.get("/:id", JobsController.getOne);
router.post("/", validateRequest(createJobSchema), JobsController.create);
router.delete("/:id", JobsController.remove);
var jobs_route_default = router;

// src/modules/applications/applications.route.ts
import { Router as Router2 } from "express";

// src/modules/applications/applications.service.ts
var ApplicationsService = {
  create: async (data) => {
    const job = await prisma.job.findUnique({
      where: { id: data.jobId }
    });
    if (!job) {
      throw new AppError(`Job not found with ID: ${data.jobId}`, 404);
    }
    const existingApplication = await prisma.application.findFirst({
      where: {
        jobId: data.jobId,
        email: data.email
      }
    });
    if (existingApplication) {
      throw new AppError("You have already applied for this job", 409);
    }
    const application = await prisma.application.create({ data });
    return application;
  },
  getAllByJob: async (jobId) => {
    const job = await prisma.job.findUnique({
      where: { id: jobId }
    });
    if (!job) {
      throw new AppError(`Job not found with ID: ${jobId}`, 404);
    }
    const applications = await prisma.application.findMany({
      where: { jobId },
      orderBy: { createdAt: "desc" },
      include: { job: true }
    });
    return applications;
  }
};

// src/modules/applications/applications.controller.ts
var ApplicationsController = {
  create: catchAsync(async (req, res) => {
    const data = req.body;
    const application = await ApplicationsService.create(data);
    logger.info(
      `Application submitted - Job ID: ${application.jobId}, Applicant: ${application.name}`
    );
    res.status(201).json({ success: true, data: application });
  }),
  getAllByJob: catchAsync(async (req, res) => {
    const jobId = req.params.jobId;
    if (!jobId) {
      throw new AppError("Job ID is required", 400);
    }
    const applications = await ApplicationsService.getAllByJob(jobId);
    logger.info(
      `Applications fetched - Job ID: ${jobId}, Count: ${applications.length}`
    );
    res.status(200).json({ success: true, data: applications });
  })
};

// src/modules/applications/applications.validation.ts
import { z as z2 } from "zod";
var createApplicationSchema = z2.object({
  body: z2.object({
    jobId: z2.string({ error: "Job ID is required" }),
    name: z2.string({ error: "Name is required" }).min(2, "Name should be at least 2 characters"),
    email: z2.string({ error: "Email is required" }).email("Invalid email"),
    resumeLink: z2.string({ error: "Resume link is required" }).url("Invalid resume URL"),
    coverNote: z2.string({ error: "Cover note is required" }).min(5, "Cover note should be at least 5 characters")
  })
});

// src/modules/applications/applications.route.ts
var router2 = Router2();
router2.post(
  "/",
  validateRequest(createApplicationSchema),
  ApplicationsController.create
);
router2.get("/:jobId", ApplicationsController.getAllByJob);
var applications_route_default = router2;

// src/config/env.ts
import dotenv from "dotenv";
dotenv.config();
var env = {
  port: process.env.PORT || 5e3,
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: process.env.DATABASE_URL || ""
};

// src/middlewares/globalErrorHandler.ts
var globalErrorHandler = (err, req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl} - ${err.message}`);
  if (env.nodeEnv === "development") {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
      stack: err.stack
    });
  } else {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.isOperational ? err.message : "Something went wrong. Please try again later."
    });
  }
};

// src/app.ts
var app = express();
app.use(cors());
app.use(express.json());
app.use("/api/jobs", jobs_route_default);
app.use("/api/applications", applications_route_default);
app.use(globalErrorHandler);
var app_default = app;

// src/server.ts
var PORT = env.port || 5e3;
var cleanup2 = async () => {
  logger.info("Shutting down server...");
  try {
    await prisma.$disconnect();
    logger.info("Database disconnected");
  } catch (err) {
    logger.error("Error during disconnect", err);
  }
};
process.on("beforeExit", cleanup2);
process.on("exit", cleanup2);
process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));
var startServer = async () => {
  try {
    await prisma.$connect();
    logger.info("Database connected");
    app_default.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} [${env.nodeEnv}]`);
    });
  } catch (err) {
    if (err instanceof Error) {
      logger.error("Failed to start server", {
        message: err.message,
        stack: err.stack
      });
    } else {
      logger.error("Failed to start server", err);
    }
    process.exit(1);
  }
};
startServer();
