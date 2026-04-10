// src/services/index.ts
import ProfileService from "./profile.service.js";
import BookingService from "./booking.service.js";

export const profileService = new ProfileService();
export const bookingService = new BookingService(profileService);
