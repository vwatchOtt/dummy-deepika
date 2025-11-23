import React from "react";
import loginImg from "../assets/loginImg.jpg";
// import { Check } from "lucide-react";
import logoAuth from "../assets/logoAuth.png";
export default function ResetSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6 md:py-10">
      <div className="w-full max-w-[1077px] h-auto md:h-[520px] bg-white rounded-[12px] shadow-md overflow-hidden flex flex-col-reverse md:flex-row">

        {/* ✅ Left Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center items-center text-center">

          {/* Logo */}
          <div className="flex flex-col items-center mb-6 sm:mb-10">
             <img
    src={logoAuth }
    alt="Company Logo"
    className="w-[112px] object-contain"
  />
            {/* <div className="bg-blue-600 text-white rounded-xl w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-sm sm:text-lg font-semibold shadow-sm">
              OC
            </div>

            <h2 className="mt-4 text-gray-900 font-bold text-lg sm:text-xl tracking-wide">
              Oncology Consultants
            </h2> */}
          </div>

          {/* Success Icon */}
          {/* Success Icon */}
<div className="mb-6 sm:mb-8 flex items-center justify-center">
  <img
    src={require("../assets/successful.png")}
    alt="Success"
    className="w-28 h-28 sm:w-32 sm:h-32 object-contain"
  />
</div>


          {/* Title */}
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Reset Password Successfully
          </h1>

          {/* Subtitle */}
          <p className="text-[#9197B3] mb-6 sm:mb-8 text-sm sm:text-base max-w-xs leading-relaxed">
            Your password has been reset successfully.
            <br />
            You can now log in using your new password.
          </p>

          {/* Button */}
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 rounded-lg shadow-sm text-sm sm:text-base transition"
            onClick={() => window.location.href = "/login"}
          >
            Back to Login
          </button>
        </div>

        {/* ✅ Right Section – Image */}
        <div className="w-full md:w-1/2 h-auto md:h-full">
          <img
            src={loginImg}
            alt="Doctor and patient"
            className="w-full h-auto md:h-full object-contain md:object-cover"
          />
        </div>

      </div>
    </div>
  );
}
