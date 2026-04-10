import type {
  CreateBookingPayload,
  BookingsResponse,
  BookingResponse,
  UpdateBookingStatusPayload,
  SlotsAvailableResponse,
  SlotsAvailablePayload,
} from '@/types/booking'
import apiClient from './api'
import { AxiosError } from 'axios'

/**
 * Error handling utility for booking service
 * Extracts error message from AxiosError or returns generic message
 */
function handleError(error: unknown): never {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message ?? error.message
    throw new Error(message)
  }
  throw error
}

/**
 * Booking Service Client
 * Provides methods to interact with booking endpoints
 * All methods support optional pagination for list endpoints
 */
export const bookingClient = {
  /**
   * Get all bookings with optional pagination
   * @param options - Optional pagination parameters
   * @param options.page - Page number (1-indexed)
   * @param options.limit - Items per page
   * @returns Promise with bookings data and pagination metadata
   */
  async getBookings({
    page,
    limit,
  }: { page?: number; limit?: number } = {}): Promise<BookingsResponse> {
    try {
      const response = await apiClient.get<BookingsResponse>('/bookings', {
        params: {
          ...(page && { page }),
          ...(limit && { limit }),
        },
      })
      return response.data
    } catch (error) {
      handleError(error)
    }
  },

  /**
   * Get a single booking by ID
   * @param id - The booking ID
   * @returns Promise with booking data
   */
  async getBookingById(id: string): Promise<BookingResponse> {
    try {
      const response = await apiClient.get<BookingResponse>(`/bookings/${id}`)
      return response.data
    } catch (error) {
      handleError(error)
    }
  },

  /**
   * Create a new booking
   * @param payload - Booking creation payload
   * @param payload.profileId - ID of the professional
   * @param payload.slot - Time slot (e.g., "09:00")
   * @param payload.date - Booking date (YYYY-MM-DD format)
   * @returns Promise with created booking
   */
  async createBooking(payload: CreateBookingPayload): Promise<BookingResponse> {
    try {
      const response = await apiClient.post<BookingResponse>('/bookings', payload)
      return response.data
    } catch (error) {
      handleError(error)
    }
  },

  /**
   * Update booking status
   * @param id - The booking ID
   * @param payload - Status update payload
   * @param payload.status - New status (pending, confirmed, or cancelled)
   * @returns Promise with updated booking
   */
  async updateBookingStatus(
    id: string,
    payload: UpdateBookingStatusPayload
  ): Promise<BookingResponse> {
    try {
      const response = await apiClient.patch<BookingResponse>(`/bookings/${id}`, payload)
      return response.data
    } catch (error) {
      handleError(error)
    }
  },

  /**
   * Delete a booking
   * @param id - The booking ID
   * @returns Promise that resolves when deleted
   */
  async deleteBooking(id: string): Promise<void> {
    try {
      await apiClient.delete(`/bookings/${id}`)
    } catch (error) {
      handleError(error)
    }
  },

  /**
   * Get all booked slots for a specific date and professional
   * @param profileId - ID of the professional
   * @param date - Date to check (YYYY-MM-DD format)
   * @returns Promise with array of booked time slots
   */
  async getBookedSlots(profileId: string, date: string): Promise<string[]> {
    try {
      const response = await apiClient.get<{ data: string[] }>(
        `/bookings/slots/${profileId}/${date}`
      )
      return response.data.data
    } catch (error) {
      handleError(error)
    }
  },

  /**
   * Check if a specific slot is available
   * @param profileId - ID of the professional
   * @param date - Date to check (YYYY-MM-DD format)
   * @param slot - Time slot to check (e.g., "09:00")
   * @returns Promise with boolean indicating availability
   */
  async isSlotAvailable(profileId: string, date: string, slot: string): Promise<boolean> {
    try {
      const response = await apiClient.get<{ data: boolean }>(
        `/bookings/availability/${profileId}/${date}/${slot}`
      )
      return response.data.data
    } catch (error) {
      handleError(error)
    }
  },

  /**
   * Check if a specific slot is available
   * @param profileId - ID of the professional
   * @param date - Date to check (YYYY-MM-DD format)
   * @returns Promise with boolean indicating availability
   */
  async availableProfileSlots(payload: SlotsAvailablePayload): Promise<SlotsAvailableResponse> {
    try {
      const response = await apiClient.post<SlotsAvailableResponse>(`/bookings/slots`, {
        payload,
      })
      return response.data
    } catch (error) {
      handleError(error)
    }
  },
}
