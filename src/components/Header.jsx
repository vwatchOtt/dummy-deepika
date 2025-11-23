// import React, { useState, useEffect, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { User, Menu, LogOut } from "lucide-react";

// export default function Header({ setIsSidebarOpen, isSidebarOpen }) {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dropdownRef = useRef(null);

//   const [openProfile, setOpenProfile] = useState(false);

//   const titles = {
//     "/": "Dashboard",
//     "/study-management": "Study Management",
//     "/invoices": "Invoices",
//     "/account-receivable": "Account Receivable",
//     "/reports": "Reports",
//     "/settings": "Settings",
//   };

//   const pageTitle = titles[location.pathname] || "Dashboard";

//   // ✅ LOGOUT
//   const handleLogout = () => {
//     localStorage.clear();
//     sessionStorage.clear();
//     navigate("/login");
//   };

//   // ✅ Close dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpenProfile(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <>
//       {/* ================= MOBILE HEADER ================= */}
//       <div className="md:hidden  flex justify-between items-center bg-white border-b px-4 py-3 shadow-sm relative">
//         <button
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           className="p-2 rounded-md hover:bg-gray-100"
//         >
//           <Menu className="w-6 h-6 text-gray-700" />
//         </button>

//         <h2 className="text-lg font-semibold text-gray-800">Oncology Consult</h2>

//         <button
//           onClick={() => setOpenProfile(!openProfile)}
//           className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
//         >
//           <User className="w-5 h-5 text-teal-600" />
//         </button>

//         {/* Dropdown */}
//         {openProfile && (
//           <div
//             ref={dropdownRef}
//             className="absolute right-4 top-16 w-64 bg-white rounded-2xl shadow-xl border p-4 z-50"
//           >
//             <div className="flex items-center gap-3">
//               <img
//                 src="https://randomuser.me/api/portraits/men/75.jpg"
//                 className="w-14 h-14 rounded-full"
//                 alt="profile"
//               />
//               <div>
//                 <p className="text-gray-800 font-semibold text-sm">Andrew John</p>
//                 <p className="text-gray-500 text-xs">andrew12w@gmail.com</p>
//               </div>
//             </div>

//             <div className="my-3 border-t"></div>

//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center gap-3 px-2 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
//             >
//               <LogOut className="w-5 h-5" />
//               <span>Sign Out</span>
//             </button>
//           </div>
//         )}
//       </div>

//       {/* ================= DESKTOP HEADER ================= */}
//       <header className="hidden md:flex bg-white border-b px-6 py-3 justify-between items-center">
//         <div>
//           <h1 className="text-xl font-semibold text-gray-800">{pageTitle}</h1>
//           <p className="text-sm text-gray-500">Manage your oncology clinic’s</p>
//         </div>

//         <div className="relative">
//           <button
//             onClick={() => setOpenProfile(!openProfile)}
//             className="p-2 rounded-full bg-gray-100 hover:bg-teal-100"
//           >
//             <User className="w-6 h-6 text-teal-600" />
//           </button>

//           {openProfile && (
//             <div
//               ref={dropdownRef}
//               className="absolute right-0 top-12 w-72 bg-white rounded-2xl shadow-xl border p-4 z-50"
//             >
//               <div className="flex items-center gap-3">
//                 <img
//                   src="https://randomuser.me/api/portraits/men/75.jpg"
//                   className="w-14 h-14 rounded-full"
//                   alt="profile"
//                 />
//                 <div>
//                   <p className="text-gray-800 font-semibold">Andrew John</p>
//                   <p className="text-gray-500 text-sm">andrew12w@gmail.com</p>
//                 </div>
//               </div>

//               <div className="my-3 border-t"></div>

//               <button
//                 onClick={handleLogout}
//                 className="w-full flex items-center gap-3 px-2 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
//               >
//                 <LogOut className="w-5 h-5" />
//                 <span>Sign Out</span>
//               </button>
//             </div>
//           )}
//         </div>
//       </header>
//     </>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User, Menu, LogOut } from "lucide-react";

export default function Header({ setIsSidebarOpen, isSidebarOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [openProfile, setOpenProfile] = useState(false);

  const titles = {
    "/": "Dashboard",
    "/study-management": "Study Management",
    "/invoices": "Invoices",
    "/account-receivable": "Account Receivable",
    "/reports": "Reports",
    "/settings": "Settings",
  };

  const pageTitle = titles[location.pathname] || "Dashboard";

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* ✅ MOBILE HEADER (fixed) */}
      <div className="md:hidden flex justify-between items-center bg-white border-b px-4 py-3 shadow-sm fixed top-0 left-0 right-0 z-50">
        
        {/* Hamburger from header only */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        <h2 className="text-lg font-semibold text-gray-800">Oncology Consult</h2>

        <button
          onClick={() => setOpenProfile(!openProfile)}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <User className="w-5 h-5 text-teal-600" />
        </button>

        {/* Dropdown */}
        {openProfile && (
          <div
            ref={dropdownRef}
            className="absolute right-4 top-16 w-64 bg-white rounded-2xl shadow-xl border p-4 z-50"
          >
            <div className="flex items-center gap-3">
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                className="w-14 h-14 rounded-full"
                alt="profile"
              />
              <div>
                <p className="text-gray-800 font-semibold text-sm">Andrew John</p>
                <p className="text-gray-500 text-xs">andrew12w@gmail.com</p>
              </div>
            </div>

            <div className="my-3 border-t"></div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-2 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>

      {/* ✅ DESKTOP HEADER */}
      <header className="hidden md:flex bg-white border-b px-6 py-3 justify-between items-center sticky top-0 z-40">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">{pageTitle}</h1>
          <p className="text-sm text-gray-500">Manage your oncology clinic’s</p>
        </div>

        <div className="relative">
          <button
            onClick={() => setOpenProfile(!openProfile)}
            className="p-2 rounded-full bg-gray-100 hover:bg-teal-100"
          >
            <User className="w-6 h-6 text-teal-600" />
          </button>

          {openProfile && (
            <div
              ref={dropdownRef}
              className="absolute right-0 top-12 w-72 bg-white rounded-2xl shadow-xl border p-4 z-50"
            >
              <div className="flex items-center gap-3">
                <img
                  src="https://randomuser.me/api/portraits/men/75.jpg"
                  className="w-14 h-14 rounded-full"
                  alt="profile"
                />
                <div>
                  <p className="text-gray-800 font-semibold">Andrew John</p>
                  <p className="text-gray-500 text-sm">andrew12w@gmail.com</p>
                </div>
              </div>

              <div className="my-3 border-t"></div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-2 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
