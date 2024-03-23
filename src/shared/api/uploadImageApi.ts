import { baseApi } from ".";
import { IUploadImageResponse } from "../model/types";

const uploadImageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    uploadImage: build.mutation<IUploadImageResponse, FormData>({
      query: (formData) => ({
        url: '/upload/',
        method: 'POST',
        body: formData
      })
    })
  })
})

export const { useUploadImageMutation } = uploadImageApi;
