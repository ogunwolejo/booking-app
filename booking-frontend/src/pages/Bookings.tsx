import { useState, useEffect, useCallback } from 'react'
import { bookingClient } from '@/services/bookingService'
import CreateBookingDialog from '@/components/CreateBookingDialog'
import type { Booking, PaginationMeta } from '@/types/booking'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

const DEFAULT_PAGE_SIZE = 10

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<PaginationMeta>({
    total: 0,
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
    totalPages: 0,
  })
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { page, totalPages, total, limit } = pagination

  const fetchBookings = useCallback(async (page = 1) => {
    setLoading(true)
    setError(null)
    try {
      const response = await bookingClient.getBookings({ page, limit: DEFAULT_PAGE_SIZE })
      setBookings(response.data)
      if (response.meta) setPagination(response.meta)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch bookings')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  const handleBookingSubmit = async (data: { profileId: string; slot: string; date: string }) => {
    setIsSubmitting(true)
    try {
      await bookingClient.createBooking(data)
      setIsOpen(false)
      fetchBookings(page)
    } catch (error) {
      console.error('Error creating booking:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen || isSubmitting) setIsOpen(newOpen)
  }

  const handleCloseChange = () => {
    setIsOpen(false)
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'cancelled':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getPageNumbers = (): (number | 'ellipsis')[] => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const pages: (number | 'ellipsis')[] = [1]
    if (page > 3) pages.push('ellipsis')
    const start = Math.max(2, page - 1)
    const end = Math.min(totalPages - 1, page + 1)
    for (let i = start; i <= end; i++) pages.push(i)
    if (page < totalPages - 2) pages.push('ellipsis')
    pages.push(totalPages)
    return pages
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading bookings...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Error loading bookings</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Bookings</h1>
          <p className="text-gray-600 mt-2 text-lg">View all booking reservations</p>
        </div>
        <CreateBookingDialog
          isOpen={isOpen}
          onOpenChange={handleOpenChange}
          closeModal={handleCloseChange}
          onSubmit={handleBookingSubmit}
          isSubmitting={isSubmitting}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <Table>
            <TableCaption className="pb-6">
              {total === 0
                ? 'No bookings found.'
                : `Showing ${(page - 1) * limit + 1}–${Math.min(page * limit, total)} of ${total} bookings`}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="px-8 py-5">Profile</TableHead>
                <TableHead className="px-8 py-5">Date</TableHead>
                <TableHead className="px-8 py-5">Slot</TableHead>
                <TableHead className="px-8 py-5">Status</TableHead>
                <TableHead className="px-8 py-5">Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500 py-10">
                    No bookings available.
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="px-8 py-5 font-medium">
                      {booking.profileName ?? '-'}
                    </TableCell>
                    <TableCell className="px-8 py-5">{booking.date}</TableCell>
                    <TableCell className="px-8 py-5">{booking.slot}</TableCell>
                    <TableCell className="px-8 py-5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(booking.status)}`}
                      >
                        {booking.status}
                      </span>
                    </TableCell>
                    <TableCell className="px-8 py-5 text-gray-400 text-sm">
                      {new Date(booking.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (page > 1) fetchBookings(page - 1)
                }}
                className={page === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            {getPageNumbers().map((p, index) =>
              p === 'ellipsis' ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={p}>
                  <PaginationLink
                    href="#"
                    isActive={p === page}
                    onClick={(e) => {
                      e.preventDefault()
                      fetchBookings(p)
                    }}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (page < totalPages) fetchBookings(page + 1)
                }}
                className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
