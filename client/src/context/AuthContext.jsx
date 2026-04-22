import { createContext, useContext, useEffect, useState, useRef } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const refreshIntervalRef = useRef(null);

  const fetchUser = async () => {
    try {
      const { data } = await api.get("/user/me");
      setUser(data.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Automatic token refresh every 14 minutes (before 15-minute expiry)
  const startTokenRefreshTimer = () => {
    // Clear any existing interval
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
    }

    // Refresh token every 14 minutes
    refreshIntervalRef.current = setInterval(async () => {
      try {
        await api.post("/auth/refresh-token");
        console.log("Token refreshed automatically");
      } catch (error) {
        console.error("Token refresh failed:", error);
        // If refresh fails, logout user
        logout();
      }
    }, 14 * 60 * 1000); // 14 minutes
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Start token refresh timer when user logs in
  useEffect(() => {
    if (user) {
      startTokenRefreshTimer();
    } else {
      // Clear timer when user logs out
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    }

    // Cleanup on unmount
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [user]);

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      // Clear the refresh timer
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);