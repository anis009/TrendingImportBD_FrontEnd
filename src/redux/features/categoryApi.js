import { apiSlice } from "../api/apiSlice";
import getBaseUrl from "@/utils/getBaseUrl";

const BASE_URL = getBaseUrl();

export const categoryApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/api/category/add`,
        method: "POST",
        body: data,
      }),
    }),
    getShowCategory: builder.query({
      query: () => `${BASE_URL}/api/category/show`,
    }),
    getListCategory: builder.query({
      query: () => `${BASE_URL}/api/categories/list`,
    }),
    getProductTypeCategory: builder.query({
      query: (type) => `${BASE_URL}/api/category/show/${type}`,
    }),
    getCategoriesHierarchy: builder.query({
      query: (type) => `${BASE_URL}/api/categories/hierarchy`,
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetProductTypeCategoryQuery,
  useGetShowCategoryQuery,
  useGetCategoriesHierarchyQuery,
  useGetListCategoryQuery,
} = categoryApi;
