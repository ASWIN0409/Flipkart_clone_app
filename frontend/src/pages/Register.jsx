import { useState } from "react";
import { axiosInstance } from "../helpers/axiosInstance";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const registerFormSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("api/register/", formData);
      navigate("/login");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden grid md:grid-cols-2">
        {/* Left Side */}
        <div className="bg-blue-600 text-white p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">Looks like you're new here!</h1>

          <p className="text-blue-100 text-lg leading-8">
            Sign up with your details to get started with shopping on Flipkart.
          </p>

          <img
            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/login_img-c4a81e.png"
            alt="signup"
            className="mt-10 w-52 self-center hidden md:block"
          />
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-semibold mb-8 text-gray-800">
            Create Account
          </h2>

          <form
            onSubmit={registerFormSubmitHandler}
            className="space-y-5"
          >
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full border-b-2 border-gray-300 p-3 outline-none focus:border-blue-500"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border-b-2 border-gray-300 p-3 outline-none focus:border-blue-500"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border-b-2 border-gray-300 p-3 outline-none focus:border-blue-500"
              required
            />

            <input
              type="password"
              name="password2"
              placeholder="Enter Password Again"
              value={formData.password2}
              onChange={handleInputChange}
              className="w-full border-b-2 border-gray-300 p-3 outline-none focus:border-blue-500"
              required
            />

            <p className="text-xs text-gray-500 leading-5">
              By continuing, you agree to Flipkart's Terms of Use and Privacy
              Policy.
            </p>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded shadow-md transition"
            >
              SIGN UP
            </button>

            <Link
              to="/login"
              className="block w-full text-center border py-3 rounded shadow-sm text-blue-600 font-medium hover:bg-gray-50"
            >
              Existing User? Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;