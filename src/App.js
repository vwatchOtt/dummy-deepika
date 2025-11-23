// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";

// import Dashboard from "./components/Dashboard/Dashboard";
// import StudyManagement from "./components/StudyManagement/StudyManagement";
// import Invoices from "./components/Invoices/Invoices";
// import AccountReceivable from "./components/AccountReceivable/AccountReceivable";
// // import PaymentEntry from "./components/PaymentEntry/PaymentEntry";
// import Reports from "./components/Reports/Reports";
// import Settings from "./components/Settings/Settings";
// import Login from "./authentication/Login";

// export default function App() {
//   const [pageTitle, setPageTitle] = useState("Dashboard");

//   return (
//     <Router>
//       <div className="flex min-h-screen bg-[#F7F9FC]">
//         <Sidebar setPageTitle={setPageTitle} />
//         <div className="flex-1 flex flex-col">
//           <Header pageTitle={pageTitle} />
//           <main className="p-6 flex-1 overflow-auto">
//             <Routes>
//               <Route path="/" element={<Login />} />
//               <Route path="/dashboard" element={<Dashboard />} />

//               <Route path="/login" element={<Login />} />
//               <Route path="/study-management" element={<StudyManagement />} />
//               <Route path="/invoices" element={<Invoices />} />
//               <Route path="/account-receivable" element={<AccountReceivable />} />
//               {/* <Route path="/payment-entry" element={<PaymentEntry />} /> */}
//               <Route path="/reports" element={<Reports />} />
//               <Route path="/settings" element={<Settings />} />
//             </Routes>
//           </main>
//         </div>
//       </div>
//     </Router>
//   );
// }

// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";

// import Dashboard from "./components/Dashboard/Dashboard";
// import StudyManagement from "./components/StudyManagement/StudyManagement";
// import Invoices from "./components/Invoices/Invoices";
// import AccountReceivable from "./components/AccountReceivable/AccountReceivable";
// import Reports from "./components/Reports/Reports";
// import Settings from "./components/Settings/Settings";
// import Login from "./authentication/Login";
// import SponserPayment from "./components/SponserPayment/SponserPayment";
// import PatientManagment from "./components/PatientManagment/PatientManagment";
// import ForgetPass from "./authentication/ForgetPass";
// import ResetPass from "./authentication/ResetPass";
// import ResetPassSucc from "./authentication/ResetPassSucc";
// import SendOTP from "./authentication/SendOTP";

// import Error from "./authentication/Error";
// /* ✅ LAYOUT WRAPPER FOR AUTHENTICATED PAGES */

// function Layout({ children, pageTitle, setPageTitle }) {
//   return (
//     <div className="flex min-h-screen bg-[#F7F9FC]">
//       <Sidebar setPageTitle={setPageTitle} />
//       <div className="flex-1 flex flex-col">
//         <Header pageTitle={pageTitle} />
//         <main className="p-6 flex-1 overflow-auto">{children}</main>
//       </div>
//     </div>
//   );
// }
// export default function App() {
//   const [pageTitle, setPageTitle] = useState("Dashboard");

//   return (
//     // <Router>
//       <Routes>
//         {/* ✅ PUBLIC ROUTES (NO SIDEBAR NO HEADER) */}
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />
// <Route path="/forgetpassword" element={<ForgetPass />} />
// <Route path="/resetpassword" element={<ResetPass  />} />
// <Route path="/resetpasswordsuccess" element={<ResetPassSucc  />} />
// <Route path="/sendotp" element={<SendOTP  />} />
// <Route path="/404error" element={<Error  />} />

//         {/* ✅ PRIVATE ROUTES (WITH SIDEBAR + HEADER) */}
//         {/* <Route
//           path="/dashboard"
//           element={
//             <Layout pageTitle={pageTitle} setPageTitle={setPageTitle}>
//               <Dashboard />
//             </Layout>
//           }
//         /> */}

//         <Route path="/dashboard" element={<Dashboard />} />

//         <Route
//           path="/study-management"
//           element={
//             <Layout pageTitle={pageTitle} setPageTitle={setPageTitle}>
//               <StudyManagement />
//             </Layout>
//           }
//         />

//   <Route
//           path="/sponser-payment"
//           element={
//             <Layout pageTitle={pageTitle} setPageTitle={setPageTitle}>
//               <SponserPayment />
//             </Layout>
//           }
//         />

