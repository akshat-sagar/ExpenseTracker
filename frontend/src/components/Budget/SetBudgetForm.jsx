// src/components/Budget/SetBudgetForm.jsx
import { useState } from "react";
import axios from "axios";

const SetBudgetForm = ({ onBudgetSet }) => {
    const [amount, setAmount] = useState("");
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [message, setMessage] = useState("");

    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = [2023, 2024, 2025];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            await axios.post(
                "http://localhost:8080/api/budget/set",
                { amount: parseFloat(amount), month, year },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessage("✅ Budget saved!");
            onBudgetSet?.();
        } catch (err) {
            console.error(err);
            setMessage("❌ Failed to save budget.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-lg font-semibold mb-2">Set Monthly Budget</h2>

            <div className="flex gap-2 mb-2">
                <select
                    className="border rounded p-2"
                    value={month}
                    onChange={(e) => setMonth(parseInt(e.target.value))}
                >
                    {months.map((m) => (
                        <option key={m} value={m}>
                            {new Date(0, m - 1).toLocaleString("default", { month: "long" })}
                        </option>
                    ))}
                </select>

                <select
                    className="border rounded p-2"
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                >
                    {years.map((y) => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>

                <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Amount"
                    className="border rounded p-2 flex-1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Save
                </button>
            </div>

            {message && <p className="text-sm text-gray-600">{message}</p>}
        </form>
    );
};

export default SetBudgetForm;
