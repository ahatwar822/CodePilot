import { useEffect, useState } from "react";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");

                if (!accessToken) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }

                // Verify token by calling /api/user/me endpoint
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/user/me`,
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${accessToken}`,
                            "Content-Type": "application/json"
                        },
                        credentials: "include"
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setIsAuthenticated(true);
                    setUser(data.user);
                } else {
                    // Try to refresh token
                    const refreshResponse = await fetch(
                        `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            credentials: "include"
                        }
                    );

                    if (refreshResponse.ok) {
                        const data = await refreshResponse.json();
                        localStorage.setItem("accessToken", data.accessToken);
                        setIsAuthenticated(true);
                    } else {
                        setIsAuthenticated(false);
                        localStorage.removeItem("accessToken");
                    }
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return { isAuthenticated, loading, user };
};

export default useAuth;