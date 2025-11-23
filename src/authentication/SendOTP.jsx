import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import loginImg from "../assets/loginImg.jpg";
import logoAuth from "../assets/logoAuth.png";
import { useVerifyOtpMutation, useResendOtpMutation } from "../features/auth/api/authApi";

export default function SendOtp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: resendLoading }] = useResendOtpMutation();

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const next = [...otp];
      next[index] = value;
      setOtp(next);
      if (value && index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

 const handleOtpSubmit = async () => {
  const code = otp.join("");

  if (code.length !== 6) {
    alert("Please enter all 6 digits.");
    return;
  }

//   try {
//     const response = await verifyOtp({ email, otp: code }).unwrap();

//     const token = response?.token;   // ✅ get token from backend

//     navigate("/reset-password", { state: { token } });  // ✅ send token forward
//   } catch (error) {
//     alert(error?.data?.message || "Invalid OTP");
//   }
// };


try {
  const response = await verifyOtp({ email, otp: code }).unwrap();

  console.log("OTP API RESPONSE:", response);   // ✅ CHECK HERE
  
  const token = response?.token;
  console.log("EXTRACTED TOKEN:", token);       // ✅ CHECK HERE

  navigate("/reset-password", { state: { token } });

} catch (error) {
  alert(error?.data?.message || "Invalid OTP");
}
 };
 
  const handleResendOtp = async () => {
    try {
      await resendOtp({ email }).unwrap();
    } catch (error) {
      alert(error?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8 md:py-12">
      <div className="w-full max-w-[950px] bg-white rounded-[12px] shadow-md overflow-hidden flex flex-col-reverse md:flex-row">
        
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:py-10 flex flex-col justify-center">
          <div className="flex flex-col items-center mb-8 md:mb-10">
            <img src={logoAuth} alt="Company Logo" className="w-[112px] object-contain" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center md:text-left">
            Enter OTP
          </h1>
          <p className="text-[#9197B3] mb-6 sm:mb-8 text-center md:text-left">
            Please enter the 6-digit OTP sent to {email}.
          </p>

          <div className="flex gap-2 sm:gap-4 mb-6 justify-center md:justify-start flex-wrap">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                maxLength={1}
                inputMode="numeric"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-10 h-12 sm:w-12 sm:h-14 border border-gray-300 rounded-lg text-center text-xl font-semibold focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
              />
            ))}
          </div>

          <button 
            onClick={handleOtpSubmit}
            disabled={isLoading}
            className="w-full h-[40px] bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg mb-4 shadow-sm"
          >
            {isLoading ? "Verifying..." : "Submit "}
          </button>

          <button
            onClick={handleResendOtp}
            disabled={resendLoading}
            className="w-full h-[40px] bg-blue-300 hover:bg-blue-400 text-white font-semibold rounded-lg shadow-sm"
          >
            {resendLoading ? "Sending..." : "Resend OTP"}
          </button>

        </div>

        <div className="w-full md:w-1/2 h-52 sm:h-60 md:h-auto">
          <img src={loginImg} alt="Illustration" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
