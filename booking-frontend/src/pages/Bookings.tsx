export default function BookingsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" }
      case "pending":
        return { bg: "bg-yellow-100", text: "text-yellow-700", dot: "bg-yellow-500" }
      case "cancelled":
        return { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" }
      default:
        return { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-500" }
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Bookings</h1>
        <p className="text-gray-600 mt-2 text-lg">View all booking reservations</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
        </div>

        <div className="px-6 py-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-gray-50">
          <p className="text-sm text-gray-600">
          </p>
        </div>
      </div>
    </div>
  )
}
