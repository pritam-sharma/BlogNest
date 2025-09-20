import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { userAuth } = useSelector((state) => state.users);
  const isLoggedIn = userAuth?.userAuth?.token;
  // if (!isLoggedIn) {
  //   return <Navigate to="/login" />;
  // }
  return children;
};

export default ProtectedRoute;
