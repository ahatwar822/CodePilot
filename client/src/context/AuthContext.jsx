import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("/api/v1/user/me", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error("Not authenticated");
        const data = await response.json();
        setUser(data.user || null);
      } catch {
        setUser(null);
      } finally {
        setStatus("ready");
      }
    };

    fetchCurrentUser();
  }, []);

  const logout = async () => {
    try {
      // Call backend logout endpoint to clear cookies and database
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Logout failed on server");

    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      // Clear user state regardless of backend response
      setUser(null);
      setStatus("ready");
      window.location.href = "/login";  // Or use React Router's navigate
    }
  };

  return (
    <AuthContext.Provider value={{ user, status, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);