import { useContext, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import axiosInstance from "@/axiosInstance";

const PrivateRoute = () => {
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const statusFetch = async () => {
      try {
        const statusRes = await axiosInstance.get("/api/auth/status");
        if (statusRes.status === 200) {
          login({
            username: statusRes.data.user.username,
            _id: statusRes.data.user._id,
            email: statusRes.data.user.email,
            bio: statusRes.data.user.bio,
            location: statusRes.data.user.location,
          });
          navigate("/employees", { replace: true });
        }
      } catch (error) {
        if (error.response?.status === 401) {
          // User is not authenticated
          navigate("/login", { replace: true });
        } else {
          console.error("Error fetching auth status:", error);
        }
      }
    };
    if (!isAuthenticated) {
      statusFetch();
    }
  }, [isAuthenticated, login, navigate]);

  return isAuthenticated ? <Outlet /> : <Navigate replace to="/login" />;
};

export default PrivateRoute;
