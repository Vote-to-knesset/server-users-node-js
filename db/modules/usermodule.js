import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
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
    type: String,
    require: true,
  },
  identity: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  billsVote: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model("User", userSchema);
export default User;
