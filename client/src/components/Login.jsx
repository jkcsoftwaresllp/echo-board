import React from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";


export default function Login() {
  return (
    <div className="flex min-h-screen relative ">
      <div className=" hidden md:block absolute top-0">
        <img src="/images/logo2.png" alt="Logo" className="w-fit h-28" />
      </div>

      {/* Left side - form */}
      <div className="w-full md:w-1/2 bg-gradient-to-b from-green-100 to-blue-100 p-[100px] flex flex-col justify-center items-center">
        <h2 className=" text-5xl font-bold mb-20 text-center">Admin Login</h2>

        <div className="w-[400px]">
        <div className="mb-4 flex  items-center border border-gray-300 bg-white px-3 py-2  rounded w-100 justify-center ">
          <FaEnvelope className="text-gray-500 mr-2 " />
          <input
            type="email"
            placeholder="Email"
            className="outline-none w-full font-semibold"
          />
        </div>
        </div>

        <div className="w-[400px]">
        <div className="mb-4 flex items-center border border-gray-300 bg-white px-3 py-2 rounded w-100  justify-center">
          <FaLock className="text-gray-500 mr-2" />
          <input
            type="password"
            placeholder="Password"
            className="outline-none w-full font-semibold text-black"
          />
        </div>
        </div>
        <div className="mb-2 text-center">
          <a
            href="#"
            className="text-sm text-gray-600 underline hover:text-gray-900 "
          >
            Forgot your password?
          </a>
        </div>

        <div className="flex justify-center items-center">
          <button className=" w-30 bg-green-600 text-white py-2 px-2 rounded-lg font-semibold hover:bg-green-700 transition ">
            Sign in
          </button>
        </div>
      </div>

       {/* Right side - image  */}
      <div className="hidden md:block w-1/2">
        <img
          src="/images/adminLogin2.png"
          alt="Login Visual"
          className="w-screen h-screen object-cover"
        />
      </div>
    </div>
  );
}
