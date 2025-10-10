import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../redux/slices/users/userSlices";
import ErrorMsg from "../Alert/ErrorMsg";
import SuccessMsg from "../Alert/SuccessMsg";
import LoadingComponent from "../Alert/LoadingComponent";

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
    <section className="py-16 xl:pb-56 bg-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-md mx-auto bg-white shadow-2xl rounded-2xl p-10">
          {/* Logo */}
          <a className="mb-8 inline-block" href="#">
            <img src="flaro-assets/logos/flaro-logo-black-xl.svg" alt="Logo" />
          </a>

          {/* Title */}
          <h2 className="mb-4 text-3xl md:text-4xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mb-8 text-gray-600">
            Join BlogNest and start sharing your ideas with the world.
          </p>

          {/* Error / Success */}
          {error && <ErrorMsg message={error?.message} />}
          {success && <SuccessMsg message="Registration successful" />}

          {/* Form */}
          <form onSubmit={handleSubmit} className="text-left">
            {/* Username */}
            <label className="block mb-5">
              <input
                className="px-4 py-3.5 w-full text-gray-700 placeholder-gray-500 
                bg-white border border-gray-300 rounded-lg outline-none 
                focus:ring-2 focus:ring-indigo-300"
                type="text"
                placeholder="Enter Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </label>

            {/* Email */}
            <label className="block mb-5">
              <input
                className="px-4 py-3.5 w-full text-gray-700 placeholder-gray-500 
                bg-white border border-gray-300 rounded-lg outline-none 
                focus:ring-2 focus:ring-indigo-300"
                type="email"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>

            {/* Password */}
            <label className="block mb-5">
              <input
                className="px-4 py-3.5 w-full text-gray-700 placeholder-gray-500 
                bg-white border border-gray-300 rounded-lg outline-none 
                focus:ring-2 focus:ring-indigo-300"
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
                className="mb-6 py-4 px-9 w-full text-white font-semibold 
                bg-indigo-600 hover:bg-indigo-700 border border-indigo-700 
                rounded-xl shadow-lg transition duration-200"
                type="submit"
              >
                Register Account
              </button>
            )}
          </form>

          {/* Footer */}
          <p className="text-sm text-gray-600">
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
