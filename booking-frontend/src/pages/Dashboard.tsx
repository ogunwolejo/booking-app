import { useProfiles } from '@/contexts/ProfileContext'

export default function DashboardPage() {
  const { profiles, loading } = useProfiles()

  return (
    <div className="space-y-4 mt-8">
      <section className="rounded-4 border border-white/70 bg-white/90 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur">
        <div className="space-y-4">
          <span className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-teal-700">
            Booking overview
          </span>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              Clean booking operations, all in one dashboard.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Track profiles, monitor reservations, and move through the app without
              visual clutter or unnecessary side content.
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Profiles</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{loading ? '-' : profiles.length}</p>
            </div>
            <div className="bg-teal-100 rounded-full p-3">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-2a6 6 0 0112 0v2zm0 0h6v-2a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Available Slots</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {loading ? '-' : profiles.reduce((sum, p) => sum + p.availableSlots.length, 0)}
              </p>
            </div>
            <div className="bg-teal-100 rounded-full p-3">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
