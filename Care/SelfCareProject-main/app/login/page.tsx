"use client"; // Indique que ce composant est un composant client

import Head from 'next/head';
import React, { useState, useRef } from 'react';
import { FaFacebookF, FaGoogle, FaLinkedinIn, FaRegEnvelope } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const AccountPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminCode, setAdminCode] = useState(['', '', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  // Admin login modal logic
  const handleAdminClick = () => setIsModalOpen(true);
  const handleChange = (index: number, value: string) => {
    if (/^\d$/.test(value) || value === '') {
      const newCode = [...adminCode];
      newCode[index] = value;
      setAdminCode(newCode);
      if (value !== '' && index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };
  const handleAdminCodeSubmit = () => {
    const enteredCode = adminCode.join('');
    if (enteredCode === '00000') {
      router.push('/admin-dashboard/dashboard');
    } else {
      setErrorMessage('Incorrect code. Please try again.');
    }
  };

  // User login form logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "An unexpected error occurred.");
        return;
      }

      const result = await res.json();
      
      localStorage.setItem("token", result.token);  
      localStorage.setItem('patientId', result.PatientID);
      localStorage.setItem('patientName', result.user.name); 
      localStorage.setItem('id', result.id);
      console.log('Doctor ID:', result.id);
      console.log('patientName:', result.patientName);
      console.log(result.role);
      // Redirection basée sur le rôle
      switch (result.role) {
        case "doctor":
          router.push("/secretaireDashboard/dashboard");
          break;
        case "Patient":
          router.push("/patient-dashboard/dashboard");
          break;
          case "Nutritionist":
          router.push("/secretaireNutritionnist/dashboard");
          break;
          case "FitnessTrainer":
          router.push("/FitnessDashboard");
          break;
          case "Psychologist":
          router.push("/PsychologistDashboard/dashboard");
          break;
        default:
          setError("Unknown user role.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>SelfCare App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 md:px-20 text-center mt-[-50px]">
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl">
          {/* Sign-in Section */}
          <div className="w-full md:w-3/5 p-5">
            <div className="text-left font-bold">
              <span style={{ color: 'rgb(15, 32, 74)' }}>S.</span>
              <span style={{ color: 'rgb(9, 151, 236)' }}>Care</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'rgb(15, 32, 74)' }}>Sign in to Account</h2>
            <div className="border-2 w-10 inline-block mb-2" style={{ borderBlockColor: 'rgb(15, 32, 74)' }}></div>

            {/* Social Login */}
            <div className="flex justify-center my-2">
              <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                <FaFacebookF className="text-sm" />
              </a>
              <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                <FaLinkedinIn className="text-sm" />
              </a>
              <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                <FaGoogle className="text-sm" />
              </a>
            </div>
            <p className="text-gray-400 my-3">or use your email account</p>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                <FaRegEnvelope className="text-gray-400 m-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="bg-gray-100 outline-none text-sm flex-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                <MdLockOutline className="text-gray-400 m-2" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="bg-gray-100 outline-none text-sm flex-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-between w-64 mb-5">
                <label className="flex items-center text-xs">
                  <input type="checkbox" name="remember" className="mr-1" /> Remember me
                </label>
                <a href="#" className="text-xs">Forgot Password?</a>
              </div>
              <button
                type="submit"
                className="border-2 rounded-full px-8 md:px-12 py-2 font-semibold"
                style={{ borderColor: 'rgb(15, 32, 74)', color: 'rgb(15, 32, 74)' }}
              >
                Sign In
              </button>
              {error && <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{error}</div>}
            </form>
          </div>

          {/* Register Section */}
          <div className="w-full md:w-2/5 text-white rounded-tr-2xl rounded-br-2xl py-10 md:py-36 px-8 md:px-12" style={{ backgroundColor: 'rgb(15, 32, 74)' }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Hello, Friend!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10">Fill up personal information and start your journey with us.</p>
            <a href="/register" className="border-2 border-white rounded-full px-8 md:px-12 py-2 font-semibold hover:bg-white hover:text-blue-900">
              Sign Up
            </a>
          </div>
        </div>

        {/* Admin Login Trigger */}
        <div className="mt-5">
          <a href="#" className="text-xs text-blue-900" onClick={handleAdminClick}>
            Admin Login
          </a>
        </div>

        {/* Admin Code Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-5 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-2">Enter Admin Code</h3>
              <div className="flex space-x-2 mb-3">
                {adminCode.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    ref={(el) => {
                      inputsRef.current[index] = el;
                    }}
                    className="border-2 border-gray-300 p-2 w-10 h-10 text-center text-lg"
                  />
                ))}
              </div>
              {errorMessage && <p className="text-red-500 text-sm mb-3">{errorMessage}</p>}
              <div className="flex justify-between">
                <button className="bg-blue-900 text-white px-4 py-2 rounded-md" onClick={handleAdminCodeSubmit}>
                  Submit
                </button>
                <button className="bg-gray-300 text-black px-4 py-2 rounded-md" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AccountPage;