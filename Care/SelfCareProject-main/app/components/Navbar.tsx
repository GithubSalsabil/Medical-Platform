"use client";
import { useEffect, useState } from 'react';
import { Popover, PopoverButton, Transition } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import wlogo from "@/images/wlogo.png";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";

const Navbar: React.FC = () => {
  // État pour gérer l'utilisateur connecté
  const [patient, setPatient] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
  
        const res = await fetch("http://localhost:5000/api/patient/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const result = await res.json();
        setPatient(result.patient);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchData();
  }, []);

  // Fonction de déconnexion
  const handleLogout = () => {
    setPatient(null); // Déconnecte l'utilisateur
  };

  return (
    <Popover
      className="relative border-b-1"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-54587.jpg?size=338&ext=jpg&ga=GA1.1.1880011253.1728820800&semt=ais_hybrid-rr-similar)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "10vh",
        width: "100vw",
      }}
    >
      <div
        className="absolute top-0 left-2 right-3 flex justify-between items-center p-3 bg-transparent"
        style={{ lineHeight: "2rem" }}
      >
        <h1 className="font-bold text-2xl text-white">
          <Image
            src={wlogo}
            alt="SelfCare logo"
            className="mx-auto w-12 h-12 rounded-full shadow-lg"
          />
        </h1>

        {/* Liens pour les écrans plus grands */}
        <div className="hidden sm:flex gap-4 md:gap-8">
          <Link href="/" className="text-white hover:text-blue-400 font-bold">
            Home
          </Link>
          <Link href="/Comment/Comments" className="text-white hover:text-blue-400 font-bold">
            Comment
          </Link>
          <Link
            href="/evaluation"
            className="text-white hover:text-blue-400 font-bold"
          >
            Évaluation
          </Link>
          <Link
            href="/Doctors/DoctorList"
            className="text-white hover:text-blue-400 font-bold"
          >
            Doctors
          </Link>
          <Link
            href="/Psychologist/PsychologistList"
            className="text-white hover:text-blue-400 font-bold"
          >
            Psychologist
          </Link>
          <Link
            href="/fitnessTrainer/fitnessTrainerList"
            className="text-white hover:text-blue-400 mr-2 font-bold"
          >
            Fitness Trainer
          </Link>
          <Link
            href="/Nutritionist/NutritionnistList"
            className="text-white hover:text-blue-400 mr-2 font-bold"
          >
            Nutritionnists
          </Link>
          {patient ? (
            // Si l'utilisateur est connecté, afficher LogOut
            <button
              onClick={handleLogout}
              className="text-white hover:text-red-400 font-bold"
            >
              Logout ({patient.name})
            </button>
          ) : (
            // Sinon afficher LogIn
            <Link href="/login" className="text-white font-bold">
              LogIn
            </Link>
          )}
        </div>

        <div className="sm:hidden flex items-center">
          <PopoverButton className="inline-flex rounded-md bg-white p-2 text-gray-480 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span className="sr-only">Open menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </PopoverButton>
        </div>
      </div>

      {/* Menu déroulant pour les petits écrans */}
      <Popover.Overlay className="sm:hidden fixed inset-0 bg-black opacity-30" />
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
          <div className="rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 divide-y-2 divide-gray-50">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <h1 className="font-bold">S.Care</h1>
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  <Link
                    href="/"
                    className="focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-2"
                  >
                    Home
                  </Link>
                  <Link
                    href="/evaluation"
                    className="focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-2"
                  >
                    Évaluation
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Navbar;