"use client"

// src/pages/Homepage.jsx
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"

export default function Homepage() {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (!token) {
            navigate("/")
        }
    }, [token, navigate])

    return (
        <div className="bg-white text-gray-900">
            <Navbar />

            {/* Hero Section */}
            <section className="px-8 py-20 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="text-blue-600 font-semibold mb-6 text-lg">Get Money, Get Control</p>
                            <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                                Take Control of Your Financial Future
                            </h1>
                            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg">
                                Take control of your money with TruPath. Your simple, smart money management solution.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-16">
                                <button
                                    className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-colors"
                                    onClick={() => navigate("/dashboard")}
                                >
                                    Explore our services
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="flex justify-center items-center space-x-6">
                                <div className="transform rotate-12 z-10">
                                    <img className="w-56 h-[480px] rounded-[3rem] shadow-2xl" src="/src/assets/app1.png" />
                                </div>
                                <div className="transform -rotate-6 z-20">
                                    <img className="w-56 h-[480px] rounded-[3rem] shadow-2xl" src="/src/assets/app2.png" />
                                </div>
                            </div>
                            <div className="absolute top-8 right-4 bg-white rounded-2xl p-6 shadow-xl z-30">
                                <div className="text-3xl font-bold text-gray-900">$804.1</div>
                                <div className="text-sm text-gray-500 mt-1">Available balance</div>
                                <div className="text-xs text-green-600 mt-2 font-semibold">+2.5% from last month</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="px-8 py-24 bg-white">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-block bg-purple-100 text-purple-600 px-6 py-2 rounded-full text-sm font-medium mb-3">
                        Simple. Smart. Financial Control.
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features to Take Control </h2>
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">of Your Finances</h2>
                    <p className="text-gray-600 mb-10 max-w-1xl mx-auto leading-relaxed">
                        Manage your finances. Monitor expenses.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Expense Tracking */}
                        <div className="bg-gray-50 rounded-3xl p-8 text-left">
                            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mb-3">
                                <svg
                                    className="w-5 h-5 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Expense Tracking</h3>
                            <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                                Easily track your daily, weekly, and monthly expenses to stay in control of where your money goes.
                            </p>
                            <div className="flex justify-start">
                                <img
                                    src="/src/assets/app1.png"
                                    className="w-full h-40 object-cover rounded-xl"
                                    style={{
                                        clipPath: "polygon(0 0, 100% 0, 100% 90%, 0% 90%)",
                                    }}
                                />
                            </div>



                        </div>

                        {/* Budget Planning */}
                        <div className="bg-gray-50 rounded-3xl p-8 text-left">
                            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mb-3">
                                <svg
                                    className="w-5 h-5 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Budget Planning</h3>
                            <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                                Set clear budgets, monitor your progress, and avoid overspending with smart, intuitive budgeting tools.
                            </p>
                            <div className="flex justify-start">
                                <img
                                    src="/src/assets/expense.png"
                                    className="w-full h-40 object-cover rounded-xl"
                                    style={{
                                        clipPath: "polygon(0 0, 100% 0, 100% 90%, 0% 90%)",
                                    }}
                                />                            </div>
                        </div>

                        {/* Multi-Account Support */}
                        <div className="bg-gray-50 rounded-3xl p-8 text-left">
                            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mb-3">
                                <svg
                                    className="w-5 h-5 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Multi-Account Support</h3>
                            <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                                Manage all your bank accounts in one place, track balances, move funds seamlessly between accounts.
                            </p>
                            <div className="flex justify-center">
                                <img src="/src/assets/accounts.png" className="w-32 h-auto max-w-sm" />
                            </div>
                        </div>
                    </div>

                    <button className="mt-8 bg-purple-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-purple-700 transition-colors flex items-center mx-auto">
                        Explore All Features
                        <svg
                            className="w-5 h-5 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </section>

            {/* Steps Section */}
            <section className="px-2 sm:px-4 lg:px-6 py-14 sm:py-18 lg:py-20 bg-gradient-to-br from-purple-400 to-purple-600">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="bg-white rounded-1xl lg:rounded-2xl p-4 sm:p-4 shadow-2xl w-full max-w-sm mx-auto">
                                <img
                                    src="/src/assets/app2.png"
                                    alt="Finance app transactions screen"
                                    className="w-[50%] h-auto object-contain"
                                />
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 text-white">
                            <div className="inline-block bg-white bg-opacity-20 text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
                                How It Works
                            </div>
                            <h2 className="text-3xl font-bold mb-4 leading-tight">Manage Your Finances in 3 Simple Steps</h2>
                            <p className="text-purple-200 mb-12 text-sm leading-relaxed">
                                It's quick, easy, and stress-free to stay on top of your money — no technical skills required.
                            </p>

                            <div className="space-y-10">
                                <div className="flex items-start space-x-6">
                                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg
                                            className="w-4 h-4 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-1xl font-bold mb-2">Create Your Free Account in Minutes</h3>
                                        <p className="text-purple-200 text-sm leading-relaxed">
                                            Get started instantly and securely connect all your bank accounts and financial tools in one
                                            place.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-6">
                                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg
                                            className="w-4 h-4 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-1xl font-bold mb-2">See Smart Reports, Instantly</h3>
                                        <p className="text-purple-200 text-sm leading-relaxed">
                                            Receive detailed, automated reports that help you understand your finances and make informed
                                            decisions effortlessly.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-6">
                                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg
                                            className="w-4 h-4 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-1xl font-bold mb-2">Track Spending & Stay on Budget</h3>
                                        <p className="text-purple-200 text-sm leading-relaxed">
                                            Visualize your expenses, set clear budgets, and never lose track of where your money goes again.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button className="mt-12 bg-white text-purple-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center">
                                Try It for Free
                                <svg
                                    className="w-5 h-5 ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Trust Section */}
            <section className="px-8 py-24 bg-white">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-5xl font-bold text-gray-900 mb-6">Why Thousands Trust TruPath</h2>
                    <p className="text-xl text-gray-600 mb-20 max-w-4xl mx-auto leading-relaxed">
                        Discover what makes our expense management platform the preferred choice for smart money management.
                    </p>

                    <div className="grid md:grid-cols-3 gap-16">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
                                <div className="w-10 h-10 bg-blue-600 rounded-full"></div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">See Real-Time Financial Calculations</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Get instant insights into your spending patterns and financial health with real-time calculations and
                                smart analytics.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
                                <div className="w-10 h-10 bg-blue-600 rounded-full"></div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Get Real-Time Financial Insights</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Access comprehensive financial reports and insights that help you make informed decisions about your
                                money.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
                                <div className="w-10 h-10 bg-blue-600 rounded-full"></div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Stay on top of Budgets</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Set smart budgets, track your progress, and receive alerts to help you stay on track with your financial
                                goals.
                            </p>
                        </div>
                    </div>

                    <button className="mt-16 bg-blue-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors">
                        Start for free ➤
                    </button>
                </div>
            </section>




            {/* Newsletter Section */}
            <section className="px-8 py-20 bg-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gradient-to-r from-purple-400 to-purple-500 rounded-3xl p-12 relative overflow-hidden">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="text-black">
                                <h2 className="text-5xl font-bold mb-6 leading-tight text-black">
                                    Start Managing Your Finances with Confidence
                                </h2>
                                <p className="text-gray-700 mb-12 text-lg leading-relaxed">
                                    Take control of your income, expenses, and financial future — it all begins with the right tools.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-0 max-w-lg">
                                    <input
                                        type="email"
                                        placeholder="Enter Your Email"
                                        className="flex-1 px-6 py-4 rounded-l-full sm:rounded-r-none rounded-r-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 text-lg border-none"
                                    />
                                    <button className="bg-purple-600 text-white px-8 py-4 rounded-r-full sm:rounded-l-none rounded-l-full font-semibold hover:bg-purple-700 transition-colors whitespace-nowrap text-lg flex items-center gap-2">
                                        Subscribe <span>➤</span>
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-center lg:justify-end relative">
                                <div className="relative">
                                    <img
                                        src="/src/assets/newsletter.png"
                                        alt="Hand holding phone with expense tracker app"
                                        className="w-96 h-auto max-w-full object-contain relative z-10"
                                        style={{
                                            filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))",
                                            transform: "rotate(-5deg)",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
