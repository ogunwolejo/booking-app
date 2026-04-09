export type Profile = {
  id: string;
  name: string;
  title: string;
  availableSlots: string[];
};

export type NewProfile = Omit<Profile, "id">;
