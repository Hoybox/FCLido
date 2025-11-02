import { useContext } from "react";
import { AuthContext } from "./AuthContext";

/**
 * ✅ Hook personnalisé pour utiliser le contexte d'authentification.
 * Gère la sécurité en cas d’utilisation en dehors du provider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
