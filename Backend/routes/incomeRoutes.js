const express = require("express");
const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadedIncomeExcel
} = require("../controllers/incomeController");
const {protect}=require("../middleware/authMiddleware")
const router = express.Router();

router.post("/add",protect, addIncome);
router.get("/get",protect, getAllIncome);
router.get("/downloadexel",protect, downloadedIncomeExcel);
router.delete("/:id", protect, deleteIncome);

module.exports = router;