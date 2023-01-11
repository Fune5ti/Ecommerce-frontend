import { api } from "./api";
import { PaginationResponse, Product } from "./interfaces";

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getallproducts: build.query<
      PaginationResponse<Product>,
      { page: number; params: any }
    >({
      query: ({ page = 1, params = {} }) => {
        return {
          url: `/products/filter?page=${page}`,
          params: params,
        };
      },
      transformErrorResponse: (response) => {
        return {
          message: "Error ao obter agendamentos",
          status: response.status,
        };
      },
      providesTags: ["Product"],
    }),
    getproductbyid: build.query<Product, string>({
      query: (id) => `/product/${id}`,
      transformErrorResponse: (response) => {
        return {
          message: "Error ao obter o produto",
          status: response.status,
        };
      },
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useGetallproductsQuery,
  useLazyGetallproductsQuery,
  useLazyGetproductbyidQuery,
  useGetproductbyidQuery,
} = productApi;

export const {
  endpoints: { getallproducts },
} = productApi;
