export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <table className="w-full">{children}</table>
    </div>
  )
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return <thead>{children}</thead>
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>
}

export function TableRow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <tr className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${className}`}>{children}</tr>
}

export function TableHead({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={`px-6 py-3 text-left text-sm font-semibold text-gray-900 bg-gray-50 ${className}`}>
      {children}
    </th>
  )
}

export function TableCell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-6 py-4 text-sm text-gray-900 ${className}`}>{children}</td>
}
