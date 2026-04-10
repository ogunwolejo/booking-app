import {type IRouter, Router} from "express";
import ProfileRouter from "./profile.router.js";
import type HealthController from "../controller/health.controller.js";
import {healthController} from "../controller/index.js";
import BookingRouter from "./booking.router.js";

class HealthRouter {
  public router: IRouter;
  private healthController: HealthController;
  constructor() {
    this.router = Router();
    this.healthController = healthController;
    this.router.get("/", this.healthController.check);
  }
}

class AppRoutes {
  public router: IRouter;
  private profileRouter: ProfileRouter;
  private healthRouter: HealthRouter;
  private bookingRouter: BookingRouter;

  constructor() {
    this.router = Router();
    this.profileRouter = new ProfileRouter();
    this.healthRouter = new HealthRouter();
    this.bookingRouter = new BookingRouter();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use("/health", this.healthRouter.router);
    this.router.use("/profiles", this.profileRouter.router);
    this.router.use("/bookings", this.bookingRouter.router);
  }
}

export default AppRoutes;
