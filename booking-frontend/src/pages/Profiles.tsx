import { useProfiles } from "@/contexts/ProfileContext"
import { Link, useNavigate } from "react-router-dom"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function ProfilesPage() {
  const navigate = useNavigate()
  const { profiles, loading, error, pagination, setPage } = useProfiles()
  const { page, totalPages, total, limit } = pagination

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    pages.push(1)
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profiles...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Error loading profiles</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Profiles</h1>
        <p className="text-gray-600 mt-2 text-lg">Manage and view all available profiles</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <Table>
            <TableCaption className="pb-6">
              {total === 0
                ? 'No profiles found.'
                : `Showing ${(page - 1) * limit + 1}–${Math.min(page * limit, total)} of ${total} profiles`}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="px-8 py-5">Name</TableHead>
                <TableHead className="px-8 py-5">Title</TableHead>
                <TableHead className="px-8 py-5">Available Slots</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-gray-500 py-10">
                    No profiles available.
                  </TableCell>
                </TableRow>
              ) : (
                profiles.map((profile) => (
                    <TableRow key={profile.id}>
                        <TableCell className="font-medium px-8 py-5">
                            <Link
                                to={`/profiles/${profile.id}`}
                                className="cursor-pointer hover:text-teal-50 transition-colors duration-150"
                            >
                                {profile.name}
                            </Link>
                        </TableCell>
                        <TableCell className="px-8 py-5">{profile.title}</TableCell>
                        <TableCell className="px-8 py-5">
                        {profile.availableSlots.length} slot{profile.availableSlots.length !== 1 ? 's' : ''}
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
                onClick={(e) => { e.preventDefault(); if (page > 1) setPage(page - 1) }}
                aria-disabled={page === 1}
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
                    onClick={(e) => { e.preventDefault(); setPage(p) }}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => { e.preventDefault(); if (page < totalPages) setPage(page + 1) }}
                aria-disabled={page === totalPages}
                className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}