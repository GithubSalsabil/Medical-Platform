"use client"
import Link from 'next/link'; 
import { Home } from 'lucide-react';
import { FaUsers, FaUserMd, FaAppleAlt } from 'react-icons/fa';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import PsychologyIcon from '@mui/icons-material/Psychology';
import { useEffect, useState } from 'react';

export const SidebarUser = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Récupère le rôle de l'utilisateur à partir du token ou du contexte
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Décodage du token JWT
      setRole(decodedToken.role); // Par exemple, 'admin', 'patient', 'doctor'
    }
  }, []);

  return (
    <aside style={{ backgroundColor: 'rgb(0, 43, 106)' }} className="w-64 text-white flex flex-col">
      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          {/* Lien Home accessible pour tous les utilisateurs */}

          {/* Affichage conditionnel en fonction du rôle */}

          {role === 'FitnessTrainer' && (
            <ul>
            <li>
            <Link href="/dashboard" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
          </li>
            <li>
              <Link href="/" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
              <FaUsers className="h-5 w-5" />
                <span>Clients</span>
              </Link>
            </li>
            </ul>
          )}
          {role === 'Psychologist' && (
            <ul>
            <li>
            <Link href="/PsychologistDashboard/dashboard" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
          </li>
            <li>
            <Link href="/PsychologistDashboard/dashboardGlobal" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
          </li>
            <li>
              <Link href="/PsychologistDashboard/AppoinmentsPsy" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
               <FaUserMd className="h-5 w-5" />
                <span>Apointments</span>
              </Link>
            </li>
            </ul>
          )}

          {role === 'Patient' && (
            <ul>
            <li>
            <Link href="/patient-dashboard/dashboard" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
          </li>
            <li>
              <Link href="/patient-dashboard/listeDoctors" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
               <FaUserMd className="h-5 w-5" />
                <span>Doctors</span>
              </Link>
            </li>
            <li>
              <Link href="/patient-dashboard/listeNutritionnist" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
              <FaAppleAlt className="h-5 w-5" />
                <span>Nutritionist</span>
              </Link>
            </li>
            <li>
              <Link href="/patient-dashboard/listePsychologist" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
              <PsychologyIcon className="h-5 w-5" />
                <span>Psychologist</span>
              </Link>
            </li>
            <li>
              <Link href="/patient-dashboard/Demande" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
              <FontAwesomeIcon icon={faCalendar} className="h-5 w-5" />
                <span>Appointment_Doctor</span>
              </Link>
            </li>
            <li>
              <Link href="/patient-dashboard/demande_nutritionist" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
              <FontAwesomeIcon icon={faCalendar} className="h-5 w-5" />
                <span>Appointment_Nutritionist</span>
              </Link>
            </li>
            <li>
              <Link href="/patient-dashboard/demande_Psychologist" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
              <FontAwesomeIcon icon={faCalendar} className="h-5 w-5" />
                <span>Appointment_Psychologist</span>
              </Link>
            </li>
            </ul>
          )}
          {role === 'doctor' && (
            <ul>
            <li>
            <Link href="/secretaireDashboard/dashboard" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link href="/secretaireDashboard/dashboardGlobal" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
          </li>
            <li>
              <Link href="/secretaireDashboard/Appointments" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
               <FaUserMd className="h-5 w-5" />
                <span>Apointments</span>
              </Link>
            </li>
            </ul>
          )}
          {role === 'Nutritionist' && (
            <ul>
          <li>
            <Link href="/secretaireNutritionnist/dashboard" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link href="/secretaireNutritionnist/dashboardGlobal" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
          </li>
            <li>
              <Link href="/secretaireNutritionnist/AppointmentsN" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
               <FaUserMd className="h-5 w-5" />
                <span>Apointments</span>
              </Link>
            </li>
            </ul>
          )}

          {/* D'autres liens peuvent être ajoutés ici selon les rôles */}
        </ul>
      </nav>
    </aside>
  );
};