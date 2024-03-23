import {baseApi} from '@/shared/api'
import {ProfileDetailsDto} from "@/entities/profile/api/types";
import {ProfileDetails, ProfileId} from "@/entities/profile/model/types";
import {mapProfileDetails} from "@/entities/profile/lib/mapProfileDetails";


export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    profileDetails: build.query<ProfileDetails, ProfileId>({
      query: (profileId) => ({
        url: `/profiles/${profileId}/`,
      }),
      transformResponse: (response: ProfileDetailsDto) =>
          mapProfileDetails(response),
    }),
    myDetails: build.query<ProfileDetails, void>({
      query: () => ({
        url: `/me`,
      }),
      transformResponse: (response: ProfileDetailsDto) =>
          mapProfileDetails(response),
    }),
}),
})

export const {
  useProfileDetailsQuery,
  useMyDetailsQuery,
} = profileApi
