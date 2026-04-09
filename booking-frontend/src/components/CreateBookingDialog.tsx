import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import BookingForm from '@/components/BookingForm'
import { Plus } from 'lucide-react'
import { ReactNode } from 'react'

interface CreateBookingDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: { profileId: string; slot: string; date: string }) => Promise<void>
  isSubmitting?: boolean
  triggerText?: string
  triggerClassName?: string
  children?: ReactNode
}

export default function CreateBookingDialog({
  isOpen,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
  triggerText = 'New Booking',
  triggerClassName = '',
  children,
}: CreateBookingDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger>
        {children || (
          <button
            className={
              triggerClassName ||
              'inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors'
            }
          >
            <Plus className="w-4 h-4" />
            {triggerText}
          </button>
        )}
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="max-w-lg p-0 overflow-hidden bg-white"
        //onInteractOutside={(e) => e.preventDefault()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-50 rounded-lg">
              <Plus className="w-4 h-4 text-teal-600" />
            </div>
            <div>
              <DialogTitle className="text-base font-semibold text-gray-900">
                New Booking
              </DialogTitle>
              <p className="text-sm text-gray-500 mt-0.5">Fill in the details to create a reservation</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 py-5">
          <BookingForm
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            showDateField={true}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
