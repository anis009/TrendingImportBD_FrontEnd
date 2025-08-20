import { objectToParams } from "@/utils/common";
import { apiSlice } from "../api/apiSlice";
import getBaseUrl from "@/utils/getBaseUrl";

const BASE_URL = getBaseUrl();

export const productApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (query) => `${BASE_URL}/api/product/all?${objectToParams(query)}`,
      providesTags: ["Products"],
    }),
    getProductType: builder.query({
      query: ({ type, query }) => `${BASE_URL}/api/product/${type}?${query}`,
      providesTags: ["ProductType"],
    }),
    getOfferProducts: builder.query({
      query: (type) => `${BASE_URL}/api/product/offer?type=${type}`,
      providesTags: ["OfferProducts"],
    }),
    getPopularProductByType: builder.query({
      query: (type) => `${BASE_URL}/api/product/popular/${type}`,
      providesTags: ["PopularProducts"],
    }),
    getTopRatedProducts: builder.query({
      query: () => `${BASE_URL}/api/product/top-rated`,
      providesTags: ["TopRatedProducts"],
    }),
    // get single product
    getProduct: builder.query({
      query: (id) => `${BASE_URL}/api/product/single-product/${id}`,
      providesTags: (result, error, arg) => [{ type: "Product", id: arg }],
      invalidatesTags: (result, error, arg) => [
        { type: "RelatedProducts", id: arg },
      ],
    }),
    // get related products
    getRelatedProducts: builder.query({
      query: (id) => `${BASE_URL}/api/product/related-product/${id}`,
      providesTags: (result, error, arg) => [
        { type: "RelatedProducts", id: arg },
      ],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductTypeQuery,
  useGetOfferProductsQuery,
  useGetPopularProductByTypeQuery,
  useGetTopRatedProductsQuery,
  useGetProductQuery,
  useGetRelatedProductsQuery,
} = productApi;
