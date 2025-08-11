import { useEffect, useState } from "react";
import axios from "axios";

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedMonth, setSelectedMonth] = useState("All");

    const token = localStorage.getItem("token");

    const fetchExpenses = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/expenses/all", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setExpenses(res.data);
            setFilteredExpenses(res.data);
        } catch (err) {
            console.error("Failed to fetch expenses", err);
        } finally {
            setLoading(false);
        }
    };

    const deleteExpense = async (id) => {
        try {
            const token = localStorage.getItem("token");
            console.log("Using token:", token);

            await axios.delete(`http://localhost:8080/api/expenses/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });


            setExpenses(prev => prev.filter(exp => exp.id !== id));
            setFilteredExpenses(prev => prev.filter(exp => exp.id !== id));

        } catch (error) {
            console.error("Failed to delete expense", error);
        }
    };



    const getUniqueCategories = () => {
        const categories = expenses.map(exp => exp.category);
        return [...new Set(categories)];
    };

    const getMonthFromDate = (dateStr) => {
        return new Date(dateStr).toLocaleString("default", { month: "long" });
    };

    const handleFilterChange = () => {
        let filtered = [...expenses];

        if (selectedCategory !== "All") {
            filtered = filtered.filter(exp => exp.category === selectedCategory);
        }

        if (selectedMonth !== "All") {
            filtered = filtered.filter(exp => {
                const month = getMonthFromDate(exp.date);
                return month === selectedMonth;
            });
        }

        setFilteredExpenses(filtered);
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    useEffect(() => {
        handleFilterChange();
    }, [selectedCategory, selectedMonth]);

    return (
        <div className="mt-6 max-w-5xl mx-auto bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Expense List</h2>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                    <label className="block text-sm mb-1">Filter by Category:</label>
                    <select
                        className="w-full border px-3 py-2 rounded"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="All">All</option>
                        {getUniqueCategories().map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div className="flex-1">
                    <label className="block text-sm mb-1">Filter by Month:</label>
                    <select
                        className="w-full border px-3 py-2 rounded"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                        <option value="All">All</option>
                        {Array.from(new Set(expenses.map(exp => getMonthFromDate(exp.date)))).map(month => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            {loading ? (
                <p>Loading expenses...</p>
            ) : filteredExpenses.length === 0 ? (
                <p>No expenses found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border">
                        <thead>
                        <tr className="border-b bg-gray-100">
                            <th className="py-2 px-4 border">Category</th>
                            <th className="py-2 px-4 border">Amount</th>
                            <th className="py-2 px-4 border">Date</th>
                            <th className="py-2 px-4 border text-center">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredExpenses.map((exp) => (
                            <tr key={exp.id} className="border-b">
                                <td className="py-2 px-4 border">{exp.category}</td>
                                <td className="py-2 px-4 border">₹{exp.amount.toFixed(2)}</td>
                                <td className="py-2 px-4 border">{new Date(exp.date).toLocaleDateString()}</td>
                                <td className="py-2 px-4 border text-center">
                                    <button
                                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                        onClick={() => alert("Edit form coming soon")}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                                        onClick={() => deleteExpense(exp.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ExpenseList;
