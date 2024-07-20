import { baseApi } from "@/shared/api";

const geocodeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    geocodeId: build.query<string, string>({
      queryFn: async (placeId) => {
        try {
          const geocoder = new google.maps.Geocoder();

          const geocodeRes = await geocoder.geocode({ placeId });

          const cityName =
            geocodeRes.results[0].address_components.find((addr) => addr.types.some((el) => el === 'locality'))?.short_name ?? ''

          return { data: cityName };
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
