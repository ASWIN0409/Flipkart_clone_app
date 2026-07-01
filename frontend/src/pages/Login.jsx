import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../helpers/axiosInstance";

function Login() {

    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleInputChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const loginFormSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post(
                "api/token/",
                formData
            );

            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);

            navigate("/");
        } catch (e) {
            setMessage(e.response?.data.detail || e.message);
        }
    };

    if (message) return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1>{message}</h1>
            <button
                onClick={() => navigate("/register")}
                className=" text-center py-3 rounded text-blue-600 font-medium hover:bg-gray-50"
            >
                New to Flipkart? Create an account
            </button>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden grid md:grid-cols-2">
                {/* Left Side */}
                <div className="bg-blue-600 text-white p-10 flex flex-col justify-center">
                    <h1 className="text-4xl font-bold mb-4">
                        Login
                    </h1>

                    <p className="text-blue-100 text-lg leading-8">
                        Get access to your Orders, Wishlist and
                        Recommendations.
                    </p>

                    <img
                        src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/login_img-c4a81e.png"
                        alt="login"
                        className="mt-10 w-52 self-center hidden md:block"
                    />
                </div>

                {/* Right Side */}
                <div className="p-8 md:p-12">
                    <h2 className="text-3xl font-semibold mb-8 text-gray-800">
                        Welcome Back
                    </h2>

                    <form
                        onSubmit={loginFormSubmitHandler}
                        className="space-y-6"
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
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full border-b-2 border-gray-300 p-3 outline-none focus:border-blue-500"
                            required
                        />

                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded shadow-md transition"
                        >
                            LOGIN
                        </button>

                        <Link
                            to="/register"
                            className="block w-full text-center border py-3 rounded shadow-sm text-blue-600 font-medium hover:bg-gray-50"
                        >
                            New to Flipkart? Create an account
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;