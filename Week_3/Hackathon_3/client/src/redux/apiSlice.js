import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "/",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Auth", "Cart", "Products", "Users"],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (body) => ({
        url: `${import.meta.env.VITE_API_URL_AUTH}/register`,
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: `${import.meta.env.VITE_API_URL_AUTH}/login`,
        method: "POST",
        body,
      }),
    }),

    // Cart
    getCart: builder.query({
      query: () => `${import.meta.env.VITE_API_URL_CART}`,
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation({
      query: ({ productId, quantity = 1 }) => ({
        url: `${import.meta.env.VITE_API_URL_CART}/add`,
        method: "POST",
        body: { productId, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCartItem: builder.mutation({
      query: ({ itemId, quantity }) => ({
        url: `${import.meta.env.VITE_API_URL_CART}/${itemId}`,
        method: "PUT",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: builder.mutation({
      query: ({ itemId }) => ({
        url: `${import.meta.env.VITE_API_URL_CART}/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    // Products
    getAllProducts: builder.query({
      query: (filters = {}) => {
        const queryParams = new URLSearchParams(filters).toString();
        return `${import.meta.env.VITE_API_URL_PRODUCTS}${
          queryParams ? `?${queryParams}` : ""
        }`;
      },
      providesTags: ["Products"],
    }),
    getProductById: builder.query({
      query: (id) => `${import.meta.env.VITE_API_URL_PRODUCTS}/${id}`,
      providesTags: ["Products"],
    }),
    getFilterOptions: builder.query({
      query: () => `${import.meta.env.VITE_API_URL_PRODUCTS}/filter-options`,
      providesTags: ["Products"],
    }),

    // Admin Product Management
    addProduct: builder.mutation({
      query: (body) => ({
        url: `${import.meta.env.VITE_API_URL_PRODUCTS}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `${import.meta.env.VITE_API_URL_PRODUCTS}/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${import.meta.env.VITE_API_URL_PRODUCTS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    // User Management (Admin/SuperAdmin)
    getAllUsers: builder.query({
      query: () => `${import.meta.env.VITE_API_URL_USERS}`,
      providesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${import.meta.env.VITE_API_URL_USERS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    updateUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `${import.meta.env.VITE_API_URL_USERS}/${id}/role`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: ["Users"],
    }),
    blockUser: builder.mutation({
      query: (id) => ({
        url: `${import.meta.env.VITE_API_URL_USERS}/${id}/block`,
        method: "PUT",
      }),
      invalidatesTags: ["Users"],
    }),
    unblockUser: builder.mutation({
      query: (id) => ({
        url: `${import.meta.env.VITE_API_URL_USERS}/${id}/unblock`,
        method: "PUT",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  // Auth
  useSignupMutation,
  useLoginMutation,

  // Cart
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,

  // Products
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetFilterOptionsQuery,

  // Products (Controlling)
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,

  // Users (Controlling)
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
} = apiSlice;
