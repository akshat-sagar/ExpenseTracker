import { useEffect, useState } from "react";
import axios from "axios";

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

const BudgetSummaryCard = () => {
    const [summary, setSummary] = useState(null);
    const [error, setError] = useState("");
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const fetchSummary = async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await axios.get(
                `http://localhost:8080/api/budget/summary?year=${selectedYear}&month=${selectedMonth}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSummary(res.data);
            setError("");
        } catch (err) {
            console.error(err);
            setError("❌ Failed to load budget summary.");
        }
    };

    useEffect(() => {
        fetchSummary();
    }, [selectedMonth, selectedYear]);

    return (
        <div className="bg-white p-6 rounded shadow mt-4 w-full max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
                <div className="flex items-center gap-2">
                    <label className="text-sm">Month:</label>
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                        className="border px-2 py-1 rounded"
                    >
                        {months.map((month, index) => (
                            <option key={index} value={index + 1}>{month}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-sm">Year:</label>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                        className="border px-2 py-1 rounded"
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>

            <h2 className="text-lg font-semibold mb-2 text-center">
                Budget Summary for {months[selectedMonth - 1]} {selectedYear}
            </h2>

            {error && <p className="text-red-500">{error}</p>}

            {!summary ? (
                <p>Loading summary...</p>
            ) : (
                <ul className="text-gray-700 space-y-2">
                    <li>💰 <strong>Planned:</strong> ₹{summary.planned.toFixed(2)}</li>
                    <li>💸 <strong>Spent:</strong> ₹{summary.spent.toFixed(2)}</li>
                    <li>🟢 <strong>Remaining:</strong> ₹{summary.remaining.toFixed(2)}</li>
                    {summary.remaining < 0 && (
                        <li className="text-red-600 font-semibold">⚠️ Overspending Alert!</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default BudgetSummaryCard;
