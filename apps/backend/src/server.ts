import app from "./app";
import { prisma } from "./config/prisma";
import { env } from "./config/env";
import { logger } from "./utils/logger";

const PORT = env.port || 5000;

// shutdown helper
const cleanup = async () => {
  logger.info("Shutting down server...");
  try {
    await prisma.$disconnect();
    logger.info("Database disconnected");
  } catch (err) {
    logger.error("Error during disconnect", err);
  }
};

// Catch signals for shutdown
process.on("beforeExit", cleanup);
process.on("exit", cleanup);
process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

const startServer = async () => {
  try {
    await prisma.$connect();
    logger.info("Database connected");

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} [${env.nodeEnv}]`);
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error("Failed to start server", {
        message: err.message,
        stack: err.stack,
      });
    } else {
      logger.error("Failed to start server", err);
    }
    process.exit(1);
  }
};

startServer();
