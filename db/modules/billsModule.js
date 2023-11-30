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

const commentSchema = new mongoose.Schema({
    text: String,
    timestamp: Date,
    like: Number,
  });
  
  const discussionSchema = new mongoose.Schema({
    title: String,
    comments: [commentSchema], 

  });
  
  const billCommentsSchema = new mongoose.Schema({
    bill: {
      type:String,
      unique: true,
    },
    discussions: [discussionSchema],
  });
  
export const BillComments = mongoose.model('billComments', billCommentsSchema);


const Bills = mongoose.model("Bills", billsSchema);
export default Bills;
