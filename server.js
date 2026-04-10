const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// MongoDB Connection
mongoose.connect("mongodb+srv://kartik099475_db_user:EefkclTwOt1l5d46@cluster0.mongodb.net/expenseDB?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const expenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  note: String,
  createdBy: String,
  date: { type: Date, default: Date.now }
});

const Expense = mongoose.model("Expense", expenseSchema);

// Add
app.post("/add", async (req, res) => {
  try {
    const data = await Expense.create(req.body);
    res.json({ success: true, data });
  } catch (err) {
    res.json({ success: false });
  }
});

// Get
app.get("/expenses", async (req, res) => {
  const data = await Expense.find().sort({ date: -1 });
  res.json(data);
});

// Delete
app.delete("/delete/:id", async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
