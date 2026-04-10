import {type Request, type Response, type NextFunction} from "express";
import ProfileService from "../service/profile.service.js";
import type {Profile} from "../types/profile.types.js";

class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  // private profileService: ProfileService;
  // constructor() {
  //   this.profileService = new ProfileService();
  // }

  public createProfile = (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    try {
      const {name, title, availableSlots} = req.body as Omit<Profile, "id">;
      const profile = this.profileService.addNewProfile({
        name,
        title,
        availableSlots,
      });

      res.status(201).json({
        status: 201,
        data: profile,
      });
    } catch (error) {
      next(error);
    }
  };

  public getAllProfiles = (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    try {
      const page = Number(req.query.page) ?? undefined;
      const limit = Number(req.query.limit) ?? undefined;

      const allProfiles = this.profileService.getProfiles(page, limit);
      res.status(200).json({
        status: 200,
        data: allProfiles.data,
        meta: allProfiles.meta,
      });
    } catch (error) {
      next(error);
    }
  };

  public getProfileViaId = (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    try {
      const profileId = req.params.id as string;
      const profile = this.profileService.getProfileById(profileId);
      res.status(200).json({
        status: 200,
        data: profile ?? {},
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ProfileController;
