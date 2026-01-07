import { LoginInputs } from "../lib/schemas"
import { BaseResponse } from "@/common/types"
import { baseApi } from "@/app/baseApi.ts"

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    me: build.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
      query: () => "auth/me",
      providesTags: ["Auth"],
    }),
    login: build.mutation<BaseResponse<{ userId: number; token: string }>, LoginInputs>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      onQueryStarted: (_args, { dispatch }) => {
        dispatch(baseApi.util.invalidateTags(["Auth"]))
      },
    }),
    logout: build.mutation<BaseResponse, void>({
      query: () => ({
        url: "auth/login",
        method: "DELETE",
      }),
    }),
    security: build.query<{ url: string }, void>({
      query: () => "security/get-captcha-url",
    }),
  }),
})

export const { useMeQuery, useLoginMutation, useLogoutMutation, useLazySecurityQuery } = authApi
