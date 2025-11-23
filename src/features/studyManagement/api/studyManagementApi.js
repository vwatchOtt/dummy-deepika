
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// export const studyManagementApi = createApi({
//   reducerPath: "studyManagementApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://oncology-api.itrtechsystems.com/api",
//     prepareHeaders: (headers, { getState }) => {
//       const token = getState().auth?.token || localStorage.getItem("accessToken");
//       if (token) headers.set("Authorization", `Bearer ${token}`);
//       return headers;
//     },
//   }),

//   tagTypes: ["Patients", "Files"],

//   endpoints: (builder) => ({

//     // -------------------------
//     // GET PATIENTS (MAIN QUERY)
//     // -------------------------
//     getStudies: builder.query({
//       query: ({ page = 1, limit = 10 } = {}) =>
//         `/studies?page=${page}&limit=${limit}`,
//       providesTags: ["Patients"],
//     }),

//     // -------------------------
//     // CREATE PATIENT
//     // -------------------------
//     addStudy: builder.mutation({
//       query: (body) => ({
//         url: "/patients",
//         method: "POST",
//         body,
//       }),
//       invalidatesTags: ["Patients"],
//     }),

//     // -------------------------
//     // FILE UPLOAD
//     // -------------------------
//     uploadDocuments: builder.mutation({
//       query: (formData) => ({
//         url: "/admin/file/upload",
//         method: "POST",
//         body: formData,
//       }),
//       invalidatesTags: ["Files"],
//     }),

//     // -------------------------
//     // GET UPLOADED FILES
//     // -------------------------
//     getUploadedDocuments: builder.query({
//       query: (tempSessionId) => `/admin/file?tempSessionId=${tempSessionId}`,
//       providesTags: ["Files"],
//     }),

//     // -------------------------
//     // DELETE DOCUMENT
//     // -------------------------
//     deleteStudy: builder.mutation({
//       query: (id) => ({
//         url: `/admin/file/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Files"],
//     }),

//     // OLD ROLE APIs — keep same
//     addStudies: builder.mutation({
//       query: (body) => ({
//         url: "/roles",
//         method: "POST",
//         body,
//       }),
//     }),



//     // DELETE PATIENT
//     // -------------------------
//     deletePatient: builder.mutation({
//       query: (ids) => ({
//         url: `/patients/deleteSelected`,
//         method: "DELETE",
//         body: {
//           "patientIds": ids.split(",")
//         },
//       }),
//       invalidatesTags: ["Patients"],
//     }),


//     getPatientById: builder.query({
//       query: (id) => `/roles/${id}`,
//     }),


//     //edit patient
//     updateStudy: builder.mutation({
//       query: ({ id, body }) => ({
//         url: `/patients/${id}`,
//         method: "PUT",
//         body,
//       }),
//       invalidatesTags: ["Patients", "Patient"],
//     }),


//   }),
// });

// // -------------------------
// // FINAL EXPORTS
// // -------------------------
// export const {
//   useGetStudiesQuery,
//   useAddStudyMutation,


// //   useGetPatientsQuery,
// //   useAddPatientMutation,
//   useUploadDocumentsMutation,
//   useGetUploadedDocumentsQuery,
// //   useDeleteDocumentMutation,
//   useGetPatientByIdQuery,
// //   useAddPatientsMutation,
// //   useUpdatePatientMutation,
//   useDeletePatientMutation,

//   //useUpdatePatinentsMutation,
// } = studyManagementApi;


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

  tagTypes: ["Studies"],   // FIXED

  endpoints: (builder) => ({

    // GET ALL STUDIES
    getStudies: builder.query({
      query: ({ page = 0, limit = 10 }) =>
        `/studies?page=${page}&limit=${limit}`,
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

  }),
});

export const {
  useGetStudiesQuery,
  useAddStudyMutation,
  useUpdateStudyMutation,
  useDeleteStudyMutation
} = studyManagementApi;
