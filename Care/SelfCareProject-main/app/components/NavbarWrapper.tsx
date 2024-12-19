"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import NavbarAdmin from "./NavbarAdmin";
import NavbarPatient from "./NavbarPatient";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Pages où le Navbar ne doit pas être affiché
  const AdminNavbar = ["/admin-dashboard","/admin-dashboard/listeDoctor","/admin-dashboard/addDoctor" , "/admin-dashboard/dashboard" ,"/admin-dashboard/listeNutritionist","/admin-dashboard/listeFitnessTrainer","/admin-dashboard/listePsychologist", "/profileAdmin"];
  const PatientNavbar = ["/patient-dashboard", "/patient-dashboard/dashboard","/patient-dashboard/Demande", "/patient-dashboard/demande_Psychologist", "/patient-dashboard/PatientProfile", "/FitnessDashboard", "/PsychologistDashboard","/PsychologistDashboard/AppoinmentsPsy", "/PsychologistDashboard/dashboard","/PsychologistDashboard/dashboardGlobal", "/secretaireNutritionnist", "/secretaireDashboard", "/secretaireDashboard/Appointments","/secretaireNutritionnist/AppointmentsN", "/profileSecretaire","/patient-dashboard/demande_nutritionist" , "/patient-dashboard/listeDoctors", "/patient-dashboard/listeNutritionnist", "/patient-dashboard/listePsychologist","/secretaireDashboard/dashboard", "/secretaireDashboard/dashboardGlobal","/secretaireNutritionnist/dashboard", "/secretaireNutritionnist/dashboardGlobal"];

  // Afficher le Navbar seulement si la page n'est pas exclue
  if (AdminNavbar.includes(pathname)) {

    return <NavbarAdmin />;
  } else if (PatientNavbar.includes(pathname)) {
    return <NavbarPatient />;
  } else {
    return <Navbar />;
  }

}
