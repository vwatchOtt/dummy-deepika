// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const patientApi = createApi({
//   reducerPath: "patientApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://oncology-api.itrtechsystems.com/api",
//     prepareHeaders: (headers, { getState }) => {
//       // const token = getState().auth?.token;
//       const token = getState().auth?.token || localStorage.getItem("accessToken");
//       if (token) headers.set("Authorization", `Bearer ${token}`);
//       return headers;
//     },
//   }),


//   tagTypes: ["Patients", "Files"],
//   endpoints: (builder) => ({
//     getPatients: builder.query({
//       query: ({ page = 1, limit = 10 } = {}) =>
//         `/patients?page=${page}&limit=${limit}`,
//       providesTags: ["Patients"],
//     }),


//     // Create patient
//     addPatient: builder.mutation({
//       query: (body) => ({
//         url: "/patients",
//         method: "POST",
//         body,
//       }),
//       invalidatesTags: ["Patients"],
//     }),

//      //  file upload
//   uploadDocuments: builder.mutation({
//     query: (formData) => ({
//       url: "/admin/file/upload",
//       method: "POST",
//       body: formData,
//     }),
//     invalidatesTags: ["Files"],
//   }),

//    // Get uploaded documents by tempSessionId
//     getUploadedDocuments: builder.query({
//       query: (tempSessionId) => `/admin/file?tempSessionId=${tempSessionId}`,
//       // providesTags: (result, error, arg) =>
//       //   result ? result.map((r) => ({ type: "Files", id: r.id })) : ["Files"],
//     providesTags: ["Files"],
//     }),

//      // Delete a document by id (optional)
//     deleteDocument: builder.mutation({
//       query: (id) => ({
//         url: `/admin/file/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Files"],
//     }),

//     // getRolesDashboard: builder.query({
//     //   query: () => "/roles/dashboard",
//     // }),
//     // ✅ POST API — add a new user
//     addPatients: builder.mutation({
//       query: (body) => ({
//         url: "/roles",
//         method: "POST",
//         body,
//       }),
//     }),

//     // ✅ PUT API — update user

//     // ✅ DELETE API — delete user
//     deletePatients: builder.mutation({
//       query: (id) => ({
//         url: `/roles/${id}`,
//         method: "DELETE",
//       }),
//     }),

//     getPatientById: builder.query({
//       query: (id) => `/roles/${id}`,
//     }),

//     // ⭐ Update user (PUT or PATCH)
//     updatePatinents: builder.mutation({
//       query: ({ id, body }) => ({
//         url: `/roles/${id}`,
//         method: "PUT", // or PATCH
//         body,
//       }),
//       invalidatesTags: ["Patients ", "Patient"],
//     }),
//   }),

// });



// export const {

//   useAddPatientMutation,
//   useGetPatientByIdQuery,
//   useAddPatientsMutation,
//   useUpdatePatinentsMutation,
//   useDeletePatientsMutation,
//    useUploadDocumentsMutation,
//    useGetUploadedDocumentsQuery,
//    useDeleteDocumentMutation,

// } = patientApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const patientApi = createApi({
  reducerPath: "patientApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://oncology-api.itrtechsystems.com/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token || localStorage.getItem("accessToken");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  tagTypes: ["Patients", "Files"],

  endpoints: (builder) => ({

    // -------------------------
    // GET PATIENTS (MAIN QUERY)
    // -------------------------
    getPatients: builder.query({
      query: ({ page = 1, limit = 10 } = {}) =>
        `/patients?page=${page}&limit=${limit}`,
      providesTags: ["Patients"],
    }),

    // -------------------------
    // CREATE PATIENT
    // -------------------------
    addPatient: builder.mutation({
      query: (body) => ({
        url: "/patients",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Patients"],
    }),

    // -------------------------
    // FILE UPLOAD
    // -------------------------
    uploadDocuments: builder.mutation({
      query: (formData) => ({
        url: "/admin/file/upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Files"],
    }),

    // -------------------------
    // GET UPLOADED FILES
    // -------------------------
    getUploadedDocuments: builder.query({
      query: (tempSessionId) => `/admin/file?tempSessionId=${tempSessionId}`,
      providesTags: ["Files"],
    }),

    // -------------------------
    // DELETE DOCUMENT
    // -------------------------
    deleteDocument: builder.mutation({
      query: (id) => ({
        url: `/admin/file/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Files"],
    }),

    // OLD ROLE APIs — keep same
    addPatients: builder.mutation({
      query: (body) => ({
        url: "/roles",
        method: "POST",
        body,
      }),
    }),

    // deletePatients: builder.mutation({
    //   query: (id) => ({
    //     url: `/roles/${id}`,
    //     method: "DELETE",
    //   }),
    // }),
    // -------------------------


    // DELETE PATIENT
    // -------------------------
    deletePatient: builder.mutation({
      query: (ids) => ({
        url: `/patients/deleteSelected`,
        method: "DELETE",
        body: {
          "patientIds": ids.split(",")
        },
      }),
      invalidatesTags: ["Patients"],
    }),


    getPatientById: builder.query({
      query: (id) => `/roles/${id}`,
    }),


    //edit patient
    updatePatient: builder.mutation({
      query: ({ id, body }) => ({
        url: `/patients/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Patients", "Patient"],
    }),


  }),
});

// -------------------------
// FINAL EXPORTS
// -------------------------
export const {
  useGetPatientsQuery,
  useAddPatientMutation,
  useUploadDocumentsMutation,
  useGetUploadedDocumentsQuery,
  useDeleteDocumentMutation,
  useGetPatientByIdQuery,
  useAddPatientsMutation,
  useUpdatePatientMutation,
  useDeletePatientMutation,

  //useUpdatePatinentsMutation,
} = patientApi;
