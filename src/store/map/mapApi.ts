import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mapApi = createApi({
    reducerPath : "mapApi",
    baseQuery: fetchBaseQuery({baseUrl: "https://meetups-dev-6vuzexfx2q-lm.a.run.app/api/v1/"}),
    endpoints : (build) => ({
        getMap: build.query({
            query: () => "markers"
        })
    })
})

export const {useGetMapQuery} = mapApi