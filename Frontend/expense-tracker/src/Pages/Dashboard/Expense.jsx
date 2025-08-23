import React, { useState, useEffect } from "react";
import { useUserAuth } from "../../Hooks/useUserAuth";
import DashboardLayout from "../../Components/Components/layouts/DashboardLayout";
import { API_PATHs } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import ExpenseOverview from "../../Components/Components/Expense/ExpenseOverview";
import Modal from "../../Components/Components/Modal";
import AddExpenseForm from "../../Components/Components/Expense/AddExpenseForm";
import toast from "react-hot-toast";
const Expense = () => {
    useUserAuth();
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });

    //Get All Expense Details
    const fetchExpenseDetails = async () => {
        // if (loading) return;

        setLoading(true);

        try {
            const response = await axiosInstance.get(
                `${API_PATHs.EXPENSE.GET_ALL_EXPENSE}`
            );

            if (response.data) {
                setExpenseData(response.data);
            }
        } catch (error) {
            console.log("Something went wrong, Please try agin.", error);
            setLoading(false);
        }
    };
    //Handle Add Expenses
    const handleAddExpense = async (expense) => {
        const { category, amount, date, icon } = expense;

        //Validation Checks
        if (!category.trim()) {
            toast.error("Category is required.");
            return;
        }

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Amount should be a valid number greater than 0.");
            return;
        }

        if (!date) {
            toast.error("Date is required.");
            return;
        }
        try {
            await axiosInstance.post(API_PATHs.EXPENSE.ADD_EXPENSE, {
                category,
                amount,
                date,
                icon,
            });

            setOpenAddExpenseModal(false);
            toast.success("Expense added successfully");
            fetchExpenseDetails();
        } catch (error) {
            console.error(
                "Error adding expense:",
                error.response?.data?.message || error.message
            );
        }
    };
    useEffect(() => {
        fetchExpenseDetails();

        return () => {};
    }, []);

    return (
        <DashboardLayout activeMenu="Expense">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-4">
                    <div className="">
                        <ExpenseOverview
                            transactions={expenseData}
                            onExpenseIncome={() => setOpenAddExpenseModal(true)}
                        />
                    </div>
                </div>
                <Modal
                    isOpen={openAddExpenseModal}
                    onClose={() => setOpenAddExpenseModal(false)}
                    title="Add Expense"
                >
                    {<AddExpenseForm onAddExpense={handleAddExpense} />}
                </Modal>
            </div>
        </DashboardLayout>
    );
};

export default Expense;
