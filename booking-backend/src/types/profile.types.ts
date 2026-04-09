export type Profile = {
  id: string;
  name: string;
  title: string;
  availableSlots: string[];
};

export type NewProfile = Omit<Profile, "id">;

export type ProfileMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type Profiles = {
  data: Profile[];
  meta: ProfileMeta;
};
