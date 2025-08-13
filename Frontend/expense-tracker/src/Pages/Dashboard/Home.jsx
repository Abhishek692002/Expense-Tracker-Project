import React, { useState,useEffect } from "react";
import DashboardLayout from "../../Components/Components/layouts/DashboardLayout";
import { useUserAuth } from "../../Hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHs } from "../../utils/apiPaths";

const Home = () => {
    useUserAuth();

    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDashboardData = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axiosInstance.get(
                `${API_PATHs.DASHBOARD.GET_DATA}`
            );

            if (response.data) {
                setDashboardData(response.data);
            }
        } catch (error) {
            console.log("Something went wrong. Please try again.",error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
        return () => {};
    }, []);

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="my-5 mx-auto">Home</div>
        </DashboardLayout>
    );
};

export default Home;
