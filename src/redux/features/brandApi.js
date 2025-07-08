import { apiSlice } from "../api/apiSlice";
import getBaseUrl from "@/utils/getBaseUrl";

const BASE_URL = getBaseUrl();

export const brandApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getActiveBrands: builder.query({
      query: () => `${BASE_URL}/api/brand/active`,
    }),
  }),
});

export const { useGetActiveBrandsQuery } = brandApi;
