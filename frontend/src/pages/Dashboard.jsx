"use client"

import { useState } from "react"
import { Sidebar } from "../components/Sidebar"
import AddExpense from "../components/Expense/AddExpense"
import ExpenseList from "../components/Expense/ExpenseList"
import Navbar from "../components/layout/Navbar"
import SummaryView from "../components/Expense/SummaryView";
import BudgetPage from "../components/Budget/BudgetPage";
import ExpenseFilter from "../components/Expense/ExpenseFilter";

const Dashboard = () => {
    const [activeView, setActiveView] = useState("dashboard")

    const mainMenuItems = [
        {
            label: "Dashboard",
            icon: () => (
                <div className="w-8 h-8 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full">
                    <i className="fas fa-home text-sm" />
                </div>
            ),
            active: activeView === "dashboard",
            onClick: () => setActiveView("dashboard"),
        },
        {
            label: "Add Expense",
            icon: () => (
                <div className="w-8 h-8 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full">
                    <i className="fas fa-plus text-sm" />
                </div>
            ),
            active: activeView === "expense",
            onClick: () => setActiveView("expense"),
        },
        {
            label: "Expense List",
            icon: () => (
                <div className="w-8 h-8 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full">
                    <i className="fas fa-list text-sm" />
                </div>
            ),
            active: activeView === "list",
            onClick: () => setActiveView("list"),
        },
        {
            label: "SummaryView",
            icon: () => (
                <div className="w-8 h-8 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full">
                    <i className="fas fa-list text-sm" />
                </div>
            ),
            active: activeView === "SummaryView",
            onClick: () => setActiveView("SummaryView"),
        },
        {
            label: "BudgetPage",
            icon: () => (
                <div className="w-8 h-8 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full">
                    <i className="fas fa-list text-sm" />
                </div>
            ),
            active: activeView === "BudgetPage",
            onClick: () => setActiveView("BudgetPage"),
        },
    ]

    const otherMenuItems = [
        {
            label: "Settings",
            icon: () => (
                <div className="w-8 h-8 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full">
                    <i className="fas fa-cog text-sm" />
                </div>
            ),
            active: activeView === "settings",
            onClick: () => setActiveView("settings"),
        },
        {
            label: "Profile",
            icon: () => (
                <div className="w-8 h-8 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full">
                    <i className="fas fa-user text-sm" />
                </div>
            ),
            active: activeView === "profile",
            onClick: () => setActiveView("profile"),
        },
        {
            label: "Notifications",
            icon: () => (
                <div className="w-8 h-8 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full">
                    <i className="fas fa-user text-sm" />
                </div>
            ),
            active: activeView === "Notifications",
            onClick: () => setActiveView("Notifications"),
        },
    ]



    const renderContent = () => {
        switch (activeView) {
            case "expense":
                return (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Add Expense</h1>
                        <AddExpense />
                    </div>
                )
            case "list":
                return (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Expense List</h1>
                        <ExpenseList />
                    </div>
                )
            case "SummaryView":
                return (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Summary View</h1>
                        <SummaryView />
                    </div>
                )
            case "BudgetPage":
                return (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Budget Page</h1>
                        <BudgetPage />
                    </div>
                )
            case "settings":
                return (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Settings</h1>
                        <p className="text-gray-600">Settings page content will go here.</p>
                    </div>
                )
            case "profile":
                return (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Profile</h1>
                        <p className="text-gray-600">Profile page content will go here.</p>
                    </div>
                )
            case "dashboard":
            default:
                return (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold mb-2">Overview</h2>
                            <ExpenseFilter />
                        </div>
                    </div>
                )
        }
    }

    return (
        <>
        <Navbar />
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar */}
            <Sidebar mainMenuItems={mainMenuItems} otherMenuItems={otherMenuItems} />

            {/* Main content area */}
            <div className="flex-1 flex flex-col">

                <main className="p-6 bg-gray-50 flex-1 overflow-y-auto">
                    {renderContent()}
                </main>
            </div>
        </div>
        </>
    )
}

export default Dashboard
