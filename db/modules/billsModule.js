import mongoose from "mongoose";

const billsSchema = new mongoose.Schema({
  billId: {
    type: String,
    unique: true,
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

const Bills = mongoose.model("Bills", billsSchema);
export default Bills;
