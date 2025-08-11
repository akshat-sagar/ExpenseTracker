import { useState, useEffect } from "react";
import axios from "axios";

const AddExpense = () => {
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        amount: "",
        date: "",
    });

    const [token, setToken] = useState("");

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        console.log(" Retrieved token from localStorage:", storedToken);
        setToken(storedToken);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log("Form data updated:", { ...formData, [e.target.name]: e.target.value }); // ✅ test log
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Submitting form with data:", formData);

        try {
            const response = await axios.post("http://localhost:8080/api/expenses/add", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const { expense, overspending, totalSpent, budget } = response.data;
            if (overspending) {
                alert("⚠️ Warning: You have exceeded your budget!");
            }

            console.log("✅ Expense added successfully:", response.data);
            alert("Expense added!");
        } catch (err) {
            console.error("Error adding expense:", err.response ? err.response.data : err.message); // ✅ test log
            alert("Failed to add expense.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto shadow-lg rounded-lg bg-white">
            <h2 className="text-xl font-bold mb-4">Add Expense</h2>

            <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="block w-full p-2 mb-3 border"
            />

            <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                required
                className="block w-full p-2 mb-3 border"
            />

            <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleChange}
                required
                className="block w-full p-2 mb-3 border"
            />

            <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="block w-full p-2 mb-3 border"
            />

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Add Expense
            </button>
        </form>
    );
};

export default AddExpense;
