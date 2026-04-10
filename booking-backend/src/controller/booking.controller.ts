import type {Request, Response, NextFunction} from "express";
import BookingService from "../service/booking.service.js";
import HttpError from "../utils/httpError.js";
import type {
  NewBookingRequest,
  BookingProfileDateRequest,
} from "../types/booking.types.js";

class BookController {
  constructor(private readonly bookingService: BookingService) {}
  fetchBookings = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const page = Number(req.query.page) ?? undefined;
      const limit = Number(req.query.limit) ?? undefined;
      const result = this.bookingService.getBookings(page, limit);

      res.status(200).json({
        status: 200,
        data: result.data,
        meta: result.meta,
      });
    } catch (err) {
      next(err);
    }
  };

  fetchBooking = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const bookingId = req.params.id as string;
      const booking = this.bookingService.getBookingById(bookingId);

      res.status(200).json({
        status: 200,
        data: booking ?? {},
      });
    } catch (error) {
      next(error);
    }
  };

  // take the date and see if the profile is available for that day and has not been fully booked
  availableSlotsForProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const {profileId, date} = req.body.payload as BookingProfileDateRequest;

      if (!profileId.length || !date.length) {
        throw new HttpError("profile or date was not selected, try again", 404);
      }

      console.log("profileId: ", profileId);
      console.log("date: ", date);

      const availableSlots = this.bookingService.getAvailableSlotsForDate(
        profileId,
        date,
      );
      const fullyBooked = this.bookingService.isProfileFullyBooked(
        profileId,
        date,
      );

      res.status(200).json({
        status: 200,
        data: {
          availableSlots,
          fullyBooked,
          profileId,
          date,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  // fetch all booking for profile base on the specified data
  fetchingBookingForProfileByDate = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const {profileId, date} = req.body as BookingProfileDateRequest;
      const bookings = this.bookingService.getBookingsForProfileByDate(
        profileId,
        date,
      );

      res.status(200).json({
        status: 200,
        data: bookings,
      });
    } catch (error) {
      next(error);
    }
  };

  // new booking
  makeReservation = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const {profileId, slot, date} = req.body as NewBookingRequest;
      const booked = this.bookingService.createBooking({profileId, slot, date});

      if (booked) {
        res.status(200).json({
          status: 200,
          data: booked,
        });
        return;
      }
    } catch (error) {
      next(error);
    }
  };
}

export default BookController;
