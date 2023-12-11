import Koa from "koa";
import log from "./common/logger";
import logger from "koa-pino-logger";
import { healthRouter } from "./routes";
import { initializeDbConnection, closeDbConnection } from "./db";

async function startServer() {
  const app = new Koa();

  app.use(logger());
  app.use(healthRouter.routes());

  const server = app.listen(process.env.PORT, () => {
    log.info(`Server running on port ${process.env.PORT}`);
  });

  const shutdown = async () => {
    try {
      log.info("Shutting down server...");

      // Properly close the server
      await new Promise<void>((resolve, reject) => {
        server.close((err) => {
          if (err) {
            log.error("Failed to close server:", err);
            reject(err);
            return;
          }
          resolve();
        });
      });

      await closeDbConnection();
    } catch (error) {
      log.error("Error during shutdown:", error);
    } finally {
      log.info("Server shut down gracefully.");
      process.exit(0);
    }
  };

  // Handle exit signals
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);

  return server;
}

async function main() {
  const dbInitialized = await initializeDbConnection();
  if (!dbInitialized) {
    log.warn("Starting server without database initialization...");
  }
  await startServer();
}

main();
