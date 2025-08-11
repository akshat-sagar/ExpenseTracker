// src/components/layout/Navbar.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("User");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const base64 = token.split('.')[1];
                const payload = JSON.parse(atob(base64));
                setUsername(payload.sub || "User");
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";

        navigate("/", {replace: true});
    };

    return (
        <nav className="bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">T</div>
                        <span className="ml-2 text-lg font-semibold">TruPath</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 text-gray-700">
                        {['Home', 'About', 'Services', 'Tools'].map((item) => (
                            <a key={item} href="/homepage" className="hover:text-blue-600">{item}</a>
                        ))}
                    </div>

                    {/* Dropdown User */}
                    <div className="relative hidden md:block">
                        <button
                            className="flex items-center bg-gray-100 px-4 py-2 rounded-full text-sm"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <span className="mr-2">{username}</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-10">
                                <button
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={() => {
                                        setDropdownOpen(false);
                                        navigate("/profile");
                                    }}
                                >
                                    Profile
                                </button>
                                <button
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Hamburger Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {mobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden px-4 pt-2 pb-4 space-y-2 border-t">
                    {['Home', 'About', 'Services', 'Tools'].map((item) => (
                        <a key={item} href="#" className="block text-gray-700 hover:text-blue-600">{item}</a>
                    ))}
                    <hr className="my-2" />
                    <div className="text-sm text-gray-600">
                        <div className="mb-1">Logged in as: <strong>{username}</strong></div>
                        <button
                            className="w-full text-left px-2 py-1 hover:bg-gray-100"
                            onClick={() => {
                                setMobileMenuOpen(false);
                                navigate("/profile");
                            }}
                        >
                            Profile
                        </button>
                        <button
                            className="w-full text-left px-2 py-1 hover:bg-gray-100"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
