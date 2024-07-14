import {baseApi} from '@/shared/api'
import {ProfileDetails, ProfileId, ProfileFollowing, IFollowResponse, ProfileDetailsDto} from "@/entities/profile/model/types";
import {mapProfileDetails} from "@/entities/profile/lib/mapProfileDetails";
import { EditProfileValidationSchema } from '@/features/editProfile/model/editProfileFormSchema';

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    profileDetails: build.query<ProfileDetails, ProfileId>({
      query: ({userId}) => ({
        url: `/users/${userId}/`,
      }),
      providesTags: ['PROFILE_TAG'],
      transformResponse: (response: ProfileDetailsDto) =>
          mapProfileDetails(response),
    }),
    myDetails: build.query<ProfileDetails, void>({
      query: () => ({
        url: `/me`,
      }),
      transformResponse: (response: ProfileDetailsDto) =>
          mapProfileDetails(response),
      providesTags: ['PROFILE_TAG', 'SESSION_TAG'],

    }),
    getFollowing: build.query<ProfileFollowing[], ProfileId>({
      query: ({userId}) => ({
        url: `/users/${userId}/following/`,
      }),
    }),
    getFollowers: build.query<ProfileFollowing[], ProfileId>({
      query: ({userId}) => ({
        url: `/users/${userId}/followers/`,
      }),
    }),
    follow: build.mutation<IFollowResponse, ProfileId>({
      query: ({userId}) => ({
        url: `/users/${userId}/follow/`,
        method: 'POST',
      }),
    }),
    unFollow: build.mutation<void, ProfileId>({
      query: ({userId}) => ({
        url: `/users/${userId}/unfollow/`,
        method: 'DELETE',
      }),
    }),
    editProfile: build.mutation<EditProfileValidationSchema, ProfileId>({
      query: ({userId, ...patch}) => ({
        url: `/users/${userId}/`,
        method: 'PATCH',
        body: patch
      }),
      invalidatesTags: ['PROFILE_TAG']
    }),
}),
})

export const {
  useProfileDetailsQuery,
  useMyDetailsQuery,
  useLazyMyDetailsQuery,
  useGetFollowingQuery,
  useGetFollowersQuery,
  useFollowMutation,
  useUnFollowMutation,
  useEditProfileMutation,
} = profileApi
