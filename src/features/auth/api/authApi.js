import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { showSuccess, showError } from "../../../utils/toast";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://oncology-api.itrtechsystems.com", // 🔁 replace with your base URL
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      }),
      // async onQueryStarted(_, { queryFulfilled }) {
      //   try {
      //     await queryFulfilled;
      //     showSuccess("Login successful!");
      //   } catch (error) {
      //     showError(error?.error?.data?.message || "Login failed!");
      //   }
      // },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // 🔥 TOKEN YAHI SAVE KARO
          localStorage.setItem("accessToken", data.token);

          showSuccess("Login successful!");
        } catch (error) {
          showError(error?.error?.data?.message || "Login failed!");
        }
      },
    }),

    // forgotPassword: builder.mutation({
    //   query: (data) => ({
    //     url: "/auth/forgot-password",
    //     method: "POST",
    //     body: data,
    //   }),
    //   async onQueryStarted(_, { queryFulfilled }) {
    //     try {
    //       await queryFulfilled;
    //       showSuccess("Password reset link sent!");
    //     } catch (error) {
    //       showError("Failed to send reset link!");
    //     }
    //   },
    // }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/api/auth/forgot-password",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          showSuccess("Password reset link sent!");
        } catch (error) {
          showError(error?.error?.data?.message || "Failed to send reset link!");
        }
      },
    }),




    // verifyOtp mutation
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/api/auth/verify-otp",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          showSuccess("OTP verified!");
        } catch (error) {
          showError(error?.error?.data?.message || "Invalid OTP!");
        }
      },
    }),


    // resend OTP mutation
    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/api/auth/resend-otp",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          showSuccess("OTP sent again!");
        } catch (error) {
          showError(error?.error?.data?.message || "Failed to resend OTP.");
        }
      },
    }),






    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/api/auth/reset-password",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          showSuccess("Password reset successfully! ✅");
        } catch (error) {
          showError(error?.error?.data?.message || "Password reset failed!");
        }
      },
    }),


  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,

} = authApi;

