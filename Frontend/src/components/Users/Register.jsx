import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../redux/slices/users/userSlices";
import ErrorMsg from "../Alert/ErrorMsg";
import SuccessMsg from "../Alert/SuccessMsg";
import LoadingComponent from "../Alert/LoadingComponent";
import BlogNest from "../../assets/BlogNest.png";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerAction(formData));
    setFormData({ email: "", password: "", username: "" });
  };

  const { user, error, loading, success } = useSelector((state) => state.users);

  useEffect(() => {
    if (user?.status === "success") {
      navigate("/login", { replace: true });
    }
  }, [user?.status, navigate]);

  return (
    <section className="py-10 sm:py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto bg-white shadow-2xl rounded-2xl p-6 sm:p-8 lg:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src={BlogNest}
              alt="Logo"
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>

          {/* Title */}
          <h2 className="mb-4 text-2xl sm:text-3xl font-bold text-gray-900 text-center">
            Create your account
          </h2>
          <p className="mb-6 text-gray-600 text-center text-sm sm:text-base">
            Join BlogNest and start sharing your ideas with the world.
          </p>

          {/* Error / Success */}
          {error && <ErrorMsg message={error?.message} />}
          {success && <SuccessMsg message="Registration successful" />}

          {/* Form */}
          <form onSubmit={handleSubmit} className="text-left">
            {/* Username */}
            <label className="block mb-4">
              <input
                className="px-4 py-3 w-full text-gray-700 placeholder-gray-500 
                bg-white border border-gray-300 rounded-lg outline-none 
                focus:ring-2 focus:ring-indigo-300 text-sm sm:text-base"
                type="text"
                placeholder="Enter Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </label>

            {/* Email */}
            <label className="block mb-4">
              <input
                className="px-4 py-3 w-full text-gray-700 placeholder-gray-500 
                bg-white border border-gray-300 rounded-lg outline-none 
                focus:ring-2 focus:ring-indigo-300 text-sm sm:text-base"
                type="email"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>

            {/* Password */}
            <label className="block mb-6">
              <input
                className="px-4 py-3 w-full text-gray-700 placeholder-gray-500 
                bg-white border border-gray-300 rounded-lg outline-none 
                focus:ring-2 focus:ring-indigo-300 text-sm sm:text-base"
                type="password"
                placeholder="Enter Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </label>

            {/* Button */}
            {loading ? (
              <LoadingComponent />
            ) : (
              <button
                className="w-full py-3 sm:py-4 text-white font-semibold 
                bg-indigo-600 hover:bg-indigo-700 border border-indigo-700 
                rounded-lg shadow-md transition duration-200 text-sm sm:text-base"
                type="submit"
              >
                Register Account
              </button>
            )}
          </form>

          {/* Footer */}
          <p className="mt-6 text-xs sm:text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link
              className="text-indigo-600 hover:text-indigo-700 font-medium"
              to="/login"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
