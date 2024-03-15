import { baseApi } from "@/shared/api";
import { IApiResponse } from "@/shared/types";
import { ICategory } from "../model/types";

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<IApiResponse<ICategory[]>, void>({
      query: () => ({
        url: '/categories/',
        method: 'GET',
      })
    })
  })
})

export const { useGetCategoriesQuery } = categoriesApi;
