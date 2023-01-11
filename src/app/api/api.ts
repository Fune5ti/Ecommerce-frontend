import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import type { FetchBaseQueryMeta } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = fetchBaseQuery({
  baseUrl: BACKEND_URL,
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });
export const api = createApi({
  reducerPath: "appApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Product", "Purchase"],
  endpoints: () => ({}),
});

export const enhancedApi = api.enhanceEndpoints({
  endpoints: () => ({}),
});
