
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Eye, EyeOff } from "lucide-react";
// import loginImg from "../assets/loginImg.jpg";

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [remember, setRemember] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [apiError, setApiError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setApiError("");
//     setLoading(true);

//     if (!email || !password) {
//       setApiError("Please enter both email and password.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       console.log("API Response:", data);

//       if (res.ok && data?.token) {
//         localStorage.setItem("authToken", data.token);
//         navigate("/dashboard"); // ✅ successful redirect
//       } else {
//         setApiError(data.message || "Invalid credentials. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setApiError("Something went wrong. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen h-[650px] flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-[1077px] bg-white rounded-[9px] shadow-md overflow-hidden flex flex-col md:flex-row">
        
//         {/* Left Section */}
//         <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
//           <div className="flex flex-col items-center mb-6">
//             <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-semibold">
//               OC
//             </div>
//             <h2 className="mt-4 text-gray-800 font-semibold text-lg">
//               Oncology Consultants
//             </h2>
//           </div>

//           <h2 className="text-2xl font-bold text-gray-900 mb-2">Login</h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {apiError && (
//               <div className="bg-red-100 text-red-700 px-3 py-2 rounded-md text-sm">
//                 {apiError}
//               </div>
//             )}

//             {/* Email */}
//             <div>
//               <label className="text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 placeholder="Enter your email id"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//             </div>

//             {/* Password with Eye Icon */}
//             <div>
//               <label className="text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full border border-gray-300 rounded-md p-2 mt-1 pr-10 focus:ring-2 focus:ring-blue-500 outline-none"
//                 />

//                 {/* Eye Icon */}
//                 <span
//                   className="absolute right-3 top-4 cursor-pointer text-gray-600"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
//                 </span>
//               </div>
//             </div>

//             {/* Remember + Forgot */}
//             <div className="flex items-center justify-between text-sm">
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={remember}
//                   onChange={(e) => setRemember(e.target.checked)}
//                   className="mr-2"
//                 />
//                 Remember me
//               </label>

//               <button
//                 type="button"
//                 className="text-blue-600 hover:underline"
//                 onClick={() => alert("Redirect to password reset")}
//               >
//                 Forgot password?
//               </button>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full font-semibold py-2 rounded-md text-white transition duration-200 ${
//                 loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
//               }`}
//             >
//               {loading ? "Signing in..." : "Sign in"}
//             </button>
//           </form>
//         </div>

//         {/* Right Section Image */}
//         <div className="w-full md:w-1/2 h-64 md:h-auto">
//           <img
//             src={loginImg}
//             alt="Doctor and patient"
//             className="w-full h-full object-cover"
//           />
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Login;




import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import loginImg from "../assets/loginImg.jpg";
import { useAuth } from "../auth/AuthContext"; // adjust path if needed
import logoAuth from "../assets/logoAuth.png";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth(); // AuthContext should expose login({ email, token, remember })

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // If user was trying to access a protected route, redirect back there after successful login
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    if (!email || !password) {
      setApiError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // try to parse response safely
      const data = await res.json().catch(() => ({}));
      console.log("Login API response:", res.status, data);

      if (res.ok && data?.token) {
        const token = data.token;

        // persist token based on remember choice
        if (remember) {
          localStorage.setItem("authToken", token);
          localStorage.setItem("authEmail", email);
        } else {
          sessionStorage.setItem("authToken", token);
          sessionStorage.setItem("authEmail", email);
        }

        // update central auth state (AuthContext)
        // make sure your AuthContext.login handles the payload correctly
        login({ email, token, remember });

        // navigate to original target (or dashboard) and replace history
        navigate(from, { replace: true });
      } else {
        // handle error message from server or default message
        const message =
          (data && (data.message || data.error)) ||
          "Invalid credentials. Please try again.";
        setApiError(message);
      }
    } catch (err) {
      console.error("Login error:", err);
      setApiError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-[650px] flex items-center justify-center bg-gray-100 px-4">
      <div className="w-[1077px] bg-white rounded-[9px] shadow-md overflow-hidden flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="flex flex-col items-center mb-6">
            {/* <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-semibold">
              OC
            </div>
            <h2 className="mt-4 text-gray-800 font-semibold text-lg">
              Oncology Consultants
            </h2> */}
             <img
    src={logoAuth }
    alt="Company Logo"
    className="w-[112px] object-contain"
  />
          </div>




          <h2 className="text-2xl font-bold text-gray-900 mb-2">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="on">
            {apiError && (
              <div className="bg-red-100 text-red-700 px-3 py-2 rounded-md text-sm">
                {apiError}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            {/* Password with Eye Icon */}
            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              disabled={loading}
              className={`w-full font-semibold py-2 rounded-md text-white transition duration-200 ${
                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        {/* Right Section Image */}
        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img src={loginImg} alt="Doctor and patient" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Login;
