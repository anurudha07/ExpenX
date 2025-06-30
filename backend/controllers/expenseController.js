const xlsx = require('xlsx');
const Expense = require("../models/Expense");

// Add Expense Source
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const {  icon, category, amount, date } = req.body;

        // Validation: Check for missing fields
        if(!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

// Get All Expense Source
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({date: -1});
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Expense Source
exports.deleteExpense = async (req, res) => {
  
  try{
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted successfully" })
  } catch (error) {
      res.status(500).json({ message:"Server Error" });
  }
};



// Download Excel
exports.DownloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    // Prepare data for Excel
    const data = expense.map(item => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date,
    }));

    // Create workbook & sheet
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expenses");
    const buffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });

    // Set response headers
    res.setHeader('Content-Disposition', 'attachment; filename="expense_details.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    return res.send(buffer);

  } catch (error) {
    console.error("Error generating Excel:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { icon, category, amount, date } = req.body;

    // optional: validate incoming fields
    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updated = await Expense.findByIdAndUpdate(
      id,
      { icon, category, amount, date: new Date(date) },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("updateExpense error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

