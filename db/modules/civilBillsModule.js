import mongoose from "mongoose";

const civilBillsSchema = new mongoose.Schema({
  billId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  summery: {
    type: String,
  },
  parson: {
    type: String,
  },
  date: {
    type: Date, // Change to Date type
    default: Date.now,
  },
  votesInFavor: {
    type: [String],
    default: [],
  },
  votesAgainst: {
    type: [String],
    default: [],
  },
});

const CivilBills = mongoose.model("CivilBills", civilBillsSchema);
export default CivilBills;
