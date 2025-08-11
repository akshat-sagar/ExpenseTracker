import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginImg from "../../assets/login.png"; // Ensure the image exists here

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/auth/login", form);
            localStorage.setItem("token", res.data.token);
            alert("Login successful");
            window.location.href = "/homepage";
            navigate("/homepage");
        } catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="flex max-w-5xl w-full shadow-lg rounded-lg overflow-hidden bg-white">
                {/* Left - Login Form */}
                <div className="w-full md:w-1/2 p-10">
                    <div className="flex items-center space-x-2 mb-6">
                        <h1 className="text-xl font-bold">TruPath</h1>
                    </div>

                    <h2 className="text-2xl font-semibold mb-2">Login</h2>
                    <p className="text-gray-500 mb-4">Login to access your TruWallet account</p>

                    {error && <p className="text-red-600 mb-3">{error}</p>}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-4 py-2 rounded"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-4 py-2 rounded"
                            required
                        />

                        <div className="flex justify-between text-sm text-gray-600">
                            <label>
                                <input type="checkbox" className="mr-1" /> Remember me
                            </label>

                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                        >
                            Login
                        </button>

                        <p className="text-sm text-center text-gray-600 mt-2">
                            Don’t have an account?{" "}
                            <a href="/register" className="text-blue-600 font-medium hover:underline">
                                Sign up
                            </a>
                        </p>


                    </form>
                </div>

                {/* Right - Image */}
                <div className="hidden md:block md:w-1/2 bg-gray-100">
                    <img
                        src={loginImg}
                        alt="Login Illustration"
                        className="object-contain w-full h-full p-8"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
