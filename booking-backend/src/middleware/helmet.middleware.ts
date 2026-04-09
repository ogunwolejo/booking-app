import helmet from "helmet";
import {type Application} from "express";

class HelmetMiddleware {
  public init(app: Application): void {
    app.use(helmet());
  }
}

export default HelmetMiddleware;
