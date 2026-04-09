import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import BookingForm from '@/components/BookingForm'
import { ArrowLeft } from 'lucide-react'

export default function BookingCreatePage() {
  const { profileId } = useParams<{ profileId?: string }>()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleBookingSubmit = async (data: {
    profileId: string
    slot: string
    date: string
  }) => {
    setIsSubmitting(true)
    try {
      // TODO: Make API call to create booking
      console.log('Creating booking:', data)
      // await bookingService.createBooking(data)
      navigate('/bookings', { replace: true })
    } catch (error) {
      console.error('Error creating booking:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Create a Booking</h1>
        <p className="text-gray-600 mt-2 text-lg">
          Schedule a session with your preferred professional
        </p>
      </div>

      {/* Form Card */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <BookingForm
            initialProfileId={profileId}
            onSubmit={handleBookingSubmit}
            isSubmitting={isSubmitting}
            showDateField={true}
          />
        </div>
      </div>
    </div>
  )
}
