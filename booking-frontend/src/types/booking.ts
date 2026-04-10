export interface Booking {
  id: string
  profileId: string
  slot: string
  date: string
  status: 'pending' | 'confirmed' | 'cancelled'
  createdAt: string
  profileName?: string
  profileTitle?: string
}

export interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface BookingsResponse {
  status: number
  data: Booking[]
  meta: PaginationMeta
  error?: string
}

export interface BookingResponse {
  status: number
  data: Booking
  error?: string
}

export interface CreateBookingPayload {
  profileId: string
  slot: string
  date: string
}

export interface UpdateBookingStatusPayload {
  status: 'pending' | 'confirmed' | 'cancelled'
}

export interface SlotsAvailablePayload {
  profileId: string
  date: string
}

export interface SlotsAvailableResponse {
  status: number
  data: {
    availableSlots: string[]
    fullyBooked: boolean
    profileId: string
    date: string
  }
}
