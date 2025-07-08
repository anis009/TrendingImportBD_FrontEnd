import { apiSlice } from "../api/apiSlice";
import getBaseUrl from "@/utils/getBaseUrl";

const BASE_URL = getBaseUrl();

export const reviewApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/api/review/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "Products",
        { type: "Product", id: arg.productId },
      ],
    }),
  }),
});

export const { useAddReviewMutation } = reviewApi;
