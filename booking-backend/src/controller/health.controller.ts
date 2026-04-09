import {type Request, type Response} from "express";

class HealthController {
  public check = (req: Request, res: Response): void => {
    res.status(200).json({
      status: 200,
      message: "Server is healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  };
}

export default HealthController;
