import {baseApi} from '@/shared/api'
import {ProfileDetailsDto} from "@/entities/profile/api/types.ts";
import {ProfileDetails, ProfileId} from "@/entities/profile/model/types.ts";
import {mapProfileDetails} from "@/entities/profile/lib/mapProfileDetails.ts";


export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    profileDetails: build.query<ProfileDetails, ProfileId>({
      query: (profileId) => ({
        url: `/profiles/${profileId}/`,
      }),
      transformResponse: (response: ProfileDetailsDto) =>
          mapProfileDetails(response),
    }),
}),
})

export const {  useProfileDetailsQuery } = profileApi
