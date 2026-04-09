import morgan from "morgan";
import {type Application} from "express";
import {logger} from "../utils/logger.js";
import config from "../config/config.js";

class MorganMiddleware {
  public init(app: Application): void {
    app.use(
      morgan(config.environment, {
        stream: {
          write: (message: string) => logger.http(message.trim()),
        },
      }),
    );
  }
}

export default MorganMiddleware;
