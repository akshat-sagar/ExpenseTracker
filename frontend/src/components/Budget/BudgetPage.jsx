
import SetBudgetForm from "./SetBudgetForm.jsx";
import BudgetSummaryCard from "./BudgetSummaryCard.jsx";
import { useState } from "react";

const BudgetPage = () => {
    const today = new Date();
    const [month, setMonth] = useState(today.getMonth() + 1);
    const [year, setYear] = useState(today.getFullYear());

    return (
        <div className="max-w-3xl mx-auto mt-6">
            <SetBudgetForm onBudgetSet={() => {}} />
            <BudgetSummaryCard year={year} month={month} />
        </div>
    );
};

export default BudgetPage;
