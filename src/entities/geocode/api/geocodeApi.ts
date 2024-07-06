import { baseApi } from "@/shared/api";

const geocodeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    geocodeId: build.query<google.maps.GeocoderResponse, string>({
      queryFn: async (placeId) => {
        try {
          const geocoder = new google.maps.Geocoder();

          const geocodeRes = await geocoder.geocode({ placeId });

          return { data: geocodeRes };
        } catch (err) {
          return { error: {
            status: 500,
            statusText: 'Internal Server Error',
            data: `Ошибка при геокодировании - ${JSON.stringify(err)}`,
          } }
        }
      },
      providesTags: ['PROFILE_TAG']
    })
  })
})

export const {
  useGeocodeIdQuery
} = geocodeApi;
