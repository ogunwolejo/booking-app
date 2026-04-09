import express, {type Application} from "express";
import {
  CorsMiddleware,
  HelmetMiddleware,
  MorganMiddleware,
} from "./middleware/index.js";
import {logger} from "./utils/logger.js";

class App {
  public app: Application;

  private middlewares = [
    new CorsMiddleware(),
    new HelmetMiddleware(),
    new MorganMiddleware(),
  ];

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));

    // initialize imported middlewares
    this.middlewares.forEach((middleware) => middleware.init(this.app));
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
