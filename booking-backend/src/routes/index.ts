import {type IRouter, Router} from "express";
import ProfileRouter from "./profile.router.js";
import HealthController from "../controller/health.controller.js";

class HealthRouter {
  public router: IRouter;
  private healthController: HealthController;
  constructor() {
    this.router = Router();
    this.healthController = new HealthController();
    this.router.get("/", this.healthController.check);
  }
}

class AppRoutes {
  public router: IRouter;
  private profileRouter: ProfileRouter;
  private healthRouter: HealthRouter;

  constructor() {
    this.router = Router();
    this.profileRouter = new ProfileRouter();
    this.healthRouter = new HealthRouter();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use("/health", this.healthRouter.router);
    this.router.use("/profile", this.profileRouter.router);
  }
}

export default AppRoutes;
