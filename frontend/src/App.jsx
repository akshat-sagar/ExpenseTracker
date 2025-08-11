
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Homepage from "./pages/Homepage.jsx";
import Dashboard from "./pages/Dashboard";


const App = () => {
    const token = localStorage.getItem("token");

    return (
        <Routes>
            <Route path="/" element={token ? <Navigate to="/homepage" /> : <Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/homepage" element={token ? <Homepage /> : <Navigate to="/" />} />
            <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
        </Routes>
    );
};

export default App;


