import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ranges = ["today", "yesterday", "7days", "total"];

const ExpenseFilter = () => {
    const [selectedRange, setSelectedRange] = useState("today");
    const [summary, setSummary] = useState(null);
    const [topCategory, setTopCategory] = useState([]);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    const fetchSummaryAndTopCategory = async () => {
        try {
            const [summaryRes, topCategoryRes] = await Promise.all([
                axios.get(`http://localhost:8080/api/expenses/summary?range=${selectedRange}`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get("http://localhost:8080/api/expenses/top-category", {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);
            setSummary(summaryRes.data);
            setTopCategory(Array.isArray(topCategoryRes.data) ? topCategoryRes.data : [topCategoryRes.data]);
            setError("");
        } catch (err) {
            console.error(err);
            setError("❌ Failed to fetch data.");
        }
    };

    useEffect(() => {
        fetchSummaryAndTopCategory();
    }, [selectedRange]);

    const chartData = {
        labels: topCategory.map((cat) => cat.name),
        datasets: [
            {
                label: "₹ Spent",
                data: topCategory.map((cat) => cat.amount),
                backgroundColor: "#3b82f6",
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return "₹" + value;
                    },
                },
            },
        },
    };

    return (
        <div className="p-4 bg-white shadow rounded mt-4">
            <div className="flex gap-2 mb-4">
                {ranges.map((range) => (
                    <button
                        key={range}
                        className={`px-3 py-1 rounded ${
                            selectedRange === range ? "bg-blue-600 text-white" : "bg-gray-100"
                        }`}
                        onClick={() => setSelectedRange(range)}
                    >
                        {range.charAt(0).toUpperCase() + range.slice(1)}
                    </button>
                ))}
            </div>

            {error && <p className="text-red-500">{error}</p>}

            {!summary ? (
                <p>Loading...</p>
            ) : (
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Summary Info */}
                    <div className="flex-1 space-y-2 text-gray-700">
                        <p>🧾 <strong>Total Expenses:</strong> ₹{summary.total.toFixed(2)}</p>
                        <p>🔢 <strong>Total Count:</strong> {summary.count}</p>
                        <p>
                            🏆 <strong>Top Category:</strong>{" "}
                            {topCategory[0]?.name || "None"} (₹{topCategory[0]?.amount.toFixed(2) || 0})
                        </p>

                        {/* Table View */}
                        <div className="mt-4">
                            <h2 className="font-semibold mb-2">Top Categories</h2>
                            <table className="w-full text-sm border">
                                <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-1 px-2 border">Category</th>
                                    <th className="py-1 px-2 border">Amount (₹)</th>
                                </tr>
                                </thead>
                                <tbody>
                                {topCategory.map((cat, idx) => (
                                    <tr key={idx} className="border-t">
                                        <td className="py-1 px-2 border">{cat.name}</td>
                                        <td className="py-1 px-2 border">{cat.amount.toFixed(2)}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="flex-1">
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpenseFilter;
