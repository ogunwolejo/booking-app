import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useProfiles } from '@/contexts/ProfileContext'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar, Clock, AlertCircle, CheckCircle } from 'lucide-react'

// Zod validation schema
const bookingSchema = z.object({
  profileId: z.string().min(1, 'Please select a valid professional'),
  slot: z.string().min(1, 'Please select a time slot'),
  date: z.string().min(1, 'Please select a booking date'),
})

type BookingFormData = z.infer<typeof bookingSchema>

interface BookingFormProps {
  initialProfileId?: string
  onSubmit?: (data: BookingFormData) => void | Promise<void>
  isSubmitting?: boolean
  showDateField?: boolean
}

export default function BookingForm({
  initialProfileId,
  onSubmit,
  isSubmitting = false,
  showDateField = true,
}: BookingFormProps) {
  const { profiles } = useProfiles()
  
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: 'onChange',
    defaultValues: {
      profileId: initialProfileId || '',
      slot: '',
      date: new Date().toISOString().split('T')[0],
    },
  })

  const selectedProfileId = watch('profileId')
  const selectedSlot = watch('slot')
  const selectedDate = watch('date')

  const selectedProfile = profiles.find((p) => p.id === selectedProfileId)

  const handleFormSubmit = handleSubmit(async (data) => {
    if (onSubmit) {
      await onSubmit(data)
      reset()
    }
  })

  const minDate = new Date().toISOString().split('T')[0]

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {/* Profile Selection */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-900">
          Select Professional <span className="text-red-500">*</span>
        </label>
        <Controller
          name="profileId"
          control={control}
          render={({ field }) => (
            <>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  className={`w-full ${
                    errors.profileId ? 'border-red-500' : ''
                  }`}
                >
                  <SelectValue placeholder="Choose a professional..." />
                </SelectTrigger>
                <SelectContent className="!bg-white">
                  {profiles.map((profile) => (
                    <SelectItem key={profile.id} value={profile.id} className="!border-none">
                      <div className="flex flex-col">
                        <span className="font-medium">{profile.name}</span>
                        <span className="text-sm text-gray-500">{profile.title}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.profileId && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.profileId.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      {/* Available Slots */}
      {selectedProfile && (
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-900">
            Select Time Slot <span className="text-red-500">*</span>
          </label>
          <Controller
            name="slot"
            control={control}
            render={({ field }) => (
              <>
                {selectedProfile.availableSlots.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {selectedProfile.availableSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => field.onChange(slot)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          field.value === slot
                            ? 'bg-teal-600 text-white border-2 border-teal-700 ring-2 ring-teal-300'
                            : 'bg-gray-100 text-gray-700 hover:bg-teal-50 border-2 border-transparent'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{slot}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <p className="text-sm text-yellow-700">No available slots for this professional</p>
                  </div>
                )}
                {errors.slot && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.slot.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
      )}

      {/* Booking Date */}
      {showDateField && (
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Booking Date <span className="text-red-500">*</span>
          </label>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="date"
                  {...field}
                  min={minDate}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                    errors.date
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300'
                  }`}
                />
                {errors.date && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.date.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
      )}

      {/* Form Summary */}
      {selectedProfile && selectedSlot && selectedDate && (
        <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg">
          <div className="flex items-start gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm font-semibold text-gray-900">Booking Summary</p>
          </div>
          <ul className="text-sm space-y-2 text-gray-700 ml-7">
            <li>
              <span className="font-medium">Professional:</span> {selectedProfile.name}
              <div className="text-xs text-gray-600">{selectedProfile.title}</div>
            </li>
            <li>
              <span className="font-medium">Time:</span> {selectedSlot}
            </li>
            {selectedDate && (
              <li>
                <span className="font-medium">Date:</span> {new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full px-4 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Creating Booking...
          </>
        ) : (
          'Create Booking'
        )}
      </button>
    </form>
  )
}
