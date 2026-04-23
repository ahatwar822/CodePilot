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

  return (
    <AuthContext.Provider value={{ user, status, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);