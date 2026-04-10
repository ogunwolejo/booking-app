import {v4} from "uuid";
import {
  BookingStatusEnum,
  type Booking,
  type Bookings,
} from "../types/booking.types.js";
import type ProfileService from "./profile.service.js";
import HttpError from "../utils/httpError.js";

class BookingService {
  constructor(private readonly profileService: ProfileService) {}
  private bookings: Booking[] = [];

  // key: "profileId::date" → Set of booked slots
  private slotIndex = new Map<string, Set<string>>();

  private indexKey(profileId: string, date: string): string {
    return `${profileId}::${date}`;
  }

  /**
   * Get all bookings with optional pagination support
   * @param page - Optional page number for pagination (1-indexed)
   * @param limit - Optional number of bookings per page
   * @returns Bookings object with data array and pagination metadata
   */
  public getBookings(
    page: number | undefined,
    limit: number | undefined,
  ): Bookings {
    // If no pagination params provided, return all bookings
    if (!page || !limit) {
      return {
        data: this.bookings,
        meta: {
          total: this.bookings.length,
          page: 1,
          limit: this.bookings.length,
          totalPages: 1,
        },
      };
    }

    // Calculate pagination start and end indices
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = this.bookings.slice(start, end);

    return {
      data,
      meta: {
        total: this.bookings.length,
        page,
        limit,
        totalPages: Math.ceil(this.bookings.length / limit),
      },
    };
  }

  /**
   * Get a booking by its ID
   * @param id - The booking ID to search for
   * @returns The booking object if found, undefined otherwise
   */
  public getBookingById(id: string): Booking | undefined {
    const booking = this.bookings.find((b) => b.id === id);
    return booking;
  }

  private addToIndex(booking: Booking): void {
    if (booking.status === BookingStatusEnum.CANCELLED) return;
    const key = this.indexKey(booking.profileId, booking.date);
    if (!this.slotIndex.has(key)) {
      this.slotIndex.set(key, new Set());
    }
    this.slotIndex.get(key)!.add(booking.slot);
  }

  private removeFromIndex(booking: Booking): void {
    const key = this.indexKey(booking.profileId, booking.date);
    this.slotIndex.get(key)?.delete(booking.slot);
  }

  getBookedSlots(profileId: string, date: string): string[] {
    const key = this.indexKey(profileId, date);
    return Array.from(this.slotIndex.get(key) ?? []);
  }

  // Checks only if the slot is already taken in the index
  private isSlotBooked(profileId: string, date: string, slot: string): boolean {
    const key = this.indexKey(profileId, date);
    return this.slotIndex.get(key)?.has(slot) ?? false;
  }

  // Public check — validates slot belongs to profile AND isn't already booked
  isSlotAvailable(profileId: string, date: string, slot: string): boolean {
    const profile = this.profileService.getProfileById(profileId);
    if (!profile) throw new Error("Profile not found");

    if (!profile.availableSlots.includes(slot)) {
      throw new Error(`Slot ${slot} is not in this profile's schedule`);
    }

    return !this.isSlotBooked(profileId, date, slot);
  }

  getAvailableSlotsForDate(profileId: string, date: string): string[] {
    const profile = this.profileService.getProfileById(profileId);
    if (!profile) throw new Error("Profile not found");

    return profile.availableSlots.filter(
      (slot) => !this.isSlotBooked(profileId, date, slot), // use private method to avoid throw
    );
  }

  isProfileFullyBooked(profileId: string, date: string): boolean {
    const profile = this.profileService.getProfileById(profileId);
    if (!profile) throw new Error("Profile not found");

    return profile.availableSlots.every((slot) =>
      this.isSlotBooked(profileId, date, slot),
    );
  }

  createBooking(payload: {
    profileId: string;
    slot: string;
    date: string;
  }): Booking {
    if (!this.isSlotAvailable(payload.profileId, payload.date, payload.slot)) {
      throw new HttpError("Slot is not available", 200);
    }

    const profile = this.profileService.getProfileById(payload.profileId);
    if (!profile) {
      throw new HttpError("Slot is not available", 404);
    }

    const booking: Booking = {
      id: v4(),
      ...payload,
      status: "pending",
      createdAt: new Date().toISOString(),
      profileName: profile.name,
      profileTitle: profile.title,
    };

    this.bookings.unshift(booking);
    this.addToIndex(booking);
    return booking;
  }

  updateBookingStatus(
    id: string,
    status: Booking["status"],
  ): Booking | undefined {
    const booking = this.bookings.find((b) => b.id === id);
    if (!booking) return undefined;

    if (status === "cancelled") {
      this.removeFromIndex(booking);
    } else if (booking.status === "cancelled") {
      // Reactivating — add back to index
      this.addToIndex({...booking, status});
    }

    booking.status = status;
    return booking;
  }

  getBookingsForProfileByDate(profileId: string, date: string): Booking[] {
    return this.bookings.filter(
      (b) =>
        b.profileId === profileId &&
        b.date === date &&
        b.status !== BookingStatusEnum.CANCELLED,
    );
  }

  deleteBooking(id: string): boolean {
    const index = this.bookings.findIndex((b) => b.id === id);
    if (index === -1) return false;
    const booking = this.bookings[index];
    if (!booking) return false;

    this.removeFromIndex(booking);
    this.bookings.splice(index, 1);
    return true;
  }
}

export default BookingService;
