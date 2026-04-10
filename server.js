const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// ✅ MongoDB Connection (UPDATED)
mongoose.connect("mongodb+srv://kartik099475_db_user:EefkclTwOt1l5d46@ac-q9he843.okmbnkh.mongodb.net/expenseDB?retryWrites=true&w=majority")
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

// ➕ Add Expense
app.post("/add", async (req, res) => {
  try {
    const data = await Expense.create(req.body);
    res.json({ success: true, data });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// 📊 Get Expenses
app.get("/expenses", async (req, res) => {
  const data = await Expense.find().sort({ date: -1 });
  res.json(data);
});

// ❌ Delete Expense
app.delete("/delete/:id", async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// 🏠 Home Page (UI serve karega)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 🚀 Server Start
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
