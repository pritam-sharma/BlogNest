import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/HomePage/Homepage";
import Login from "./components/Users/Login";
import UserProfile from "./components/Users/UserProfile";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import { useSelector } from "react-redux";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import ProtectedRoute from "./components/AuthRoute/ProtectedRoute";
const App = () => {
  const { userAuth } = useSelector((state) => state.users);
  console.log("first", userAuth);
  const isLoggedIn = userAuth.userInfo;
  return (
    <>
      <BrowserRouter>
        {isLoggedIn ? <PrivateNavbar /> : <PublicNavbar />}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/user-profile"
            element={
              <ProtectedRoute>
                {" "}
                <UserProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
