import {Router, type IRouter} from "express";
import {bookController} from "../controller/index.js";
import type BookController from "../controller/booking.controller.js";

class BookingRouter {
  public router: IRouter;
  private bookingController: BookController;

  constructor() {
    this.router = Router();
    this.bookingController = bookController;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/", this.bookingController.makeReservation);
    this.router.post("/slots", this.bookingController.availableSlotsForProfile);
    this.router.post(
      "/profile-date",
      this.bookingController.fetchingBookingForProfileByDate,
    );
    this.router.get("/", this.bookingController.fetchBookings);
    this.router.get("/:id", this.bookingController.fetchBooking);
  }
}

export default BookingRouter;
