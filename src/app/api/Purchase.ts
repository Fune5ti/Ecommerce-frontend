import { api } from "./api";
import { PurchaseResponse } from "./interfaces";

export const purchaseApi = api.injectEndpoints({
  endpoints: (build) => ({
    createPurchase: build.mutation<PurchaseResponse, any>({
      query: (body: any) => ({
        url: "purchase",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Purchase"],
    }),
  }),
});

export const { useCreatePurchaseMutation } = purchaseApi;
