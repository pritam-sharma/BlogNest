import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { userAuth } = useSelector((state) => state.users);
  console.log("user auth in protected route : ", userAuth);
  const isLoggedIn = userAuth?.userInfo?.token;
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
