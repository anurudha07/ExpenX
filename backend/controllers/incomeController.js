const xlsx = require('xlsx');
const Income = require('../models/Income');

// Add Income Source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try{
        const {  icon, source, amount, date } = req.body;

        // Validation: Check for missing fields
        if(!source || !amount || !date) {
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
}

// Get All Income Source
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({date: -1});
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Income Source
exports.deleteIncome = async (req, res) => {
  
  try{
    await Income.findByIdAndDelete(req.params.id);
    res.json({ message: "Income deleted successfully" })
  } catch (error) {
      res.status(500).json({ message:"Server Error" });
  }
};


// Download Excel
exports.DownloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    // Prepare data for Excel
    const data = income.map(item => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    // Build workbook and worksheet
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, 'Income');

    const buffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });

    // Set headers for download
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="income_details.xlsx"'
    );
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );

    return res.send(buffer);
  } catch (error) {
    console.error('Error generating income Excel:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

// Update Income
exports.updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { icon, source, amount, date } = req.body;

    if (!source || !amount || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const updated = await Income.findByIdAndUpdate(
      id,
      { icon, source, amount, date: new Date(date) },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Income not found' });
    }
    res.json(updated);
  } catch (err) {
    console.error('updateIncome error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};
