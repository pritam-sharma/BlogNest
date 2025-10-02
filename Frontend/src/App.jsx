import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/HomePage/Homepage";
import Login from "./components/Users/Login";
import UserProfile from "./components/Users/UserProfile";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import { useSelector } from "react-redux";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import ProtectedRoute from "./components/AuthRoute/ProtectedRoute";
import PublicPosts from "./components/Posts/PublicPosts";
import AddPost from "./components/Posts/AddPost";
import PostDetails from "./components/Posts/PostDetails";
import PostList from "./components/Posts/PostList";
import UpdatePost from "./components/Posts/UpdatePost";
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
            path="/user-public-profile/:userId"
            element={
              <ProtectedRoute>
                {" "}
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-post"
            element={
              <ProtectedRoute>
                {" "}
                <AddPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/:postId"
            element={
              <ProtectedRoute>
                {" "}
                <PostDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts"
            element={
              <ProtectedRoute>
                {" "}
                <PostList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/:postId/update"
            element={
              <ProtectedRoute>
                {" "}
                <UpdatePost />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
