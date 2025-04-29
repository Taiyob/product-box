import { CategoryList, Product, ProductResponse } from "../../../types/product";
import { baseApi } from "../baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<
      ProductResponse,
      { limit: number; skip: number }
    >({
      query: ({ limit, skip }) => ({
        url: `/products`,
        method: "GET",
        params: { limit, skip },
      }),
    }),

    getProductById: builder.query<Product, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),

    getProductCategories: builder.query<CategoryList, void>({
      query: () => ({
        url: `/products/categories`,
        method: "GET",
      }),
    }),

    updateProduct: builder.mutation<
      Partial<Product>,
      { id: number; body: Partial<Product> }
    >({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetProductCategoriesQuery,
  useUpdateProductMutation,
} = productApi;
