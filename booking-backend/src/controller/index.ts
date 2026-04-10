// src/controllers/index.ts
import ProfileController from "./profile.controller.js";
import BookController from "./booking.controller.js";
import HealthController from "./health.controller.js";
import {profileService, bookingService} from "../service/index.js";

export const profileController = new ProfileController(profileService);
export const bookController = new BookController(bookingService);
export const healthController = new HealthController();
