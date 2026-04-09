import express, {type Application} from "express";
import {
  CorsMiddleware,
  HelmetMiddleware,
  MorganMiddleware,
  ErrorMiddleware,
} from "./middleware/index.js";
import AppRoutes from "./routes/index.js";
import {logger} from "./utils/logger.js";

class App {
  public app: Application;
  private appRouter: AppRoutes;

  private middlewares = [
    new CorsMiddleware(),
    new HelmetMiddleware(),
    new MorganMiddleware(),
  ];
  private errorMiddleware = new ErrorMiddleware();

  constructor() {
    this.app = express();
    this.appRouter = new AppRoutes();
    this.initializeMiddlewares();
    this.initializeRouter();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));

    // initialize imported middlewares
    this.middlewares.forEach((middleware) => middleware.init(this.app));
  }

  private initializeErrorHandling(): void {
    this.app.use(this.errorMiddleware.handle);
  }

  // initialize router
  private initializeRouter(): void {
    this.app.use("/api/v1", this.appRouter.router);
  }

  public listen(port: number): void {
    try {
      this.app.listen(port, () => {
        logger.info(`Server is running on port: ${port}`);
      });
    } catch (error) {
      logger.error(`Unable to start server on port ${port}: `, error);
      process.exit(1);
    }
  }
}

export default App;
