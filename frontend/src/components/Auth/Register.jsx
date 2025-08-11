import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import registerImg from "../../assets/register.png"; // Use your image path

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "USER",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/auth/register", formData);
            if (res.status === 200) {
                alert("Registered successfully!");
                if (res.data.token) localStorage.setItem("token", res.data.token);
                navigate("/");
            }
        } catch (error) {
            console.error("Registration failed:", error.response?.data || error.message);
            alert("Registration failed!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white rounded-2xl shadow-lg flex max-w-4xl w-full overflow-hidden">
                {/* Form section */}
                <div className="w-full md:w-1/2 p-10">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Register</h2>
                    <p className="text-sm text-gray-600 mb-6">Create your personal finance tracker account</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                            name="role"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Register
                        </button>
                    </form>
                    <p className="mt-4 text-sm text-gray-600 text-center">
                        Already have an account?{" "}
                        <span
                            className="text-blue-600 cursor-pointer hover:underline"
                            onClick={() => navigate("/")}
                        >
                            Login
                        </span>
                    </p>
                </div>

                {/* Image section */}
                <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-100">
                    <img src={registerImg} alt="Register Illustration" className="max-w-xs" />
                </div>
            </div>
        </div>
    );
};

export default Register;
