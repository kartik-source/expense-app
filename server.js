const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// ✅ MongoDB Connection (tumhara username + password already added)
mongoose.connect("mongodb+srv://kartik099475_db_user:EefkclTwOt1l5d46@cluster0.mongodb.net/expenseDB?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// 📄 Expense Schema
const expenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  note: String,
  createdBy: String,
  date: { type: Date, default: Date.now }
});

const Expense = mongoose.model("Expense", expenseSchema);

// ➕ Add Expense API
app.post("/add", async (req, res) => {
  try {
    const data = await Expense.create(req.body);
    res.json({ success: true, data });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// 📊 Get All Expenses
app.get("/expenses", async (req, res) => {
  const data = await Expense.find().sort({ date: -1 });
  res.json(data);
});

// ❌ Delete Expense
app.delete("/delete/:id", async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// 🚀 Server Start
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
