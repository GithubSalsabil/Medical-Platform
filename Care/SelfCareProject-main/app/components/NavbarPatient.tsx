import { Popover, PopoverButton, Transition, Menu } from "@headlessui/react"; 
import Link from "next/link";
import Image from 'next/image';
import wlogo from '@/images/wlogo.png'; 
import { Bars3Icon, XMarkIcon, EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { BiUser, BiLogOut } from 'react-icons/bi';
import { Fragment, useState, useEffect } from "react";

// Fonction pour vider le token du localStorage
const logout = () => {
  localStorage.removeItem("token"); // Vider le token
  window.location.href = "/"; // Rediriger l'utilisateur vers la page d'accueil ou une autre page
};

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Si un token est présent, récupérer le rôle depuis le token (par exemple, si vous le stockez dans le JWT)
    
    if (typeof window !== 'undefined') {  // Vérifier si on est dans un environnement client
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Décoder le token JWT
      setUserRole(decodedToken.role); // Supposons que votre JWT contient un champ `role`
    }
    }
    
  }, [isLoggedIn]);

  return (
    <Popover className="relative border-b-1"
      style={{
        backgroundImage: 'url(https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-54587.jpg?size=338&ext=jpg&ga=GA1.1.1880011253.1728820800&semt=ais_hybrid-rr-similar)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '10vh',
        width: '100vw',
        filter: 'none',
        imageRendering: 'auto',
      }}
    >
      <div className="absolute top-0 left-2 right-3 flex justify-between items-center p-3 bg-transparent" style={{ lineHeight:'2rem' }}>
        {/* Logo et titre */}
        <h1 className="font-bold text-2xl text-white flex">
          <Image src={wlogo} alt="SelfCare logo" className="mx-auto w-12 h-12 rounded-full shadow-lg" />
          <div className="p-2 text-center font-bold text-xl">
          {userRole === "FitnessTrainer" ? "Fitness Dashboard" : (userRole === "Patient" ? "Patient Dashboard" : (userRole === "Psychologist" ? "Psychologist Dashboard" : (userRole === "Nutritionist" ? "Nutritionist Secretary Dashboard" : "Doctor Secretary Dashboard"))) } 
          </div>
        </h1>

        {/* Menu déroulant pour les écrans larges */}
        <Menu as="div" className="relative inline-block text-left hidden lg:block">
          <Menu.Button className="inline-flex justify-center w-full rounded-md bg-transparent text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white">
            <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                {/* Afficher le profil uniquement si l'utilisateur est connecté */}
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={userRole === 'FitnessTrainer' ? "/FitnessDashboard" : "/patient-dashboard/PatientProfile"}
                      className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      <BiUser className="h-5 w-5" />
                      Profile
                    </Link>
                  )}
                </Menu.Item>

                {/* Déconnexion */}
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => {
                        logout();
                        setIsLoggedIn(false); // Mettre à jour l'état pour refléter la déconnexion
                      }}
                      className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      <BiLogOut className="h-5 w-5" />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        {/* Menu hamburger pour mobile */}
        <div className="sm:hidden flex items-center">
          <PopoverButton className="inline-flex rounded-md bg-white p-2 text-gray-480 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span className="sr-only">Open menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </PopoverButton>
        </div>
      </div>

      {/* Menu mobile */}
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
                  <Link className="focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-2" href={userRole === 'fitnessstrainer' ? "/fitness-trainer-dashboard" : "/profile"}>Profile</Link>
                </nav>
                <nav className="grid gap-y-8">
                  <Link href="/" className="focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-2" onClick={logout}>Logout</Link>
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