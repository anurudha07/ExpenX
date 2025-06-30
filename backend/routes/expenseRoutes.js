const express = require("express");
const {
    addExpense,
    getAllExpense,
    deleteExpense,
    DownloadExpenseExcel,
    updateExpense
} = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.get("/downloadexcel", protect, DownloadExpenseExcel);
router.delete("/:id", protect, deleteExpense);
router.patch("/:id", protect, updateExpense);    // ← PATCH route
router.delete("/:id", protect, deleteExpense);

module.exports = router;