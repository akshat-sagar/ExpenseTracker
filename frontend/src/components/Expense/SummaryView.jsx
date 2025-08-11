import { useEffect, useState } from "react";
import axios from "axios";
import {
    PieChart, Pie, Cell, Tooltip, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F", "#FFBB28"];

const SummaryView = () => {
    const [categoryData, setCategoryData] = useState([]);
    const [monthData, setMonthData] = useState(null);
    const [error, setError] = useState("");

    const currentDate = new Date();
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1); // 1-indexed

    const years = [2023, 2024, 2025];
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    const fetchData = async () => {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        try {
            const [catRes, monthRes] = await Promise.all([
                axios.get("http://localhost:8080/api/expenses/summary/category", { headers }),
                axios.get(`http://localhost:8080/api/expenses/summary/month?year=${selectedYear}&month=${selectedMonth}`, { headers }),
            ]);

            const catFormatted = Object.entries(catRes.data).map(([key, value]) => ({
                name: key,
                value,
            }));

            setCategoryData(catFormatted);
            setMonthData(monthRes.data.total);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Failed to load summary data.");
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedYear, selectedMonth]);

    return (
        <div className="space-y-6">

            {/* Filters */}
            <div className="flex gap-4 items-center">
                <select
                    className="border p-2 rounded"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                >
                    {months.map((m) => (
                        <option key={m} value={m}>
                            {new Date(0, m - 1).toLocaleString("default", { month: "long" })}
                        </option>
                    ))}
                </select>

                <select
                    className="border p-2 rounded"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                >
                    {years.map((y) => (
                        <option key={y} value={y}>
                            {y}
                        </option>
                    ))}
                </select>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {error && <p className="text-red-500 col-span-2">{error}</p>}

                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold mb-4">Monthly Summary</h2>
                    <p className="text-gray-700">
                        Total Spent in {selectedMonth}/{selectedYear}: ₹{monthData?.toFixed(2) || "0.00"}
                    </p>

                    <div className="h-64 mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[{ month: `${selectedMonth}/${selectedYear}`, total: monthData || 0 }]}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="total" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold mb-4">Category-wise Breakdown</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SummaryView;
