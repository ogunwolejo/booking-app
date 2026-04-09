import { useParams, useNavigate } from 'react-router-dom'
import { useProfiles } from '@/contexts/ProfileContext'
import { ArrowLeft, Clock } from 'lucide-react'
import { LoadingSpinner } from '@/components/Loader'

export default function ProfileDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { profiles, loading, error } = useProfiles()

  const profile = profiles.find((p) => p.id === id)

  if (loading) {
    return (
      <LoadingSpinner/>
    )
  }

  if (error || !profile) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-4">Profile not found</p>
          <button
            onClick={() => navigate('/profiles')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Profiles
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/profiles')}
          className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Profiles
        </button>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Profile Details</h1>
        <p className="text-gray-600 mt-2 text-lg">View complete information about this profile</p>
      </div>

      {/* Profile Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Profile Info */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Full Name</p>
                <p className="text-3xl font-bold text-gray-900">{profile.name}</p>
              </div>

              {/* Title */}
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Job Title</p>
                <div className="inline-block px-4 py-2 rounded-lg bg-teal-50 border border-teal-200">
                  <p className="text-lg font-semibold text-teal-700">{profile.title}</p>
                </div>
              </div>

              {/* ID */}
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Profile ID</p>
                <p className="text-sm font-mono text-gray-700 bg-gray-50 px-3 py-2 rounded-lg break-all">
                  {profile.id}
                </p>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Available Slots</p>
                  <p className="text-2xl font-bold text-teal-600">{profile.availableSlots.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Sidebar */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-sm p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5" />
              <p className="text-sm font-medium text-teal-100">Available Slots</p>
            </div>
            <p className="text-3xl font-bold">{profile.availableSlots.length}</p>
          </div>
        </div>
      </div>

      {/* Available Time Slots */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Time Slots</h2>

        {profile.availableSlots.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {profile.availableSlots.map((slot, idx) => (
              <div
                key={idx}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <button
                  className="relative px-4 py-3 bg-white text-center rounded-lg text-teal-600 font-semibold hover:bg-teal-50 transition-colors w-full"
                >
                  <div className="flex flex-col items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{slot}</span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No available time slots</p>
          </div>
        )}
      </div>

      {/* Booking Section */}
      <div className="bg-gradient-to-r from-teal-50 to-teal-50 rounded-xl border border-teal-200 p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Ready to Book?</h3>
        <p className="text-gray-600 mb-4">Select one of the available time slots above to schedule a booking with {profile.name}.</p>
        <button
          onClick={() => navigate(`/bookings/create/${profile.id}`)}
          className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
        >
          Create Booking
        </button>
      </div>
    </div>
  )
}
