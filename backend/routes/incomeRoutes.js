const express = require("express");
const {
    addIncome,
    getAllIncome,
    deleteIncome,
    DownloadIncomeExcel,
    updateIncome
} = require("../controllers/incomeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.get("/downloadexcel", protect, DownloadIncomeExcel);
router.delete("/:id", protect, deleteIncome);
router.patch('/:id', protect, updateIncome);

module.exports = router;