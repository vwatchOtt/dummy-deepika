import React, { useState } from "react";
import { useLoginMutation } from "../api/authApi";
import logoAuth from "../../../assets/logoAuth.png";
import loginImg from "../../../assets/loginImg.jpg";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { setCredentials } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import { showError, showSuccess } from "../../../utils/toast";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await await login(formData).unwrap();
      dispatch(setCredentials({ token: userData.token, user: userData.name }));
      navigate("/dashboard");
    } catch (err) {
      showError("Login failed!");
    }
  };

  return (
    <div className="min-h-screen h-[650px] flex items-center justify-center bg-gray-100 px-4">
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

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="on">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email id"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            {/* Password with Eye Icon */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md p-2 mt-1 pr-10 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />

                {/* Eye Icon */}
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-3 text-gray-600"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="mr-2"
                />
                Remember me
              </label>

              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => navigate("/forgetpassword")}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full font-semibold py-2 rounded-md text-white transition duration-200 ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        {/* Right Section Image */}
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

export default LoginForm;
