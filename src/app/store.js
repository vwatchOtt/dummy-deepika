import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/api/authApi";
import authReducer from "../features/auth/slices/authSlice";
import { patientApi } from "../features/patient/api/patientApi";
import { studyManagementApi } from "../features/studyManagement/api/studyManagementApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer,
    [studyManagementApi.reducerPath]: studyManagementApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, patientApi.middleware, studyManagementApi.middleware),
 
});
