import React, { useState,useEffect } from "react";
import { prepareExpenseBarChatData } from "../../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";
const Last30daysExpenses = ({ data }) => {
    const [chartData, setchartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseBarChatData(data);
        // console.log("Bar Chart Data :",result);
        setchartData(result);

        return () => {};
    }, [data]);

    return (
        <div className="card col-span-1">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 30 days Expenses</h5>
            </div>

            <CustomBarChart data={ chartData} />
        </div>
    );
};

export default Last30daysExpenses;
