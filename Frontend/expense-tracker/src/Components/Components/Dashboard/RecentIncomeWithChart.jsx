import React, { useState, useEffect } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
    // console.log(data);

    const [chartData, setChartData] = useState([]);
    // console.log("Chart Data :",chartData);

    const prepareChartData = () => {
        const dataArr = data?.map((item) => ({
            name: item?.source,
            amount: item?.amount,
        }));

        setChartData(dataArr);
    };

    useEffect(() => {
        prepareChartData();

        return () => {};
    }, [data]);

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5>Last 60days Income</h5>
            </div>

            <CustomPieChart
                data={chartData}
                label="Total Income"
                totalAmount={`$${totalIncome}`}
                showTextAnchor
                colors={COLORS}
            />
        </div>
    );
};

export default RecentIncomeWithChart;
