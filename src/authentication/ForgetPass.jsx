import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/loginImg.jpg";
import logoAuth from "../assets/logoAuth.png";
import { useForgotPasswordMutation } from "../features/auth/api/authApi";

const ForgetPass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [apiError, setApiError] = useState("");

  // ✅ RTK QUERY HOOK
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!email) {
      setApiError("Please enter your email.");
      return;
    }

    try {
      await forgotPassword({ email }).unwrap();

      // ✅ Redirect to OTP verification page
      navigate("/send-otp", { state: { email } });
    } catch (error) {
      setApiError(error?.data?.message || "Failed to send reset link.");
    }
  };

  return (
    <div className="min-h-screen h-[650px] flex items-center justify-center bg-gray-100 px-4">
      {/* ✅ flex-col-reverse for mobile, md:flex-row for desktop */}
      <div className="w-[1077px] bg-white rounded-[9px] shadow-md overflow-hidden flex flex-col-reverse md:flex-row">
        
        {/* Left Section (Form) */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="flex flex-col items-center mb-6">
            <img
              src={logoAuth}
              alt="Company Logo"
              className="w-[112px] object-contain"
            />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Forgot Password
          </h2>

          <p className="text-[#9197B3] mb-8">
            Enter your registered email to reset your password
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {apiError && (
              <div className="bg-red-100 text-red-700 px-3 py-2 rounded-md text-sm">
                {apiError}
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Enter Your Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full font-semibold py-2 rounded-md text-white transition duration-200 ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Processing..." : "Verify Email"}
            </button>
          </form>
        </div>

        {/* Right Section (Image) */}
        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img
            src={loginImg}
            alt="Doctor and patient"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
