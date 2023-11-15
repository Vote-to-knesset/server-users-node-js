import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: string,
    require: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    default: new Date(),
  },
  party: {
    type: string,
    require: true,
  },
  identity: {
    type: string,
    require: true,
  },
  gender: {
    type: string,
    require: true,
  },
  billsVote: {
    type: []
  }
});


const User = mongoose.model("User", userSchema);
export default User;
