import {type Request, type Response} from "express";
import {logger} from "../utils/logger.js";
import HttpError from "../utils/httpError.js";

class ErrorMiddleware {
  public handle = (error: Error, req: Request, res: Response): void => {
    logger.error(`[${req.method}] ${req.path} - ${error.message}`);

    if (error instanceof HttpError) {
      res.status(error.status).json({
        status: error.status,
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      status: 500,
      message: error.message || "Internal Server Error",
    });
  };
}

export default ErrorMiddleware;
