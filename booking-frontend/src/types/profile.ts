export interface Profile {
    name: string;
    id: string;
    title: string;
    availableSlots: string[];
}


export interface CreateProfilePayload {
  name: string
  title: string
  availableSlots: string[]
}

export interface UpdateProfilePayload {
  name?: string
  title?: string
  availableSlots?: string[]
}

export interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ProfilesResponse {
  status: number;
  data: Profile[];
  meta: PaginationMeta
  error?: string;
}

export interface ProfileResponse {
  status: number;
  data: Profile;
  error?: string;
}