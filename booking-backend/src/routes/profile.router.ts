import {Router, type IRouter} from "express";
import ProfileController from "../controller/profile.controller.js";

class ProfileRouter {
  public router: IRouter;
  private profileController: ProfileController;

  constructor() {
    this.router = Router();
    this.profileController = new ProfileController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/", this.profileController.createProfile);
    this.router.get("/", this.profileController.getAllProfiles);
    this.router.get("/:id", this.profileController.getProfileViaId);
  }
}

export default ProfileRouter;
