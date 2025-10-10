import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/slices/users/userSlices";
import LoadingComponent from "../Alert/LoadingComponent";
import ErrorMsg from "../Alert/ErrorMsg";
import SuccessMsg from "../Alert/SuccessMsg";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    username: "",
  });

  // handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      loginAction({ username: formData.username, password: formData.password })
    );
    setFormData({ password: "", username: "" });
  };

  // store data
  const { userAuth, loading, error, success } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (userAuth?.userInfo?.token) {
      navigate("/user-profile", { replace: true });
    }
  }, [userAuth, navigate]);

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="flaro-assets/logos/flaro-logo-black-xl.svg"
            alt="BlogNest Logo"
            className="h-12"
          />
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to your BlogNest account
        </p>

        {/* Alerts */}
        {error && <ErrorMsg message={error?.message} />}
        {success && <SuccessMsg message="Login Successful" />}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block mb-1 text-gray-600 font-medium text-sm">
              Username
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              type="text"
              placeholder="Enter your username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-gray-600 font-medium text-sm">
              Password
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          {loading ? (
            <LoadingComponent />
          ) : (
            <button
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-200"
              type="submit"
            >
              Login
            </button>
          )}
        </form>

        {/* Extra Links */}
        <div className="mt-6 text-center">
          <Link
            to="/forgot-password"
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Forgot your password?
          </Link>
        </div>
        <div className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
