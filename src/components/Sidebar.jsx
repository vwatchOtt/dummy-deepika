// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   LayoutDashboard,
//   FileText,
//   CreditCard,
//   Settings,
//   BarChart2,
//   ClipboardList,
//   DollarSign,
// } from "lucide-react";

// const menuItems = [
//   { name: "Dashboard", path: "/", icon: LayoutDashboard },
//   { name: "Study Management", path: "/study-management", icon: ClipboardList },
//   { name: "Invoices", path: "/invoices", icon: FileText },
//   { name: "Account Receivable", path: "/account-receivable", icon: CreditCard },
//   { name: "Sponser Payment", path: "/sponser-payment", icon: CreditCard },
//   { name: "Patient Management", path: "/patient-management", icon: DollarSign },
//   { name: "Reports", path: "/reports", icon: BarChart2 },
//   { name: "Settings", path: "/settings", icon: Settings },
// ];

// export default function Sidebar({ isSidebarOpen, setIsSidebarOpen, setPageTitle }) {
//   const location = useLocation();

//   return (
//     <>
//       <div
//         className={`fixed md:static top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 shadow-sm transform transition-transform duration-300 z-40
//         ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 flex flex-col`}
//       >
//         {/* Logo */}
//         <div className="flex items-center space-x-2 px-4 py-5 border-b border-gray-200">
//           <div className="bg-blue-600 text-white font-bold text-sm px-2 py-2 rounded-md">OC</div>
//           <h2 className="text-[16px] font-normal text-[#101828]">Oncology Consultants</h2>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
//           {menuItems.map(({ name, path, icon: Icon }) => (
//             <Link
//               key={name}
//               to={path}
//               onClick={() => {
//                 setPageTitle && setPageTitle(name);
//                 setIsSidebarOpen(false);
//               }}
//               className={`flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                 location.pathname === path
//                   ? "bg-blue-50 text-blue-700"
//                   : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
//               }`}
//             >
//               <Icon className="w-5 h-5" />
//               <span>{name}</span>
//             </Link>
//           ))}
//         </nav>
//       </div>

//       {/* Overlay for Mobile */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         ></div>
//       )}
//     </>
//   );
// }

// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   LayoutDashboard,
//   FileText,
//   CreditCard,
//   Settings,
//   BarChart2,
//   ClipboardList,
//   DollarSign,
//   Menu,
//   X
// } from "lucide-react";

// const menuItems = [
//   { name: "Dashboard", path: "/", icon: LayoutDashboard },
//   { name: "Study Management", path: "/study-management", icon: ClipboardList },
//   { name: "Invoices", path: "/invoices", icon: FileText },
//   { name: "Account Receivable", path: "/account-receivable", icon: CreditCard },
//   { name: "Sponser Payment", path: "/sponser-payment", icon: CreditCard },
//   { name: "Patient Management", path: "/patient-management", icon: DollarSign },
//   { name: "Reports", path: "/reports", icon: BarChart2 },
//   { name: "Settings", path: "/settings", icon: Settings },
// ];

// export default function Sidebar() {
//   const location = useLocation();
//   const [isOpen, setIsOpen] = useState(false); // ✅ sidebar toggle state

//   return (
//     <>
//       {/* 🔘 Menu Button (only visible on mobile) */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md shadow-md"
//       >
//         {isOpen ? <X size={22} /> : <Menu size={22} />}
//       </button>

//       {/* 🧱 Sidebar */}
//       <div
//         className={`fixed md:static top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 shadow-sm transform transition-transform duration-300 z-40
//         ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 flex flex-col`}
//       >
//         {/* Logo */}
//         <div className="flex items-center space-x-2 px-4 py-5 border-b border-gray-200">
//           <div className="bg-blue-600 text-white font-bold text-sm px-2 py-2 rounded-md">OC</div>
//           <h2 className="text-[16px] font-normal text-[#101828]">Oncology Consultants</h2>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
//           {menuItems.map(({ name, path, icon: Icon }) => (
//             <Link
//               key={name}
//               to={path}
//               onClick={() => setIsOpen(false)} // close sidebar when a link is clicked
//               className={`flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                 location.pathname === path
//                   ? "bg-blue-50 text-blue-700"
//                   : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
//               }`}
//             >
//               <Icon className="w-5 h-5" />
//               <span>{name}</span>
//             </Link>
//           ))}
//         </nav>
//       </div>

//       {/* 🕶️ Overlay for mobile */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
//           onClick={() => setIsOpen(false)} // close sidebar on outside click
//         ></div>
//       )}
//     </>
//   );
// }

import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

import {
  LayoutDashboard,
  FileText,
  CreditCard,
  Settings,
  BarChart2,
  ClipboardList,
  DollarSign,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Patient Management", path: "/patient", icon: DollarSign },
  { name: "Study Management", path: "/study-management", icon: ClipboardList },
   { name: "Sponser Payment", path: "/sponser-payment", icon: CreditCard },
     { name: "Account Receivable", path: "/account-receivable", icon: CreditCard },
  { name: "Invoices", path: "/invoices", icon: FileText },

 
  
  { name: "Reports", path: "/reports", icon: BarChart2 },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const location = useLocation();

  return (
    <>
      <div
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 shadow-sm transform transition-transform duration-300 z-40
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 flex flex-col`}
      >
        {/* Logo */}
        {/* Logo */}
        <div className="flex items-center px-4 h-[73px] border-b border-gray-200">
          <img
            src={logo}
            alt="Company Logo"
            className="w-[112px] object-contain"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map(({ name, path, icon: Icon }) => (
            <Link
              key={name}
              to={path}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                location.pathname === path
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}
