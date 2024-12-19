// context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
  checkAuthStatus: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  // Fonction pour simuler la connexion (remplacer par une requête backend réelle)
  const login = (username: string) => {
    setIsAuthenticated(true);
    setUser(username);
    localStorage.setItem("authToken", "user-authenticated"); // Simule un token
    localStorage.setItem("username", username);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
  };

  // Vérifie si l'utilisateur est connecté (token valide dans le localStorage ou backend)
  const checkAuthStatus = () => {
    const token = localStorage.getItem("authToken");
    const username = localStorage.getItem("username");
    if (token) {
      setIsAuthenticated(true);
      setUser(username);
    }
  };

  useEffect(() => {
    checkAuthStatus(); // Vérifie l'état à chaque chargement de la page
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};