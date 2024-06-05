import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  id: { type: Number, index: true, required: true },
  name: { type: String, required: true },
  date: { type: Date },
  type: { type: String, required: true },
  tag: { type: String, required: true },
  description: { type: String },
  amount: { type: Number, required: true },
  recurring: { type: Boolean },
  paymentMethod: { type: String, required: true },
  created: { type: Date, default: new Date() },
});

export const Expense = mongoose.model("Expense", ExpenseSchema);
