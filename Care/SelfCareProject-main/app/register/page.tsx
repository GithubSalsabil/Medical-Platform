"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline, MdPerson } from "react-icons/md";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const router = useRouter();
    const handleSubmit = async (e: any) => {
        e.preventDefault();
    
        if (!name || !email || !password) {
          setError("All fields are necessary.");
          return;
        }
    
        try {

            const resUserExists = await fetch("http://localhost:5000/api/patient/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
              });
        
              const { user } = await resUserExists.json();
        
              if (user) {
                setError("User already exists.");
                return;
              }
    
          const res = await fetch("http://localhost:5000/api/patient/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              password,
              role: 'Patient'
            }),
          });
    
          if (res.ok) {
            const form = e.target;
            form.reset();
            router.push("/login");
          } else {
            console.log("User registration failed.");
          }
        } catch (error) {
          console.log("Error during registration: ", error);
        }
      };



  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full p-6 m-auto bg-white rounded-2xl shadow-2xl lg:max-w-lg">
        <div className="text-left font-bold">
        <span style={{ color: 'rgb(15, 32, 74)' }}>S.</span><span style={{ color: 'rgb(9, 151, 236)' }}>Care</span>

        </div>
        <h2 className="text-2xl md:text-3xl text-center font-bold text-blue-900 mb-2">
          Sign Up
        </h2>
        <div className="border-2 w-10 border-blue-900 inline-block mb-2 mx-52"></div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center">
            <div className="bg-gray-100 w-64 p-2 flex items-center">
              <MdPerson className="text-gray-400 m-2" />
              <input
               onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                placeholder="Name"
                required
                className="bg-gray-100 outline-none text-sm flex-1"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-gray-100 w-64 p-2 flex items-center">
              <FaRegEnvelope className="text-gray-400 m-2" />
              <input
              onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                placeholder="Email"
                required
                className="bg-gray-100 outline-none text-sm flex-1"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-gray-100 w-64 p-2 flex items-center">
              <MdLockOutline className="text-gray-400 m-2" />
              <input
               onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                placeholder="Password"
                required
                className="bg-gray-100 outline-none text-sm flex-1"
              />
            </div>
          </div>

          <button
            className="mx-auto border-2 border-blue-900 text-blue-900 rounded-full px-8 md:px-12 py-2 block font-semibold hover:bg-blue-900 hover:text-white"
          >
            Register
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
         
        </form>
        <div className="text-center text-gray-500 mt-4">- OR -</div>
        <Link
          className="block text-center text-gray-500 hover:underline mt-2"
          href="/login"
        >
          Login with an existing account
        </Link>
      </div>
    </div>
  );
};

export default Register;
