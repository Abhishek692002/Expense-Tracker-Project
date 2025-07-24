const User = require("../models/user");
const Income = require("../models/income");
const xlsr = require("xlsx");
//Add Income Source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, source, amount, date } = req.body;

        //Validation:Check for missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
//Get ALL Income Source
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.json(income);
    } catch {
        res.status(500).json({ message: "Server Error" });
     }
};
//Delete Income Source
exports.deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({message:"Income deleted successfully"})
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
 };
//Download Excel
exports.downloadedIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        //Prepare data for Excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsr.utils.book_new();
        const ws = xlsr.utils.json_to_sheet(data);
        xlsr.utils.book_append_sheet(wb, ws, "Income");
        xlsr.writeFile(wb, 'income_details.xlsx');
        res.download('income_details.xlsx');
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
 };
