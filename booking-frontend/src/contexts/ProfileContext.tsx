import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { profileClient } from '@/services/profileService'
import type { PaginationMeta, Profile } from '@/types/profile'

interface ProfileContextType {
  profiles: Profile[]
  loading: boolean
  error: string | null
  pagination: PaginationMeta
  setPage: (page: number) => void
  fetchProfiles: (page?: number) => Promise<void>
  getProfileById: (id: string) => Profile | undefined
  refreshProfiles: () => Promise<void>
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

const DEFAULT_PAGE_SIZE = 10

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<PaginationMeta>({
    total: 0,
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
    totalPages: 0,
  })

  const fetchProfiles = useCallback(async (page = 1) => {
    setLoading(true)
    setError(null)
    try {
      const response = await profileClient.getProfiles({ page, limit: DEFAULT_PAGE_SIZE })
      setProfiles(response.data)
      setPagination(response.meta)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch profiles'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  const setPage = useCallback(
    (page: number) => {
      fetchProfiles(page)
    },
    [fetchProfiles]
  )

  const refreshProfiles = useCallback(async () => {
    await fetchProfiles(pagination.page)
  }, [fetchProfiles, pagination.page])

  const getProfileById = useCallback(
    (id: string) => profiles.find((profile) => profile.id === id),
    [profiles]
  )

  useEffect(() => {
    fetchProfiles()
  }, [fetchProfiles])

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        loading,
        error,
        pagination,
        setPage,
        fetchProfiles,
        getProfileById,
        refreshProfiles,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProfiles = (): ProfileContextType => {
  const context = useContext(ProfileContext)
  if (!context) throw new Error('useProfiles must be used within a ProfileProvider')
  return context
}
