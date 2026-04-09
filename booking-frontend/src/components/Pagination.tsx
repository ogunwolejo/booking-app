import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="outline"
        size="sm"
        className="flex items-center gap-2 border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700 disabled:opacity-50"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">
          Page <span className="font-semibold text-teal-600">{currentPage}</span> of{" "}
          <span className="font-semibold text-teal-600">{totalPages}</span>
        </span>
      </div>

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="outline"
        size="sm"
        className="flex items-center gap-2 border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700 disabled:opacity-50"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
