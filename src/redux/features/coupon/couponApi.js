import { apiSlice } from "@/redux/api/apiSlice";
import getBaseUrl from "@/utils/getBaseUrl";

const BASE_URL = getBaseUrl();

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // get offer coupon
    getOfferCoupons: builder.query({
      query: () => `${BASE_URL}/api/coupon`,
      providesTags: ["Coupon"],
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useGetOfferCouponsQuery } = authApi;
