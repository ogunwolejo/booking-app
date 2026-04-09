import type { CreateProfilePayload, ProfilesResponse, ProfileResponse, UpdateProfilePayload } from '@/types/profile'
import apiClient from './api'
import { AxiosError } from 'axios'

function handleError(error: unknown): never {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message ?? error.message
    throw new Error(message)
  }
  throw error
}

export const profileClient = {
  async getProfiles({page, limit}: {page?: number, limit?: number} = {}): Promise<ProfilesResponse> {
    try {
      const response = await apiClient.get<ProfilesResponse>('/profile', {
        params: {page, limit}
      })
      return response.data
    } catch (error) {
      handleError(error)
    }
  },

  async getProfileById(id: string): Promise<ProfileResponse> {
    try {
      const response = await apiClient.get<ProfileResponse>(`/profile/${id}`)
      return response.data
    } catch (error) {
      handleError(error)
    }
  },

  async createProfile(payload: CreateProfilePayload): Promise<ProfileResponse> {
    try {
      const response = await apiClient.post<ProfileResponse>('/profile', payload)
      return response.data
    } catch (error) {
      handleError(error)
    }
  },

  async updateProfile(id: string, payload: UpdateProfilePayload): Promise<ProfileResponse> {
    try {
      const response = await apiClient.put<ProfileResponse>(`/profile/${id}`, payload)
      return response.data
    } catch (error) {
      handleError(error)
    }
  },

  async deleteProfile(id: string): Promise<void> {
    try {
      await apiClient.delete(`/profile/${id}`)
    } catch (error) {
      handleError(error)
    }
  },
}