// <Route
//           path="/patient-managment"
//           element={
//             <Layout pageTitle={pageTitle} setPageTitle={setPageTitle}>
//               <PatientManagment />
//             </Layout>
//           }
//         />

//         <Route
//           path="/invoices"
//           element={
//             <Layout pageTitle={pageTitle} setPageTitle={setPageTitle}>
//               <Invoices />
//             </Layout>
//           }
//         />

//         <Route
//           path="/account-receivable"
//           element={
//             <Layout pageTitle={pageTitle} setPageTitle={setPageTitle}>
//               <AccountReceivable />
//             </Layout>
//           }
//         />

//         <Route
//           path="/reports"
//           element={
//             <Layout pageTitle={pageTitle} setPageTitle={setPageTitle}>
//               <Reports />
//             </Layout>
//           }
//         />

//         <Route
//           path="/settings"
//           element={
//             <Layout pageTitle={pageTitle} setPageTitle={setPageTitle}>
//               <Settings />
//             </Layout>
//           }
//         />
//       </Routes>
//     // </Router>
//   );
// }

// /* ✅ LAYOUT WRAPPER FOR AUTHENTICATED PAGES */

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./components/Dashboard/Dashboard";
import StudyManagement from "./components/StudyManagement/StudyManagement";
import Invoices from "./components/Invoices/Invoices";
import AccountReceivable from "./components/AccountReceivable/AccountReceivable";
import Reports from "./components/Reports/Reports";
import Settings from "./components/Settings/Settings";
import Login from "./authentication/Login";
import SponserPayment from "./components/SponserPayment/SponserPayment";
import PatientManagment from "./components/PatientManagment/PatientManagment";
import ForgetPass from "./authentication/ForgetPass";
import ResetPass from "./authentication/ResetPass";
import ResetPassSucc from "./authentication/ResetPassSucc";
import SendOTP from "./authentication/SendOTP";
import ProtectedRoute from "./auth/ProtectedRoute";
import Error from "./authentication/Error";
import LoginForm from "./features/auth/components/LoginForm";
import NotFound from "./components/NotFound";

/* ✅ LAYOUT WRAPPER FOR AUTHENTICATED PAGES */
function Layout({ children, pageTitle, setPageTitle }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F7F9FC]">
      {/* ✅ Sidebar with props */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col">
        {/* ✅ Header with props */}
        <Header
          pageTitle={pageTitle}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* ✅ mobile header is fixed so add padding */}
        <main className="p-6 flex-1 overflow-auto pt-16 md:pt-0">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [pageTitle, setPageTitle] = useState("Dashboard");

  return (
    <Routes>
      {/* ✅ PUBLIC ROUTES */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/forgetpassword" element={<ForgetPass />} />
      <Route path="/reset-password" element={<ResetPass />} />
      <Route path="/resetpasswordsuccess" element={<ResetPassSucc />} />
      <Route path="/send-otp" element={<SendOTP />} />
      <Route path="/404error" element={<Error />} />

      {/* ✅ PRIVATE ROUTES — all wrapped in Layout */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout pageTitle={pageTitle} setPageTitle={setPageTitle}>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/study-management"
        element={
          <ProtectedRoute>
            <Layout pageTitle={pageTitle} setPageTitle={setPageTitle}>
              <StudyManagement />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/sponser-payment"
        element={
          <ProtectedRoute>
            <Layout pageTitle={pageTitle} setPageTitle={setPageTitle}>
              <SponserPayment />
            </Layout>
          </ProtectedRoute>
        }
      />

    <Route
        path="/patient"
        element={
          <ProtectedRoute>
            <Layout pageTitle={pageTitle} setPageTitle={setPageTitle}>
              <PatientManagment />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/invoices"
        element={
          <ProtectedRoute>
            <Layout pageTitle={pageTitle} setPageTitle={setPageTitle}>
              <PatientManagment />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/account-receivable"
        element={
          <ProtectedRoute>
            <Layout pageTitle={pageTitle} setPageTitle={setPageTitle}>
              <AccountReceivable />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Layout pageTitle={pageTitle} setPageTitle={setPageTitle}>
              <Reports />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Layout pageTitle={pageTitle} setPageTitle={setPageTitle}>
              <Settings />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
