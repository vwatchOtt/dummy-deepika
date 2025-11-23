import React from "react";
import notFoundImg from "../assets/notFoundImg.png";


export default function Error() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center max-w-md w-full bg-white p-8 rounded-lg shadow-md ">
        <img
          src={notFoundImg} // replace with your image path
          alt="404 Illustration"
          className="mx-auto w-64 md:w-80"
        />

        <h1 className="text-4xl font-bold text-blue-600 mt-6">404</h1>
        <p className="text-gray-600 mt-2">Uh oh, something looks wrong here</p>

        <button
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={() => (window.location.href = "/")}
        >
          Home
        </button>
      </div>
    </div>
  );
}
