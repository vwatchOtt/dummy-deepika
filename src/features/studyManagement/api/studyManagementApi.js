import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studyManagementApi = createApi({
  reducerPath: "studyManagementApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://oncology-api.itrtechsystems.com/api",

    prepareHeaders: (headers) => {
      const token =
        sessionStorage.getItem("accessToken") ||
        localStorage.getItem("accessToken");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },

  }),

  tagTypes: ["Studies"],

  endpoints: (builder) => ({

    // GET ALL STUDIES
    getStudies: builder.query({
      query: ({ page = 0, limit = 10, search }) => {
        const params = { page, limit };
        if (search) {
          params.search = search;
        }
        return {
          url: '/studies',
          params,
        };
      },
      providesTags: ["Studies"],
    }),

    // CREATE STUDY
    addStudy: builder.mutation({
      query: (body) => ({
        url: "/studies",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Studies"],
    }),

    // UPDATE STUDY
    updateStudy: builder.mutation({
      query: ({ id, body }) => ({
        url: `/studies/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Studies"],
    }),

    // DELETE STUDY
    deleteStudy: builder.mutation({
      query: (id) => ({
        url: `/studies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Studies"],
    }),

    // DELETE MANY STUDIES
    deleteManyStudies: builder.mutation({
      query: (body) => ({
        url: "/studies/deleteMany",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Studies"],
    }),

  }),
});

export const {
  useGetStudiesQuery,
  useAddStudyMutation,
  useUpdateStudyMutation,
  useDeleteStudyMutation,
  useDeleteManyStudiesMutation,
} = studyManagementApi;
