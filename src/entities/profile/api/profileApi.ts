import {baseApi} from '@/shared/api'
import {ProfileDetails, ProfileId, ProfileFollowing, IFollowResponse, ProfileDetailsDto, IFollowRequest, IGetFollowStatusRequest} from "@/entities/profile/model/types";
import {mapProfileDetails} from "@/entities/profile/lib/mapProfileDetails";
import { EditProfileValidationSchema } from '@/features/editProfile/model/editProfileFormSchema';
import { CITIES_TAG, FOLLOW_STATUS_TAG, FOLLOWERS_TAG, FOLLOWINGS_TAG, PROFILE_TAG, SESSION_TAG } from '@/shared/api/tags';

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    profileDetails: build.query<ProfileDetails, ProfileId>({
      query: ({userId}) => ({
        url: `/users/${userId}/`,
      }),
      providesTags: [PROFILE_TAG],
      transformResponse: (response: ProfileDetailsDto) =>
          mapProfileDetails(response),
    }),
    myDetails: build.query<ProfileDetails, void>({
      query: () => ({
        url: `/me`,
      }),
      transformResponse: (response: ProfileDetailsDto) =>
          mapProfileDetails(response),
      providesTags: [PROFILE_TAG, SESSION_TAG],
    }),
    getFollowing: build.query<ProfileFollowing[], IFollowRequest>({
      query: ({ userId, username }) => ({
        url: `/users/${userId}/following/`,
        params: { username },
      }),
      providesTags: [FOLLOWINGS_TAG]
    }),
    getFollowStatus: build.query<ProfileFollowing, IGetFollowStatusRequest>({
      query: ({ user_id, followed_user_id }) => ({
        url: `/users/${followed_user_id}/follow/${user_id}/status/`,
        method: 'GET'
      }),
      providesTags: [FOLLOW_STATUS_TAG]
    }),
    getFollowers: build.query<ProfileFollowing[], ProfileId>({
      query: ({userId}) => ({
        url: `/users/${userId}/followers/`,
      }),
      providesTags: [FOLLOWERS_TAG]
    }),
    follow: build.mutation<IFollowResponse, ProfileId>({
      query: ({userId}) => ({
        url: `/users/${userId}/follow/`,
        method: 'POST',
      }),
      invalidatesTags: [FOLLOWINGS_TAG, FOLLOWERS_TAG, FOLLOW_STATUS_TAG]
    }),
    unFollow: build.mutation<void, ProfileId>({
      query: ({userId}) => ({
        url: `/users/${userId}/unfollow/`,
        method: 'DELETE',
      }),
      invalidatesTags: [FOLLOWINGS_TAG, FOLLOWERS_TAG, FOLLOW_STATUS_TAG]
    }),
    editProfile: build.mutation<EditProfileValidationSchema, ProfileId>({
      query: ({userId, ...patch}) => ({
        url: `/users/${userId}/`,
        method: 'PATCH',
        body: patch
      }),
      invalidatesTags: [PROFILE_TAG, CITIES_TAG]
    }),
  }),
})

export const {
  useProfileDetailsQuery,
  useMyDetailsQuery,
  useLazyMyDetailsQuery,
  useGetFollowingQuery,
  useGetFollowStatusQuery,
  useGetFollowersQuery,
  useFollowMutation,
  useUnFollowMutation,
  useEditProfileMutation,
} = profileApi
