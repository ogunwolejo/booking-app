type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface Booking {
  id: string;
  profileId: string;
  profileName?: string;
  profileTitle?: string;
  slot: string;
  date: string;
  status: BookingStatus;
  createdAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Bookings {
  data: Booking[];
  meta: PaginationMeta;
}

export enum BookingStatusEnum {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
}

export type BookingProfileDateRequest = {profileId: string; date: string};
export type NewBookingRequest = {profileId: string; date: string; slot: string};
