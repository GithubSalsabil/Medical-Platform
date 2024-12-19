// pages/protected.tsx
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ProtectedPage: React.FC = () => {
  const { isAuthenticated, checkAuthStatus } = useAuth();
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus(); // Vérifie l'état actuel
    if (!isAuthenticated) {
      router.push("/login"); // Redirige vers la page de connexion si non connecté
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <p>Redirecting...</p>;
  }

  return <div>Welcome to the protected page!</div>;
};

export default ProtectedPage;