import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import loginImg from "../assets/loginImg.jpg";
import logoAuth from "../assets/logoAuth.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../features/auth/api/authApi";

// ✅ Password validation
const validatePassword = (password) => {
  const minLength = /.{8,}/;
  const hasNumber = /[0-9]/;
  const hasLower = /[a-z]/;
  const hasUpper = /[A-Z]/;

  if (!minLength.test(password))
    return "Password must be at least 8 characters long.";

  if (!hasNumber.test(password))
    return "Password must contain at least one number.";

  if (!hasLower.test(password))
    return "Password must contain at least one lowercase letter.";

  if (!hasUpper.test(password))
    return "Password must contain at least one uppercase letter.";

  return null;
};

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [apiError, setApiError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const token = location.state?.token; // ✅ backend required token
console.log('check token',token);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    const validationError = validatePassword(password);
    if (validationError) {
      setApiError(validationError);
      return;
    }

    if (password !== confirmPassword) {
      setApiError("Passwords do not match.");
      return;
    }

    try {
      console.log('new token:', token);
      
    await resetPassword({
  token: token,
  newPassword: password,
}).unwrap();

      navigate("/resetpasswordsuccess"); // ✅ success → login
    } catch (error) {
      setApiError(error?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6 md:py-10">
      <div className="w-full max-w-[1077px] h-auto md:h-[520px] bg-white rounded-[12px] shadow-md overflow-hidden flex flex-col-reverse md:flex-row">
        
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <img src={logoAuth} alt="Company Logo" className="w-[112px] object-contain" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 text-center md:text-left">
            Reset Password
          </h1>

          <p className="text-[#9197B3] mb-6 sm:mb-8 text-center md:text-left">
            Enter your new password to complete the reset process.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {apiError && (
              <div className="bg-red-100 text-red-700 px-3 py-2 rounded-md text-sm text-center md:text-left">
                {apiError}
              </div>
            )}

            {/* Password */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-700"> New Password</label>
              <input
                type={showPass ? "text" : "password"}
                placeholder="***********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 mt-1 pr-10 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type={showConfirmPass ? "text" : "password"}
                placeholder="***********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 mt-1 pr-10 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer mt-[12px]"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
              >
                {showConfirmPass ? <Eye size={20} /> : <EyeOff size={20} />}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-sm"
            >
              {isLoading ? "Processing..." : "Save New Password"}
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/2 h-52 sm:h-60 md:h-auto">
          <img src={loginImg} alt="Doctor" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
