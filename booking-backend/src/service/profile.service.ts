import type {NewProfile, Profile, Profiles} from "../types/profile.types.js";
import {v4} from "uuid";
import HttpError from "../utils/httpError.js";
import {logger} from "../utils/logger.js";
import {mockProfiles} from "../utils/mock/profile.mock.js";

class ProfileService {
  private profiles: Profile[] = [];

  constructor() {
    this.profiles = mockProfiles;
  }

  private addToProfile(p: Profile): void {
    this.profiles.push(p);
    logger.debug(
      `Profile successfully added. Total profiles: ${this.profiles.length}`,
    );
  }

  getProfiles(page: number | undefined, limit: number | undefined): Profiles {
    if (!page || !limit) {
      return {
        data: this.profiles,
        meta: {
          total: this.profiles.length,
          page: 1,
          limit: 1,
          totalPages: 1,
        },
      };
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    const data = this.profiles.slice(start, end);

    logger.info(
      `Fetching profiles - page: ${page}, limit: ${limit}, total: ${this.profiles.length}`,
    );

    return {
      data,
      meta: {
        total: this.profiles.length,
        page,
        limit: limit,
        totalPages: Math.ceil(this.profiles.length / limit),
      },
    };
  }

  getProfileById(id: string): Profile | undefined {
    const profile = this.profiles.find((profile) => profile.id === id);
    return profile;
  }

  addNewProfile(profile: NewProfile): Profile {
    logger.info(
      `Attempting to create new profile - Name: ${profile.name}, Title: ${profile.title}`,
    );

    const nProfile: Profile = {
      ...profile,
      id: v4(),
    };

    logger.debug(`Generated new profile ID: ${nProfile.id}`);

    // check and ensure that profile with the same name and title doesn't already exist
    const profileExist = this.profiles.find((p) => {
      if (p.name === profile.name && p.title === profile.title) return p;
    });

    if (profileExist) {
      logger.error(
        `Profile creation failed - Duplicate found. Name: "${profile.name}", Title: "${profile.title}" already exists`,
      );
      throw new HttpError("Profile already exists", 409);
    }

    this.addToProfile(nProfile);
    return nProfile;
  }
}

export default ProfileService;
