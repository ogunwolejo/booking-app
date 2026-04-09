import cors, {type CorsOptions} from "cors";
import {type Application} from "express";
import config from "../config/config.js";

class CorsMiddleware {
  private options: CorsOptions = {
    origin: config.allowOrigins.split(",") || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: "*",
  };

  public init(app: Application): void {
    app.use(cors(this.options));
  }
}

export default CorsMiddleware;
