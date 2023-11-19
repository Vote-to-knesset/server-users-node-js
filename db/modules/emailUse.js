import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  verifyEmail: {
    value: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: new Date(),
    },
    verify: {
      type: Boolean,
      default: false,
    },
  },
});

const Emails = mongoose.model("Emails", emailSchema);
export default Emails;
